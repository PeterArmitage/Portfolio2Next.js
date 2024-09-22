export interface Section {
	label: string;
	component?: React.ReactNode;
}

export interface Sections {
	[key: string]: Section;
}

export interface AnimatedSectionProps {
	children: React.ReactNode;
}

export interface SpaceModelProps {
	position?: [number, number, number];
}
