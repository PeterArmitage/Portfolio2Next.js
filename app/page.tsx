'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import IntroSection from './components/IntroSection';

const Page: React.FC = () => {
	const [introStage, setIntroStage] = useState<
		'video' | 'welcome' | 'complete'
	>('video');
	const videoRef = useRef<HTMLVideoElement>(null);
	const router = useRouter();

	useEffect(() => {
		if (introStage === 'video') {
			const timer = setTimeout(() => {
				setIntroStage('welcome');
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, [introStage]);

	useEffect(() => {
		if (introStage === 'complete') {
			router.push('/Home');
		}
	}, [introStage, router]);

	return (
		<IntroSection
			introStage={introStage}
			videoRef={videoRef}
			setIntroStage={setIntroStage}
		/>
	);
};

export default Page;
