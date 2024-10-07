'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import SkillsSkeleton from '../../components/Skeleton/SkillsSkeleton';

const Skills = dynamic(() => import('../../components/skills/Skills'), {
	loading: () => <SkillsSkeleton />,
	ssr: false,
});

const SkillsPage = () => {
	return (
		<div className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white'>
			<div className='container mx-auto px-4 py-12'>
				<Suspense fallback={<SkillsSkeleton />}>
					<Skills />
				</Suspense>
			</div>
		</div>
	);
};

export default SkillsPage;
