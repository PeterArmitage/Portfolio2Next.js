export interface Section {
	component: React.ReactNode;
	label: string;
}
export interface Sections {
	[key: string]: Section;
}

export interface AnimationProps {
	children: React.ReactNode;
	key: string;
}
