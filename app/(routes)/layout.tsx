'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Navigation from '../components/Navigation/Navigation';
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
		<div className='relative w-full min-h-screen flex flex-col'>
			<div className='flex-shrink-0'>
				{currentSection === 'Home' ? (
					<Navigation sections={sections} />
				) : (
					<BackToHome />
				)}
			</div>
			<div className='flex-grow overflow-auto'>{children}</div>
		</div>
	);
}
