import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// 3D Components for each story panel
function Craftsmanship3D() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.5;
  });
  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#C8A96A" metalness={1} roughness={0.1} />
      </mesh>
      <mesh rotation={[Math.PI/4, Math.PI/4, 0]}>
        <torusGeometry args={[1.2, 0.02, 16, 64]} />
        <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.1} />
      </mesh>
    </group>
  );
}

function Mechanism3D() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.z = state.clock.elapsedTime;
  });
  return (
    <group ref={ref}>
      <mesh>
        <cylinderGeometry args={[1, 1, 0.1, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.2} wireframe />
      </mesh>
      <mesh position={[0, 0, 0.1]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 16]} />
        <meshStandardMaterial color="#C8A96A" metalness={1} roughness={0.2} />
      </mesh>
    </group>
  );
}

function Leather3D() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
      ref.current.rotation.y = Math.cos(state.clock.elapsedTime) * 0.2;
    }
  });
  return (
    <mesh ref={ref}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <meshStandardMaterial color="#3E2723" roughness={0.9} bumpScale={0.02} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Box3D() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.2;
  });
  return (
    <group ref={ref} rotation={[0.2, 0, 0]}>
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[2, 1, 2]} />
        <meshStandardMaterial color="#000000" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0, -1]} rotation={[-Math.PI / 4, 0, 0]}>
        <boxGeometry args={[2, 0.1, 2]} />
        <meshStandardMaterial color="#000000" roughness={0.7} />
      </mesh>
    </group>
  );
}

const panels = [
  {
    title: 'Craftsmanship',
    desc: 'Forged from solid blocks of 904L stainless steel, every curve is polished to absolute perfection by master artisans.',
    Model: Craftsmanship3D,
  },
  {
    title: 'Swiss Movement',
    desc: 'At the heart lies a COSC-certified caliber. Over 300 micro-components working in flawless unison.',
    Model: Mechanism3D,
  },
  {
    title: 'Premium Leather',
    desc: 'Hand-stitched full-grain alligator leather, aged gracefully, providing unparalleled comfort and durability.',
    Model: Leather3D,
  },
  {
    title: 'Luxury Packaging',
    desc: 'Presented in a solid mahogany box with velvet lining, because the experience begins before you even touch the timepiece.',
    Model: Box3D,
  }
];

export default function HorizontalStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    // Only apply horizontal scroll on desktop
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const sections = gsap.utils.toArray('.story-panel');
      
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + containerRef.current?.offsetWidth,
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="explore-story" ref={sectionRef} className="md:h-screen w-full overflow-hidden bg-[#111111] text-[var(--color-lux-bg)]">
      <div ref={containerRef} className="flex flex-col md:flex-row md:h-full md:w-[400vw]">
        {panels.map((panel, i) => (
          <div key={i} className="story-panel w-full md:w-screen min-h-screen md:min-h-full h-auto md:h-full flex flex-col md:flex-row items-center justify-center relative px-6 md:px-32 py-20 md:py-0">
            
            <div className="w-full md:w-1/2 z-10 pr-0 md:pr-20 mb-12 md:mb-0 text-center md:text-left">
              <span className="font-sans text-[var(--color-lux-accent)] tracking-[0.3em] uppercase text-xs mb-6 block">
                0{i + 1} / 04
              </span>
              <h2 className="text-4xl md:text-7xl font-serif mb-6 md:mb-8">{panel.title}</h2>
              <p className="font-sans text-base md:text-lg text-gray-400 max-w-md mx-auto md:mx-0 leading-relaxed">
                {panel.desc}
              </p>
            </div>

            <div className="w-full md:w-1/2 h-[40vh] md:h-[70vh] relative">
              <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <Environment preset="city" />
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                  <panel.Model />
                </Float>
              </Canvas>
            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
}
