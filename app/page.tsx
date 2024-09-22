'use client';
import React, { useState, useRef, useEffect } from 'react';
import IntroSection from './components/IntroSection';
import Home from './(routes)/Home/page';
import Navigation from './components/Navigation';
import { Sections } from './types';

const sections: Sections = {
	home: { label: 'Home', component: <Home /> },
	about: { label: 'About', component: null },
	projects: { label: 'Projects', component: null },
	skills: { label: 'Skills', component: null },
	contacts: { label: 'Contacts', component: null },
};
const Page: React.FC = () => {
	const [introStage, setIntroStage] = useState<
		'video' | 'welcome' | 'complete'
	>('video');
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (introStage === 'video') {
			const timer = setTimeout(() => {
				setIntroStage('welcome');
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, [introStage]);

	if (introStage !== 'complete') {
		return (
			<IntroSection
				introStage={introStage}
				videoRef={videoRef}
				setIntroStage={setIntroStage}
			/>
		);
	}

	return (
		<div className='relative w-full h-screen overflow-hidden'>
			<Home />
			<Navigation sections={sections} />
		</div>
	);
};

export default Page;
