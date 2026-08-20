import { useRef, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float, ContactShadows, PresentationControls, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

export function WatchExploded({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const group = useRef<THREE.Group>(null);
  const parts = useRef<{ [key: string]: THREE.Mesh }>({});

  // Proxy object for GSAP to animate
  const animState = useRef({ explode: 0 });

  useLayoutEffect(() => {
    // We can animate the proxy object externally, but for a direct prop binding:
    animState.current.explode = scrollProgress;
  }, [scrollProgress]);

  // Materials
  const caseMaterial = new THREE.MeshPhysicalMaterial({
    color: '#E5E5E5',
    metalness: 0.9,
    roughness: 0.1,
    clearcoat: 1,
  });

  const goldMaterial = new THREE.MeshPhysicalMaterial({
    color: '#C8A96A',
    metalness: 1,
    roughness: 0.15,
  });

  const dialMaterial = new THREE.MeshStandardMaterial({
    color: '#111111',
    roughness: 0.8,
  });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const explode = animState.current.explode;

    if (group.current) {
      // Base rotation when not exploded
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 2) * 0.1 - explode * Math.PI, 0.1);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.cos(t / 3) * 0.1 + explode * 0.5, 0.1);
    }

    // Explode animations
    if (parts.current.glass) {
      parts.current.glass.position.z = THREE.MathUtils.lerp(parts.current.glass.position.z, 0.2 + explode * 3, 0.1);
    }
    if (parts.current.hands) {
      parts.current.hands.position.z = THREE.MathUtils.lerp(parts.current.hands.position.z, 0.15 + explode * 2, 0.1);
      parts.current.hands.rotation.z = -t * 0.5; // Minute hand ticking
    }
    if (parts.current.dial) {
      parts.current.dial.position.z = THREE.MathUtils.lerp(parts.current.dial.position.z, 0.1 + explode * 1, 0.1);
    }
    if (parts.current.case) {
      parts.current.case.position.z = THREE.MathUtils.lerp(parts.current.case.position.z, 0, 0.1);
    }
    if (parts.current.back) {
      parts.current.back.position.z = THREE.MathUtils.lerp(parts.current.back.position.z, -0.1 - explode * 1.5, 0.1);
    }
    if (parts.current.strapTop) {
      parts.current.strapTop.position.y = THREE.MathUtils.lerp(parts.current.strapTop.position.y, 1.2 + explode * 2, 0.1);
      parts.current.strapTop.rotation.x = THREE.MathUtils.lerp(parts.current.strapTop.rotation.x, explode * 0.5, 0.1);
    }
    if (parts.current.strapBottom) {
      parts.current.strapBottom.position.y = THREE.MathUtils.lerp(parts.current.strapBottom.position.y, -1.2 - explode * 2, 0.1);
      parts.current.strapBottom.rotation.x = THREE.MathUtils.lerp(parts.current.strapBottom.rotation.x, -explode * 0.5, 0.1);
    }
    if (parts.current.crown) {
      parts.current.crown.position.x = THREE.MathUtils.lerp(parts.current.crown.position.x, 1.1 + explode * 1.5, 0.1);
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        
        {/* Glass */}
        <mesh ref={(el) => { if(el) parts.current.glass = el }} position={[0, 0, 0.2]}>
          <cylinderGeometry args={[1, 1, 0.05, 64]} />
          <MeshTransmissionMaterial 
            thickness={0.2} 
            roughness={0} 
            transmission={1} 
            ior={1.5} 
            chromaticAberration={0.02} 
            backside
          />
        </mesh>

        {/* Hands Group */}
        <group ref={(el) => { if(el) parts.current.hands = el as unknown as THREE.Mesh }} position={[0, 0, 0.15]}>
          {/* Minute Hand */}
          <mesh position={[0, 0.35, 0]}>
            <boxGeometry args={[0.04, 0.7, 0.01]} />
            <meshStandardMaterial color="#C8A96A" metalness={1} roughness={0.2} />
          </mesh>
          {/* Hour Hand */}
          <mesh position={[0.2, 0.2, 0.01]} rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[0.05, 0.5, 0.01]} />
            <meshStandardMaterial color="#C8A96A" metalness={1} roughness={0.2} />
          </mesh>
          {/* Center Pin */}
          <mesh position={[0, 0, 0.02]}>
            <cylinderGeometry args={[0.06, 0.06, 0.03, 32]} />
            <meshStandardMaterial color="#C8A96A" metalness={1} roughness={0.2} />
          </mesh>
        </group>

        {/* Dial */}
        <mesh ref={(el) => { if(el) parts.current.dial = el }} position={[0, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.95, 0.95, 0.05, 64]} />
          <primitive object={dialMaterial} attach="material" />
          {/* Markers */}
          {Array.from({ length: 12 }).map((_, i) => (
            <mesh key={i} position={[Math.sin(i * Math.PI / 6) * 0.8, 0.03, Math.cos(i * Math.PI / 6) * 0.8]}>
              <boxGeometry args={[0.05, 0.05, 0.15]} />
              <meshStandardMaterial color="#C8A96A" metalness={1} roughness={0.2} />
            </mesh>
          ))}
        </mesh>

        {/* Case */}
        <mesh ref={(el) => { if(el) parts.current.case = el }} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1, 0.15, 32, 64]} />
          <primitive object={caseMaterial} attach="material" />
        </mesh>

        {/* Crown */}
        <mesh ref={(el) => { if(el) parts.current.crown = el }} position={[1.1, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.1, 0.15, 16]} />
          <primitive object={goldMaterial} attach="material" />
        </mesh>

        {/* Back */}
        <mesh ref={(el) => { if(el) parts.current.back = el }} position={[0, 0, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1, 1, 0.05, 64]} />
          <primitive object={caseMaterial} attach="material" />
        </mesh>

        {/* Strap Top */}
        <mesh ref={(el) => { if(el) parts.current.strapTop = el }} position={[0, 1.2, -0.05]} rotation={[-0.1, 0, 0]}>
          <boxGeometry args={[0.8, 1.2, 0.1]} />
          <meshStandardMaterial color="#111111" roughness={0.9} />
        </mesh>

        {/* Strap Bottom */}
        <mesh ref={(el) => { if(el) parts.current.strapBottom = el }} position={[0, -1.2, -0.05]} rotation={[0.1, 0, 0]}>
          <boxGeometry args={[0.8, 1.2, 0.1]} />
          <meshStandardMaterial color="#111111" roughness={0.9} />
        </mesh>

      </Float>
    </group>
  );
}
