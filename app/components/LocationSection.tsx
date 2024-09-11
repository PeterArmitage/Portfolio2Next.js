import Image from 'next/image';
import brazilOutline from '../assets/brazil.png';

const LocationSection: React.FC = () => (
	<div className='absolute bottom-4 left-4 flex items-center text-yellow-500 text-sm sm:text-base'>
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			strokeWidth={1.5}
			stroke='currentColor'
			className='w-4 h-4 sm:w-6 sm:h-6 text-white'
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
			/>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z'
			/>
		</svg>

		<span>Located in </span>
		<span className='text-green-500 hover:underline cursor-pointer relative ml-1 group'>
			Brazil
			<span className='absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-full w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
				<Image
					src={brazilOutline}
					alt='Brazil outline'
					fill
					sizes='(max-width: 640px) 40px, 60px'
					style={{
						objectFit: 'contain',
						filter: 'brightness(0) invert(1)',
					}}
				/>
			</span>
		</span>
	</div>
);

export default LocationSection;
