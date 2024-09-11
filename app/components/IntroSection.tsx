import { motion, AnimatePresence } from 'framer-motion';

interface IntroSectionProps {
	introStage: 'video' | 'welcome' | 'complete';
	videoRef: React.RefObject<HTMLVideoElement>;
	setIntroStage: (stage: 'video' | 'welcome' | 'complete') => void;
	setCurrentSection: (section: string) => void;
}

const IntroSection: React.FC<IntroSectionProps> = ({
	introStage,
	videoRef,
	setIntroStage,
	setCurrentSection,
}) => {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 1,
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.8 },
		},
	};

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 1 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 2 }}
				className='absolute inset-0 bg-black flex items-center justify-center overflow-hidden'
			>
				<video
					ref={videoRef}
					autoPlay
					muted
					loop
					className='absolute w-full h-full object-cover'
				>
					<source src='/videos/outsidefire.mp4' type='video/mp4' />
				</video>

				{introStage === 'welcome' && (
					<motion.div
						variants={containerVariants}
						initial='hidden'
						animate='visible'
						className='absolute inset-0 flex flex-col items-center justify-center p-4'
					>
						<div className='text-center max-w-md'>
							<motion.h1
								variants={itemVariants}
								className='text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]'
							>
								Welcome to My Portfolio
							</motion.h1>
							<motion.p
								variants={itemVariants}
								className='text-lg md:text-xl mb-8 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]'
							>
								My name is Peter Armitage, and I am a Full-Stack Developer.
							</motion.p>
							<motion.button
								variants={itemVariants}
								onClick={() => {
									setIntroStage('complete');
									setCurrentSection('home');
								}}
								className='px-6 py-3 bg-blue-500 rounded text-white 
                                hover:font-bold
                                transition-all duration-300 ease-in-out
                                bg-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                                hover:bg-opacity-75
                                w-48 h-14 overflow-hidden'
							>
								<span className='inline-block transition-transform duration-300 ease-in-out hover:scale-110'>
									Enter Portfolio
								</span>
							</motion.button>
						</div>
					</motion.div>
				)}
			</motion.div>
		</AnimatePresence>
	);
};

export default IntroSection;
