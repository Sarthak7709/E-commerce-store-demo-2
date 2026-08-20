import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AbstractWatch({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += hovered ? delta * 2 : delta * 0.5;
    }
  });
  return (
    <group ref={ref}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.2, 32, 64]} />
        <meshStandardMaterial color="#C8A96A" metalness={1} roughness={0.1} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.9, 0.9, 0.1, 64]} />
        <MeshTransmissionMaterial thickness={0.5} roughness={0} transmission={1} ior={1.5} />
      </mesh>
    </group>
  );
}

function AbstractWallet({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += hovered ? delta * 2 : delta * 0.5;
    }
  });
  return (
    <mesh ref={ref} rotation={[0.5, 0.5, 0]}>
      <boxGeometry args={[1.8, 1.2, 0.2]} />
      <meshStandardMaterial color="#111111" roughness={0.8} />
    </mesh>
  );
}

function AbstractSunglasses({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += hovered ? delta * 2 : delta * 0.5;
    }
  });
  return (
    <group ref={ref} rotation={[0.2, 0, 0.1]}>
      <mesh position={[-0.5, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.05, 32]} />
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.5, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.05, 32]} />
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
        <meshStandardMaterial color="#C8A96A" metalness={1} roughness={0.1} />
      </mesh>
    </group>
  );
}

function AbstractPerfume({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += hovered ? delta * 2 : delta * 0.5;
    }
  });
  return (
    <group ref={ref}>
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[1, 1.2, 0.6]} />
        <MeshTransmissionMaterial thickness={1.5} roughness={0.1} transmission={1} ior={1.5} color="#F8F8F5" />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.4, 32]} />
        <meshStandardMaterial color="#C8A96A" metalness={1} roughness={0.1} />
      </mesh>
    </group>
  );
}

const categories = [
  { id: 1, name: 'Timepieces', Component: AbstractWatch },
  { id: 2, name: 'Leather Goods', Component: AbstractWallet },
  { id: 3, name: 'Eyewear', Component: AbstractSunglasses },
  { id: 4, name: 'Fragrances', Component: AbstractPerfume },
];

export default function Categories3D() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="py-32 bg-[var(--color-lux-bg)] text-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="mb-24">
          <p className="font-sans text-[var(--color-lux-accent)] tracking-[0.3em] uppercase text-xs mb-4">Collections</p>
          <h2 className="text-4xl md:text-5xl font-serif">Explore The Universe</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              className="relative h-96 flex flex-col items-center justify-end cursor-pointer group"
              onMouseEnter={() => setHovered(cat.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[10, 10, 5]} intensity={1} />
                  <Environment preset="city" />
                  <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                    <cat.Component hovered={hovered === cat.id} />
                  </Float>
                </Canvas>
              </div>
              
              <div className="z-10 pb-8 transition-transform duration-500 group-hover:-translate-y-4">
                <h3 className="font-serif text-2xl mb-2">{cat.name}</h3>
                <span className="font-sans text-[var(--color-lux-text-secondary)] text-xs uppercase tracking-widest border-b border-transparent group-hover:border-[var(--color-lux-text)] transition-colors pb-1">
                  Discover
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
