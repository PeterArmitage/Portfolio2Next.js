import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import styles from './AnimatedGlobe.module.scss';

const AnimatedGlobe: React.FC = () => {
	const mountRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const mount = mountRef.current;
		if (!mount) return;

		const w = window.innerWidth;
		const h = window.innerHeight;
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
		camera.position.z = 5;
		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setSize(w, h);
		mount.appendChild(renderer.domElement);

		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

		const earthGroup = new THREE.Group();
		earthGroup.rotation.z = (-23.4 * Math.PI) / 180;
		scene.add(earthGroup);

		new OrbitControls(camera, renderer.domElement);

		const detail = 12;
		const loader = new THREE.TextureLoader();
		const geometry = new THREE.IcosahedronGeometry(1, detail);
		const material = new THREE.MeshPhongMaterial({
			map: loader.load('/images/earthmap1k.jpg'),
			specularMap: loader.load('/images/earthspec1k.jpg'),
			bumpMap: loader.load('/images/earthbump1k.jpg'),
			bumpScale: 0.04,
		});

		const earthMesh = new THREE.Mesh(geometry, material);
		earthGroup.add(earthMesh);

		const lightsMat = new THREE.MeshBasicMaterial({
			map: loader.load('/images/earthlights1k.jpg'),
			blending: THREE.AdditiveBlending,
		});
		const lightsMesh = new THREE.Mesh(geometry, lightsMat);
		earthGroup.add(lightsMesh);

		const cloudsMat = new THREE.MeshStandardMaterial({
			map: loader.load('/images/earthcloudmap.jpg'),
			transparent: true,
			opacity: 0.6,
			blending: THREE.AdditiveBlending,
			alphaMap: loader.load('/images/earthcloudmaptrans.jpg'),
		});
		const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
		cloudsMesh.scale.setScalar(1.003);
		earthGroup.add(cloudsMesh);

		const fresnelMat = getFresnelMat();
		const glowMesh = new THREE.Mesh(geometry, fresnelMat);
		glowMesh.scale.setScalar(1.0);
		earthGroup.add(glowMesh);

		const stars = getStarfield({ numStars: 10000 });
		scene.add(stars);

		const sunLight = new THREE.DirectionalLight(0xffffff, 2.5);
		sunLight.position.set(-2, 0.5, 1.5);
		scene.add(sunLight);

		const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
		scene.add(ambientLight);

		function animate() {
			requestAnimationFrame(animate);

			earthMesh.rotation.y += 0.002;
			lightsMesh.rotation.y += 0.002;
			cloudsMesh.rotation.y += 0.0023;
			glowMesh.rotation.y += 0.002;
			stars.rotation.y -= 0.0002;
			renderer.render(scene, camera);
		}

		animate();

		function handleWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		}
		window.addEventListener('resize', handleWindowResize, false);

		return () => {
			window.removeEventListener('resize', handleWindowResize);
			mount?.removeChild(renderer.domElement);
		};
	}, []);

	return <div ref={mountRef} className={styles.globeContainer} />;
};
function getFresnelMat() {
	return new THREE.ShaderMaterial({
		uniforms: {
			mRefractionRatio: { value: 1.02 },
			mFresnelBias: { value: 0.1 },
			mFresnelPower: { value: 2.0 },
			mFresnelScale: { value: 1.0 },
			tCube: { value: null },
		},
		vertexShader: `
      uniform float mRefractionRatio;
      uniform float mFresnelBias;
      uniform float mFresnelScale;
      uniform float mFresnelPower;
      
      varying vec3 vReflect;
      varying vec3 vRefract[3];
      varying float vReflectionFactor;
      
      void main() {
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
      
        vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );
      
        vec3 I = worldPosition.xyz - cameraPosition;
      
        vReflect = reflect( I, worldNormal );
        vRefract[0] = refract( normalize( I ), worldNormal, mRefractionRatio );
        vRefract[1] = refract( normalize( I ), worldNormal, mRefractionRatio * 0.99 );
        vRefract[2] = refract( normalize( I ), worldNormal, mRefractionRatio * 0.98 );
        vReflectionFactor = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), mFresnelPower );
      
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
		fragmentShader: `
      uniform samplerCube tCube;
      
      varying vec3 vReflect;
      varying vec3 vRefract[3];
      varying float vReflectionFactor;
      
      void main() {
        vec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );
        vec4 refractedColor = vec4( 1.0 );
      
        refractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;
        refractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;
        refractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;
      
        gl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );
      }
    `,
		transparent: true,
		opacity: 0.5,
	});
}

function getStarfield({ numStars = 500 }) {
	const vertices = [];
	for (let i = 0; i < numStars; i++) {
		const x = THREE.MathUtils.randFloatSpread(2000);
		const y = THREE.MathUtils.randFloatSpread(2000);
		const z = THREE.MathUtils.randFloatSpread(2000);
		vertices.push(x, y, z);
	}
	const geometry = new THREE.BufferGeometry();
	geometry.setAttribute(
		'position',
		new THREE.Float32BufferAttribute(vertices, 3)
	);
	const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7 });
	return new THREE.Points(geometry, material);
}

export default AnimatedGlobe;
