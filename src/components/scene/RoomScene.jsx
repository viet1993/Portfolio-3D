import { useRef, useState, useCallback, Suspense, useMemo, useEffect } from "react";
import { useGLTF, OrbitControls, Environment, ContactShadows, Html } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { INTERACTIVE_OBJECTS, MESH_TO_OBJECT } from "../../data/roomObjects";

const SCALE = 3; // must match primitive scale prop

// Floating label — retro pixel-art dialog style
const FloatingLabel = ({ position, label, color, onClick, isHovered }) => {
  const emoji = label.split(" ")[0];
  const text = label.split(" ").slice(1).join(" ");
  
  return (
    <Html position={position} center zIndexRange={[20, 0]}>
      <div
        onClick={onClick}
        className="pointer-events-auto cursor-pointer select-none"
        style={{
          transform: isHovered ? "scale(1.08) translateY(-2px)" : "scale(1)",
          transition: "transform 0.1s ease",
        }}
      >
        <div style={{
          background: isHovered ? color : "#ffffff",
          border: `3px solid ${isHovered ? color : "#000000"}`,
          borderRadius: "0px",
          padding: "8px 12px",
          color: isHovered ? "#ffffff" : "#000000",
          fontSize: "10px",
          fontWeight: "bold",
          fontFamily: "'Press Start 2P', monospace",
          whiteSpace: "nowrap",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          boxShadow: isHovered
            ? `4px 8px 0px #000000, 0 0 16px ${color}99`
            : `4px 8px 0px ${color}`,
          transition: "all 0.15s ease",
        }}>
          <span style={{ fontSize: "14px" }}>{emoji}</span>
          <span>{text}</span>
        </div>
      </div>
    </Html>
  );
};

// Hook to apply emissive glow to all meshes of a hovered object
function useHoverGlow(scene, hoveredObjId) {
  // Store original emissive per mesh so we can restore
  const originals = useRef({});

  useEffect(() => {
    if (!scene) return;

    const hoveredObj = hoveredObjId ? INTERACTIVE_OBJECTS[hoveredObjId] : null;
    const hexColor = hoveredObj ? hoveredObj.color : null;

    scene.traverse((child) => {
      if (!child.isMesh) return;
      const meshObjId = MESH_TO_OBJECT[child.name];

      if (!child.material) return;

      // Normalise: handle both single material and array
      const mats = Array.isArray(child.material) ? child.material : [child.material];

      mats.forEach((mat, idx) => {
        const key = `${child.uuid}_${idx}`;
        if (!mat.emissive) return; // non-standard material — skip

        if (meshObjId && meshObjId === hoveredObjId) {
          // Save original emissive only once
          if (originals.current[key] === undefined) {
            originals.current[key] = {
              r: mat.emissive.r,
              g: mat.emissive.g,
              b: mat.emissive.b,
              intensity: mat.emissiveIntensity ?? 0,
            };
          }
          mat.emissive.set(hexColor);
          mat.emissiveIntensity = 0.55;
        } else {
          // Restore
          if (originals.current[key] !== undefined) {
            const orig = originals.current[key];
            mat.emissive.setRGB(orig.r, orig.g, orig.b);
            mat.emissiveIntensity = orig.intensity;
            delete originals.current[key];
          }
        }
      });
    });
  }, [scene, hoveredObjId]);
}

// Compute label world positions from scene graph at SCALE
function computeLabelPositions(scene) {
  const targets = {
    computer: ["Computer_fireRed_material_0", "Computer"],
    tv:       ["TV_fireRed_material_0", "TV"],
    books:    ["bookShelf_fireRed_material_0", "bookShelf"],
    bed:      ["bed_fireRed_material_0", "bed"],
    dresser:  ["dresser_fireRed_material_0", "dresser"],
    photos:   ["wall_picture_fireRed_material_0", "wall_picture"],
    contact:  ["stairs_fireRed_material_0", "stairs", "NES_fireRed_material_0", "NES"],
  };

  // Fine-tuned manual overrides for Pokemon FireRed Room
  const manualOverrides = {
    computer: [-12.5, 4.8, -7.5],
    dresser:  [-7.18, 4.2, -7.5],
    books:    [-2.43, 5.0, -7.5],
    tv:       [ 1.22, 3.8, -1.0],
    bed:      [-12.0, 2.0,  3.0],
    photos:   [ 13.5, 4.6, -7.8],
    contact:  [ 6.0,  2.3,  1.5],
  };

  const meshMap = {};
  scene.traverse((child) => { if (child.name) meshMap[child.name] = child; });

  const positions = {};
  Object.entries(targets).forEach(([id, names]) => {
    let autoPos = null;
    for (const name of names) {
      const mesh = meshMap[name];
      if (mesh) {
        const box    = new THREE.Box3().setFromObject(mesh);
        const top    = box.max;
        const center = box.getCenter(new THREE.Vector3());
        autoPos = [
          center.x * SCALE,
          top.y    * SCALE + 0.8,
          center.z * SCALE,
        ];
        break;
      }
    }
    console.log(`[LABEL_POS] id: ${id}, autoPos: ${JSON.stringify(autoPos)}, overridePos: ${JSON.stringify(manualOverrides[id] || null)}`);
    if (manualOverrides[id]) {
      positions[id] = manualOverrides[id];
    } else if (autoPos) {
      positions[id] = autoPos;
    }
  });
  return positions;
}

// Pulsing glow helper — animates emissiveIntensity up/down while hovering
function PulsingGlow({ scene, hoveredObjId }) {
  useHoverGlow(scene, hoveredObjId);

  const timeRef = useRef(0);
  useFrame((_, delta) => {
    if (!scene || !hoveredObjId) return;
    timeRef.current += delta;
    const pulse = 0.45 + Math.sin(timeRef.current * 4) * 0.15; // 0.30–0.60

    scene.traverse((child) => {
      if (!child.isMesh) return;
      if (MESH_TO_OBJECT[child.name] !== hoveredObjId) return;
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      mats.forEach((mat) => {
        if (mat.emissive) mat.emissiveIntensity = pulse;
      });
    });
  });

  return null;
}

// The main GLB room loader
const PokemonRoom = ({ onObjectClick, onObjectHover }) => {
  const { scene } = useGLTF(import.meta.env.BASE_URL + "pokemon_3D_room.glb");
  const [hoveredObj, setHoveredObj] = useState(null);
  const { gl } = useThree();

  // Compute label positions once (local bounding box × SCALE)
  const labelPositions = useMemo(() => computeLabelPositions(scene), [scene]);

  const handlePointerDown = useCallback((e) => {
    e.stopPropagation();
    let cur = e.object;
    while (cur) {
      const id = MESH_TO_OBJECT[cur.name];
      if (id) { onObjectClick(INTERACTIVE_OBJECTS[id]); return; }
      cur = cur.parent;
    }
  }, [onObjectClick]);

  const handlePointerOver = useCallback((e) => {
    let cur = e.object;
    while (cur) {
      const id = MESH_TO_OBJECT[cur.name];
      if (id) {
        setHoveredObj(id);
        onObjectHover(id);
        gl.domElement.style.cursor = "pointer";
        return;
      }
      cur = cur.parent;
    }
    setHoveredObj(null);
    onObjectHover(null);
    gl.domElement.style.cursor = "grab";
  }, [onObjectHover, gl]);

  const handlePointerOut = useCallback(() => {
    setHoveredObj(null);
    onObjectHover(null);
    gl.domElement.style.cursor = "grab";
  }, [onObjectHover, gl]);

  return (
    <>
      {/* Hover glow effect — applies emissive highlight to hovered meshes */}
      <PulsingGlow scene={scene} hoveredObjId={hoveredObj} />

      {/* Model at scale SCALE */}
      <primitive
        object={scene}
        scale={[SCALE, SCALE, SCALE]}
        onPointerDown={handlePointerDown}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />

      {/* Labels placed in world space (positions already multiplied by SCALE) */}
      {Object.values(INTERACTIVE_OBJECTS).map((obj) => {
        const pos = labelPositions[obj.id];
        if (!pos) return null;
        return (
          <FloatingLabel
            key={obj.id}
            position={pos}
            label={obj.label}
            color={obj.color}
            isHovered={hoveredObj === obj.id}
            onClick={() => onObjectClick(obj)}
          />
        );
      })}
    </>
  );
};

const RoomScene = ({ onObjectClick, onObjectHover }) => {
  const controlsRef = useRef();
  return (
    <>
      <ambientLight intensity={1.2} color="#ffe8d0" />
      <directionalLight position={[20, 30, 15]} intensity={2.5} color="#fff5e0" castShadow={false} />
      <directionalLight position={[-15, 15, -10]} intensity={0.8} color="#c8d8ff" />
      <directionalLight position={[-5, 10, -20]} intensity={0.5} color="#ffe0ff" />
      <pointLight position={[8, 15, 5]} intensity={1.5} color="#ffcc88" distance={30} />
      <pointLight position={[-8, 12, -6]} intensity={1} color="#88aaff" distance={25} />
      <pointLight position={[0, 8, 12]} intensity={0.8} color="#ff88aa" distance={20} />

      <Environment preset="sunset" background={false} />
      <ContactShadows position={[0, 0.01, 0]} opacity={0.5} scale={10} blur={1.5} far={8} />

      <Suspense fallback={null}>
        <PokemonRoom onObjectClick={onObjectClick} onObjectHover={onObjectHover} />
      </Suspense>

      <OrbitControls
        ref={controlsRef}
        enablePan enableZoom enableRotate
        minDistance={2} maxDistance={45}
        minPolarAngle={0.1} maxPolarAngle={Math.PI / 2 - 0.05}
        target={[0, 1.5, 0]}
        makeDefault dampingFactor={0.08} enableDamping
      />
    </>
  );
};

useGLTF.preload(import.meta.env.BASE_URL + "pokemon_3D_room.glb");
export default RoomScene;
