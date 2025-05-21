import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text, useTexture, useGLTF, Html, OrbitControls } from '@react-three/drei';
import { Physics, usePlane, useBox, useSphere } from '@react-three/cannon';

interface ThankYouAnimationProps {
  message: string;
}

const believers = [
  "Emergent Ventures",
  "1517 Medici Group",
  "Society of Science",
  "Ani & Suraj",
  "Changliu Liu",
  "Charles"
];

const descriptions: Record<string, string> = {
  "Emergent Ventures": "Believed in my moonshot ideas and provided a grant to pursue them.",
  "1517 Medici Group": "Supported my research and entrepreneurial journey.",
  "Society of Science": "One of the first to recognize my work through STS and ISEF and truly made me feel like a scientist.",
  "Ani & Suraj": "Picked me up during my toughest times and continue to inspire me every day.",
  "Changliu Liu": "Lit a fire in me for research and innovation.",
  "Charles": "Broke me out of my shell and taught me how to be a true leader."
};

// Ground plane for physics
function Ground() {
  const [ref] = usePlane<THREE.Mesh>(() => ({ 
    rotation: [-Math.PI / 2, 0, 0], 
    position: [0, -2, 0],
    material: { friction: 0.5, restitution: 0.7 }
  }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#23244d" />
    </mesh>
  );
}

// Boundary walls to confine the cloth
function Boundaries() {
  // Four static boxes: left, right, front, back
  useBox(() => ({ type: 'Static', position: [-10, -0.5, 0], args: [0.5, 4, 20] })); // left
  useBox(() => ({ type: 'Static', position: [10, -0.5, 0], args: [0.5, 4, 20] })); // right
  useBox(() => ({ type: 'Static', position: [0, -0.5, -10], args: [20, 4, 0.5] })); // back
  useBox(() => ({ type: 'Static', position: [0, -0.5, 10], args: [20, 4, 0.5] })); // front
  return null;
}

// Ball with text label
function BouncingBall({ name, position, color }: { name: string; position: [number, number, number]; color: string }) {
  const [sphereRef, api] = useSphere<THREE.Mesh>(() => ({
    mass: 0.6,
    position,
    args: [0.7],
    material: { friction: 0.5, restitution: 0.7 },
  }));
  const textRef = useRef<THREE.Group>(null);
  const [dragging, setDragging] = useState(false);
  const [popupPos, setPopupPos] = useState<[number, number, number]>([0, 0, 0]);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const apiRef = useRef(api);

  useEffect(() => {
    apiRef.current = api;
  }, [api]);

  // Make text always face the camera and be in front of the ball
  useFrame(({ camera }) => {
    if (textRef.current && sphereRef.current) {
      const ballPos = new THREE.Vector3();
      sphereRef.current.getWorldPosition(ballPos);
      const camDir = camera.position.clone().sub(ballPos).normalize();
      textRef.current.position.set(
        camDir.x * 0.85,
        0.85,
        camDir.z * 0.85
      );
      textRef.current.lookAt(camera.position);
      setPopupPos([ballPos.x, ballPos.y + 1.3, ballPos.z]);
    }
  });

  // Drag logic
  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
  };
  const handlePointerUp = (e: any) => {
    setDragging(false);
    dragStart.current = null;
  };
  const handlePointerMove = (e: any) => {
    if (dragging && apiRef.current && dragStart.current) {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      const force: [number, number, number] = [dx * 0.01, -dy * 0.01, 0];
      apiRef.current.applyImpulse(force, [0, 0, 0]);
      dragStart.current = { x: e.clientX, y: e.clientY };
    }
  };

  return (
    <>
      <mesh
        ref={sphereRef}
        castShadow
        receiveShadow
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerUp}
        onPointerMove={handlePointerMove}
      >
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color={color} />
        {/* Soft shadow under the ball */}
        <mesh position={[0, -0.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.5, 32]} />
          <meshBasicMaterial color="#000" opacity={0.25} transparent />
        </mesh>
        <group ref={textRef}>
          <Text
            fontSize={0.32}
            color="#fff"
            anchorX="center"
            anchorY="middle"
            maxWidth={2}
            textAlign="center"
            outlineColor="#6366f1"
            outlineWidth={0.04}
            outlineBlur={0.01}
            fontWeight={700}
          >
            {name}
          </Text>
        </group>
      </mesh>
      {/* Popup above the ball when dragging */}
      {dragging && (
        <Html position={popupPos} center style={{ pointerEvents: 'none' }}>
          <div style={{
            background: 'rgba(40,40,80,0.95)',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '12px',
            fontSize: '0.95rem',
            boxShadow: '0 2px 8px #0008',
            maxWidth: 220,
            textAlign: 'center',
            border: '1px solid #6366f1',
            zIndex: 10
          }}>
            {descriptions[name]}
          </div>
        </Html>
      )}
    </>
  );
}

export const ThankYouAnimation: React.FC<ThankYouAnimationProps> = ({ message }) => {
  // Blue-purple gradient colors for balls
  const ballColors = [
    "#6366f1", // indigo-500
    "#818cf8", // indigo-400
    "#a5b4fc", // indigo-300
    "#7c3aed", // violet-600
    "#8b5cf6", // violet-500
    "#c4b5fd", // violet-400
  ];
  const ballPositions: [number, number, number][] = believers.map((_, i) => [
    (i - (believers.length - 1) / 2) * 2.2,
    5 + Math.random() * 2,
    0
  ]);

  return (
    <div className="relative w-full h-[600px] rounded-2xl overflow-hidden bg-gray-900/70 border border-gray-700/60 shadow-xl backdrop-blur">
      <Canvas
        shadows
        camera={{ position: [0, 2, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <color attach="background" args={["#23263a"]} />
        <fog attach="fog" args={["#23263a", 5, 20]} />
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.7} />
        <Physics gravity={[0, -9.8, 0]}>
          <Ground />
          <Boundaries />
          {believers.map((name, i) => (
            <BouncingBall
              key={name}
              name={name}
              position={ballPositions[i]}
              color={ballColors[i % ballColors.length]}
            />
          ))}
        </Physics>
        {/* Subtle grid helper */}
        <gridHelper args={[20, 20, '#353a5a', '#353a5a']} position={[0, -1.99, 0]} />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>
      <div className="absolute bottom-4 left-0 right-0 text-center text-indigo-200 text-lg font-bold drop-shadow-lg">
        {message}
      </div>
      {/* Overlay for extra blending */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl bg-gradient-to-br from-gray-900/60 via-transparent to-purple-900/30" />
    </div>
  );
}; 