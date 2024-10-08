'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import BackToHome from '../components/BackToHome';
import { Sections } from '../types';
import ContactFormModal from '../components/ContactFormModal/ContactFormModal';

const LanguageSwitcher = dynamic(
	() => import('../components/LanguageSwitcher/LanguageSwitcher'),
	{
		ssr: false,
	}
);
const Navigation = dynamic(
	() => import('../components/Navigation/Navigation'),
	{
		ssr: false,
	}
);
const sections: Sections = {
	About: { label: 'About' },
	Skills: { label: 'Skills' },
	contacts: { label: 'Contacts' },
};

export default function RoutesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isContactModalOpen, setIsContactModalOpen] = useState(false);

	const openContactModal = () => setIsContactModalOpen(true);
	const closeContactModal = () => setIsContactModalOpen(false);
	const pathname = usePathname();
	const currentSection =
		pathname === '/' ? 'Home' : (pathname.slice(1) as keyof typeof sections);

	return (
		<div className='relative w-full min-h-screen flex flex-col'>
			<div className='flex-shrink-0'>
				{currentSection === 'Home' ? (
					<Navigation
						sections={sections}
						onOpenContactModal={openContactModal}
					/>
				) : (
					<BackToHome />
				)}
			</div>
			<div className='flex-grow overflow-auto'>{children}</div>
			<ContactFormModal
				isOpen={isContactModalOpen}
				onClose={closeContactModal}
			/>
			<LanguageSwitcher />
		</div>
	);
}
