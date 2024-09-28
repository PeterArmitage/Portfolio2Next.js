export interface Skill {
	name: string;
	xp: string;
	icon: string;
}

export interface HardSkillCategory {
	categoryName: string;
	percentage: number;
	skillList: Skill[];
}

export interface SoftSkillCategory {
	categoryName: string[];
	percentage: number;
}

export type SkillCategory = HardSkillCategory | SoftSkillCategory;

export const skillCat: Record<string, SkillCategory> = {
	web: {
		categoryName: 'Web Dev',
		percentage: 50,
		skillList: [
			{ name: 'HTML', xp: '2 YRS', icon: '/images/skills/html.png' },
			{ name: 'CSS', xp: '2 YRS', icon: '/images/skills/css.png' },
			{ name: 'Javascript', xp: '2 YRS', icon: '/images/skills/js.png' },
			{ name: 'Typescript', xp: '1 YR', icon: '/images/skills/bootstrap.png' },
			{ name: 'Next.js', xp: '1 YR', icon: '/images/skills/csharp.png' },
			{ name: 'React js', xp: '2 YRS', icon: '/images/skills/react.png' },
			{ name: 'Mantine.ui', xp: '1 YR', icon: '/images/skills/db.png' },
			{ name: 'Shadcn', xp: '1 YR', icon: '/images/skills/figma.png' },
			{ name: 'Remix', xp: '6 Months', icon: '/images/skills/dotnet.png' },
		],
	},
	game: {
		categoryName: 'Database',
		percentage: 20,
		skillList: [
			{ name: 'Supabase', xp: '1 YR', icon: '/images/skills/unity.png' },
			{ name: 'MongoDB', xp: '1 YR', icon: '/images/skills/csharp.png' },
			{ name: 'Prisma', xp: '1 YR', icon: '/images/skills/ps.png' },
		],
	},
	design: {
		categoryName: 'Tools',
		percentage: 30,
		skillList: [
			{ name: 'Zustand', xp: '1 YR1', icon: '/images/skills/figma.png' },
			{ name: 'Redux Toolkit', xp: '1 YR1', icon: '/images/skills/figma.png' },
			{ name: 'Framer Motion', xp: '1 YR', icon: '/images/skills/figma.png' },
		],
	},
	soft: {
		categoryName: [
			'Creative',
			'Perseverant',
			'Patient',
			'Enthusiastic',
			'Hardworking',
			'Amusing',
		],
		percentage: 100,
	},
};
