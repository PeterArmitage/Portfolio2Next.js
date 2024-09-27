import React from 'react';
import dynamic from 'next/dynamic';

const AnimatedImage = dynamic(() => import('../../components/AnimatedImage'), {
	ssr: false,
});

const About = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-500 to-green-700 text-white p-8'>
			<div className='max-w-3xl w-full'>
				<h2 className='text-4xl font-bold mb-8 text-center'>About Me</h2>

				<AnimatedImage />

				<div className='space-y-6 text-lg'>
					<p>
						Hello! I&apos;m a self-taught full stack developer with a passion
						for creating functional and engaging websites. Originally from the
						UK, I&apos;ve been calling Brazil my home for the past 14 years,
						embracing the vibrant culture and diverse experiences it offers.
					</p>
					<p>
						My journey in web development has been driven by an insatiable
						curiosity and a love for learning. I thrive on the ever-evolving
						nature of this field, always eager to explore new technologies and
						methodologies. React has captured my heart, but I&apos;m also
						nurturing a growing interest in game development, aiming to combine
						my coding skills with my love for interactive entertainment.
					</p>
					<p>
						As a developer, I pride myself on being a strong team player. I
						believe in the power of collaboration and the magic that happens
						when diverse minds come together to solve problems and create
						innovative solutions.
					</p>
					<p>
						Beyond coding, I&apos;m a bit of a nerd at heart. I have a deep
						appreciation for anime and manga, finding inspiration in their
						storytelling and artistry. When I&apos;m not immersed in lines of
						code or the latest manga chapter, you might find me cheering for my
						favorite football team or working on my fitness.
					</p>
					<p>
						I&apos;m always excited to connect with like-minded individuals who
						share my passions. Whether you want to discuss the latest anime
						series, debate football tactics, or explore new frontiers in web
						development, I&apos;m all ears!
					</p>
					<p>
						Oh, and did I mention my love for animals? They bring so much joy
						and companionship to our lives!
					</p>
				</div>

				<div className='mt-12 text-center'>
					<h3 className='text-2xl font-semibold mb-4'>Let&apos;s Connect!</h3>
					<p>
						I&apos;d love to hear about your interests in anime, manga, fitness,
						sports, or web development. Feel free to reach out and start a
						conversation!
					</p>
					<button className='mt-4 bg-white text-green-700 px-6 py-2 rounded-full font-semibold hover:bg-green-100 transition duration-300'>
						Get in Touch
					</button>
				</div>
			</div>
		</div>
	);
};

export default About;
