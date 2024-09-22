'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Navigation from '../components/Navigation';
import BackToHome from '../components/BackToHome';
import { Sections } from '../types';

const sections: Sections = {
	About: { label: 'About' },
	Skills: { label: 'Skills' },
	Contacts: { label: 'Contacts' },
};

export default function RoutesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const currentSection =
		pathname === '/Home'
			? 'Home'
			: (pathname.slice(1) as keyof typeof sections);

	return (
		<div className='relative w-full h-screen overflow-hidden'>
			{currentSection === 'Home' ? (
				<Navigation sections={sections} />
			) : (
				<BackToHome />
			)}
			{children}
		</div>
	);
}
