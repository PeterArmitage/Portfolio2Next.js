import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Mesh } from 'three';
import { SpaceModelProps } from '../types';

export default function SpaceModel({
	position = [0, 0, 0],
	...props
}: SpaceModelProps) {
	const meshRef = useRef<Mesh>(null);

	useFrame((state, delta) => {
		if (meshRef.current) {
			meshRef.current.rotation.y += delta * 0.5;
		}
	});

	const starShape = new THREE.Shape();
	for (let i = 0; i < 5; i++) {
		const angle = (i * 4 * Math.PI) / 5;
		const radius = i % 2 === 0 ? 1 : 0.5;
		starShape.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
	}

	const geometry = new THREE.ExtrudeGeometry(starShape, {
		depth: 0.2,
		bevelEnabled: false,
	});

	return (
		<mesh ref={meshRef} position={position} {...props}>
			<primitive object={geometry} />
			<meshStandardMaterial
				color='#00ff00'
				emissive='#00ff00'
				emissiveIntensity={0.5}
			/>
		</mesh>
	);
}
