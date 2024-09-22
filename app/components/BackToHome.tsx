'use client';

import Link from 'next/link';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

const BackToHome: React.FC = () => {
	return (
		<Link href='/Home' className='absolute top-4 left-4 z-50'>
			<button className='flex items-center text-white hover:text-green-400 transition-colors focus:outline-none'>
				<ArrowLeftIcon className='w-6 h-6 mr-2' />
				Back to Home
			</button>
		</Link>
	);
};

export default BackToHome;
