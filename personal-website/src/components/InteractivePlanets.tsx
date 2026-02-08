import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Line } from '@react-three/drei';
import * as THREE from 'three';

interface StarNodeProps {
  position: [number, number, number];
  color: string;
  size: number;
  starName: string;
  title: string;
  content: string;
  connections: number[];
}

type Vector3Array = [number, number, number];

const StarNode: React.FC<StarNodeProps> = ({ position, color, size, starName, title, content, connections }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle pulsing effect
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1;
      meshRef.current.scale.setScalar(hovered ? size * 1.4 * pulse : size * pulse);
    }
  });

  // Create a star shape
  const starGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const outerRadius = 1;
    const innerRadius = 0.4;
    const numPoints = 5;

    for (let i = 0; i < numPoints * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / numPoints;
      vertices.push(
        Math.sin(angle) * radius,
        Math.cos(angle) * radius,
        0
      );
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return geometry;
  }, []);

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color={color}
          metalness={0.1}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={hovered ? 2 : 0.5}
        />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 4]} scale={0.3}>
        <primitive object={starGeometry} />
        <lineBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>
      
      {/* Star name label */}
      <Html center position={[0, 0.3, 0]}>
        <div className="text-blue-200 text-sm whitespace-nowrap opacity-80">
          {starName}
        </div>
      </Html>

      {/* Info popup */}
      {hovered && (
        <Html distanceFactor={10}>
          <div className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-lg shadow-xl min-w-[180px] backdrop-blur-sm transform -translate-x-1/2 transition-all duration-200">
            <h3 className="text-base font-bold mb-1 text-gray-900 dark:text-white">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{content}</p>
          </div>
        </Html>
      )}
    </group>
  );
};

// Capricornus constellation star positions
const constellationPoints: StarNodeProps[] = [
    {
      position: [3, 0, 0], // Algiedi - upper right horn
      color: '#4F46E5',
      size: 1,
      starName: 'Algiedi',
      title: 'Research',
      content: 'Robotics & AI Research on assembly planning and reinforcement learning applications.',
      connections: [1]
    },
    {
      position: [4, 2, 0], // Dabih - base of horns
      color: '#4F46E5',
      size: 0.8,
      starName: 'Dabih',
      title: 'Research Interests',
      content: 'Reasoning, interpretability, cognition, decision-making, eco-friendly AI, safety in robots like autonomous vehicles, and robot learning.',
      connections: [2]
    },
    {
      position: [1, 1.2, 0], // Nashira - upper body
      color: '#4F46E5',
      size: 1,
      starName: 'Nashira',
      title: 'Education',
      content: 'Computer Science @ UT Austin, Turing Scholars Program.',
      connections: [3]
    },
    {
      position: [-1, 1.5, 0], // Deneb Algedi - upper left horn
      color: '#4F46E5',
      size: 0.9,
      starName: 'Deneb Algedi',
      title: 'Skills',
      content: 'Diffusion, reinforcement intelligence, LLMs, robotics simulation, machine learning, and computer vision.',
      connections: [4]
    },
    {
      position: [-0.6, 0, 0], // Castra - lower body
      color: '#4F46E5',
      size: 0.8,
      starName: 'Castra',
      title: 'Internship Interests',
      content: 'Looking to work with companies like AI2, Google Deepmind, Anthropic, Pika Labs, Amazon, Meta, NVIDIA, Tesla, and etc.',
      connections: [5]
    },
    {
      position: [1, -1.8, 0], // Marakk - start of tail
      color: '#4F46E5',
      size: 0.7,
      starName: 'Marakk',
      title: 'Startups',
      content: 'Founded some startups and am building innovative solutions in edtech, human-computer interaction, and robotics.',
      connections: [6]
    },
    {
      position: [1.5, -1.4, 0], // Baten Algiedi - tip of tail
      color: '#4F46E5',
      size: 0.9,
      starName: 'Baten Algiedi',
      title: 'Future Goals',
      content: 'Aspiring to become a research scientist/fellow and build my solutions via startups in the future through YCombinator.',
      connections: [0]
    }
  ];
  

// Capricorn outline points for the faint animal shape - removed most points to make it less apparent
const outlinePoints: Vector3Array[] = [
    [2.5, 1.5, 0],     // Algiedi (right horn)
    [1.5, 1.2, 0],     // Dabih
    [0.5, 1, 0],       // Nashira
    [-0.5, 1.5, 0],    // Deneb Algedi (left horn)
    [-0.5, 0.2, 0],    // Castra
    [0.2, -0.6, 0],    // Marakk
    [1, -1.8, 0],      // Baten Algiedi (tail)
  ];
  
  

export const InteractiveConstellation: React.FC = () => {
  const lineOpacity = 0.3;
  const lineColor = '#4F46E5';
  const outlineColor = '#1E40AF';
  const outlineOpacity = 0.05; // Reduced opacity for outline

  return (
    <group>
      {/* Draw constellation lines */}
      {constellationPoints.map((point, idx) => 
        point.connections.map((connectionIdx) => (
          <Line
            key={`${idx}-${connectionIdx}`}
            points={[
              point.position,
              constellationPoints[connectionIdx].position
            ]}
            color={lineColor}
            lineWidth={1}
            opacity={lineOpacity}
            transparent
          />
        ))
      )}
      
      {/* Draw very faint Capricorn outline */}
      <Line
        points={outlinePoints}
        color={outlineColor}
        lineWidth={1}
        opacity={outlineOpacity}
        transparent
      />
      
      {/* Draw stars */}
      {constellationPoints.map((point, index) => (
        <StarNode key={index} {...point} />
      ))}

      {/* Lights */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
    </group>
  );
}; 