'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
	Scene,
	PerspectiveCamera,
	WebGLRenderer,
	BoxGeometry,
	MeshBasicMaterial,
	Mesh,
} from 'three';

const ThreeJsLoader: React.FC = () => {
	const mountRef = useRef<HTMLDivElement>(null);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
		return () => setIsMounted(false);
	}, []);

	useEffect(() => {
		if (!isMounted || !mountRef.current) return;

		const currentMount = mountRef.current;

		// Set up scene, camera, and renderer
		const scene = new Scene();
		const camera = new PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		const renderer = new WebGLRenderer();

		renderer.setSize(window.innerWidth, window.innerHeight);
		currentMount.appendChild(renderer.domElement);

		// Create a simple cube
		const geometry = new BoxGeometry();
		const material = new MeshBasicMaterial({ color: 0x00ff00 });
		const cube = new Mesh(geometry, material);
		scene.add(cube);

		camera.position.z = 5;

		// Animation loop
		const animate = () => {
			requestAnimationFrame(animate);
			cube.rotation.x += 0.01;
			cube.rotation.y += 0.01;
			renderer.render(scene, camera);
		};

		animate();

		// Handle window resize
		const handleResize = () => {
			const width = window.innerWidth;
			const height = window.innerHeight;
			renderer.setSize(width, height);
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
		};

		window.addEventListener('resize', handleResize);

		// Clean up
		return () => {
			window.removeEventListener('resize', handleResize);
			currentMount.removeChild(renderer.domElement);
		};
	}, [isMounted]);

	if (!isMounted) return null;

	return (
		<div
			ref={mountRef}
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
			}}
		/>
	);
};

export default ThreeJsLoader;
