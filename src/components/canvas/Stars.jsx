import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const StarField = ({ count = 5000 }) => {
  const ref = useRef();

  const sphere = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const phi = Math.PI * 2;
    for (let i = 0; i < count; i++) {
      const r = 1.2 + Math.random() * 0.8;
      const theta = Math.random() * phi;
      const phiAngle = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phiAngle) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phiAngle) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phiAngle);
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  );
};

const Stars = () => {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <StarField count={6000} />
      </Canvas>
    </div>
  );
};

export default Stars;
