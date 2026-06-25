import { useRef, Suspense, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { globeSkills } from "../../constants";

// Skill tag floating in 3D space
const SkillTag = ({ text, position, color, onClick, isActive }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.lookAt(state.camera.position);
    }
  });

  return (
    <group
      position={position}
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => onClick(text)}
    >
      <Text
        fontSize={hovered || isActive ? 0.13 : 0.1}
        color={isActive ? "#00D9FF" : hovered ? "#c084fc" : color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/poppins.woff"
        maxWidth={2}
        textAlign="center"
      >
        {text}
      </Text>
    </group>
  );
};

// The wireframe globe
const GlobeWireframe = () => {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.8, 24, 24]} />
      <meshBasicMaterial
        color="#915EFF"
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  );
};

// Distribute skills evenly on a sphere surface
const distributeOnSphere = (count, radius) => {
  const points = [];
  const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    points.push([
      radius * r * Math.cos(theta),
      radius * y,
      radius * r * Math.sin(theta),
    ]);
  }
  return points;
};

const SkillsGlobeScene = ({ onSkillClick, activeSkill }) => {
  const positions = distributeOnSphere(globeSkills.length, 2.3);
  const colors = ["#915EFF", "#00D9FF", "#FF6B9D", "#F59E0B", "#10B981"];

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#915EFF" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#00D9FF" />

      <GlobeWireframe />

      {globeSkills.map((skill, i) => (
        <SkillTag
          key={skill}
          text={skill}
          position={positions[i]}
          color={colors[i % colors.length]}
          onClick={onSkillClick}
          isActive={activeSkill === skill}
        />
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
};

const SkillsGlobe = ({ onSkillClick, activeSkill }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
    >
      <Suspense fallback={null}>
        <SkillsGlobeScene onSkillClick={onSkillClick} activeSkill={activeSkill} />
      </Suspense>
    </Canvas>
  );
};

export default SkillsGlobe;
