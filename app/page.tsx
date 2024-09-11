'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Sections } from './types';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import AnimatedSection from './components/AnimatedSection';
import IntroSection from './components/IntroSection';
import Navigation from './components/Navigation';
import LocationSection from './components/LocationSection';

const sections: Sections = {
	home: { component: <Home />, label: 'Home' },
	about: { component: <About />, label: 'About' },
	skills: { component: <Skills />, label: 'Skills' },
	projects: { component: <Projects />, label: 'Projects' },
};

const Page: React.FC = () => {
	const [currentSection, setCurrentSection] = useState<
		keyof typeof sections | 'intro'
	>('intro');
	const [introStage, setIntroStage] = useState<
		'video' | 'welcome' | 'complete'
	>('video');
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (introStage === 'video') {
			const timer = setTimeout(() => {
				setIntroStage('welcome');
			}, 1000); // Change to welcome stage after 1 second
			return () => clearTimeout(timer);
		}
	}, [introStage]);

	const handleNavigation = (section: keyof typeof sections) => {
		setCurrentSection(section);
	};

	if (currentSection === 'intro') {
		return (
			<IntroSection
				introStage={introStage}
				videoRef={videoRef}
				setIntroStage={setIntroStage}
				setCurrentSection={setCurrentSection}
			/>
		);
	}

	return (
		<div className='relative w-full h-screen overflow-hidden'>
			<AnimatedSection key={currentSection as string}>
				{sections[currentSection].component}
			</AnimatedSection>
			<Navigation sections={sections} handleNavigation={handleNavigation} />
			<LocationSection />
		</div>
	);
};

export default Page;
