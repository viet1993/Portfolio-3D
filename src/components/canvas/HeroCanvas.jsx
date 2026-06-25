import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Trail } from "@react-three/drei";

// Main glowing orb
const GlowOrb = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.2}>
        <MeshDistortMaterial
          color="#915EFF"
          attach="material"
          distort={0.45}
          speed={2}
          roughness={0}
          metalness={0.8}
          emissive="#4a1fa8"
          emissiveIntensity={0.4}
        />
      </Sphere>
    </Float>
  );
};

// Orbiting rings
const Ring = ({ radius, speed, color }) => {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * speed;
      ref.current.rotation.z = state.clock.elapsedTime * speed * 0.6;
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} />
    </mesh>
  );
};

// Floating particles around the orb
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    angle: (i / 20) * Math.PI * 2,
    radius: 2.5 + Math.random() * 1,
    speed: 0.2 + Math.random() * 0.3,
    size: 0.03 + Math.random() * 0.05,
    color: i % 3 === 0 ? "#00D9FF" : i % 3 === 1 ? "#915EFF" : "#FF6B9D",
  }));

  return (
    <>
      {particles.map((p) => (
        <ParticleOrbit key={p.id} {...p} />
      ))}
    </>
  );
};

const ParticleOrbit = ({ angle, radius, speed, size, color }) => {
  const ref = useRef();
  const startAngle = angle;

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    if (ref.current) {
      ref.current.position.x = Math.cos(startAngle + t) * radius;
      ref.current.position.y = Math.sin(startAngle + t) * 0.5;
      ref.current.position.z = Math.sin(startAngle + t) * radius;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};

const HeroCanvas = () => {
  return (
    <Canvas
      frameloop="always"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true, antialias: true }}
      camera={{ fov: 45, near: 0.1, far: 200, position: [0, 0, 6] }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#915EFF" />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#00D9FF" />

        <GlowOrb />
        <Ring radius={3.2} speed={0.3} color="#915EFF" />
        <Ring radius={3.8} speed={-0.2} color="#00D9FF" />
        <Ring radius={4.4} speed={0.15} color="#FF6B9D" />
        <FloatingParticles />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Suspense>
    </Canvas>
  );
};

export default HeroCanvas;
