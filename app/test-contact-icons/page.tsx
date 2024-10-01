// pages/test-contact-icons.tsx

import React from 'react';
import ContactIcons from '../components/ContactIcons/ContactIconsTest';

const TestContactIcons: React.FC = () => {
	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				backgroundColor: '#1a1a1a',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<h1 style={{ color: 'white' }}>Test Contact Icons</h1>
			<ContactIcons />
		</div>
	);
};

export default TestContactIcons;
