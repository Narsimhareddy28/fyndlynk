// components/GLBViewer.tsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html, useProgress } from "@react-three/drei";
import * as THREE from 'three';

function Loader() {
  const { progress } = useProgress();
  return <Html center>{Math.round(progress)}%</Html>;
}

function Model() {
  const gltf = useGLTF("/Untitled.glb");
  
  // Clone the scene to avoid modifying the original
  const scene = React.useMemo(() => {
    const clonedScene = gltf.scene.clone();
    
    let meshIndex = 0;
    // Traverse through all meshes and apply custom color
    clonedScene.traverse((child: any) => {
      if (child.isMesh) {
        // Make only every 3rd or 4th mesh red, others copper metal
        let color = '#9ca3af'; // Copper metal color
        
        // Make only some parts red (every 3rd mesh for example)
       if(meshIndex === 7){
        color = '#FF3131';
       }
        
        meshIndex++;
        
        // Create a new material with the determined color
        child.material = new THREE.MeshStandardMaterial({
          color: color,
          metalness: 0.3,
          roughness: 0.4,
        });
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    
    return clonedScene;
  }, [gltf.scene]);
  
  return <primitive object={scene} scale={1.5} />;
}

export default function GLBViewer() {
  return (
      <Canvas camera={{ position: [0, 5, 15], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 10, 5]} />
        <React.Suspense fallback={<Loader />}>
          <Model />
        </React.Suspense>
        <OrbitControls 
          enableZoom={false}
       
        />
      </Canvas>
  );
}
