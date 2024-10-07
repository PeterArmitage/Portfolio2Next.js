import { IconType } from 'react-icons';
import { FaHtml5, FaCss3Alt, FaJs, FaReact } from 'react-icons/fa';
import {
	SiTypescript,
	SiNextdotjs,
	SiMongodb,
	SiPrisma,
	SiRedux,
} from 'react-icons/si';
import { TbBrandMantine } from 'react-icons/tb';
import { GiPolarBear } from 'react-icons/gi';
import { MdAnimation } from 'react-icons/md';
import { SiSupabase, SiRemix } from 'react-icons/si';
import { MdDashboardCustomize } from 'react-icons/md';

export interface Skill {
	name: string;
	xp: string;
	icon: IconType;
}

export interface HardSkillCategory {
	categoryName: string;
	percentage: number;
	skillList: Skill[];
}

export interface SoftSkillCategory {
	categoryName: string;
	percentage: number;
}

export type SkillCategory = HardSkillCategory | SoftSkillCategory;

export const skillCat: Record<string, SkillCategory> = {
	web: {
		categoryName: 'skills.categories.webDev',
		percentage: 50,
		skillList: [
			{ name: 'HTML', xp: '2 YRS', icon: FaHtml5 },
			{ name: 'CSS', xp: '2 YRS', icon: FaCss3Alt },
			{ name: 'Javascript', xp: '2 YRS', icon: FaJs },
			{ name: 'Typescript', xp: '1 YR', icon: SiTypescript },
			{ name: 'Next.js', xp: '1 YR', icon: SiNextdotjs },
			{ name: 'React js', xp: '2 YRS', icon: FaReact },
			{ name: 'Mantine.ui', xp: '1 YR', icon: TbBrandMantine },
			{ name: 'Shadcn', xp: '1 YR', icon: MdDashboardCustomize },
			{ name: 'Remix', xp: '6 Months', icon: SiRemix },
		],
	},
	game: {
		categoryName: 'skills.categories.database',
		percentage: 20,
		skillList: [
			{ name: 'MongoDB', xp: '1 YR', icon: SiMongodb },
			{ name: 'Prisma', xp: '1 YR', icon: SiPrisma },
			{ name: 'Supabase', xp: '1 YR', icon: SiSupabase },
		],
	},
	design: {
		categoryName: 'skills.categories.tools',
		percentage: 30,
		skillList: [
			{ name: 'Redux Toolkit', xp: '1 YR', icon: SiRedux },
			{ name: 'Zustand', xp: '1 YR1', icon: GiPolarBear },
			{ name: 'Framer Motion', xp: '1 YR', icon: MdAnimation },
		],
	},
	soft: {
		categoryName: 'skills.softSkills',
		percentage: 100,
	},
};
