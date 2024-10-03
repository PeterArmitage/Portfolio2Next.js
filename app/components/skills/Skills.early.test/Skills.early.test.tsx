import { act, fireEvent, render, screen } from '@testing-library/react';
import Skills from '../Skills';
import { skillCat } from '../skillsData';
import '@testing-library/jest-dom';

// Mocking the SkillItem component
jest.mock('../SkillItem', () => {
	const SkillItem = ({ title, xp }: { title: string; xp: number }) => (
		<div data-testid='skill-item'>
			<span>{title}</span>
			<span>{xp}</span>
		</div>
	);
	SkillItem.displayName = 'SkillItem';
	return SkillItem;
});

// Mocking framer-motion components
jest.mock('framer-motion', () => ({
	motion: {
		section: ({ children }: { children: React.ReactNode }) => (
			<section>{children}</section>
		),
		div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
		h1: ({ children }: { children: React.ReactNode }) => <h1>{children}</h1>,
	},
	AnimatePresence: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
}));

describe('Skills component', () => {
	beforeAll(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.clearAllTimers();
	});

	// Happy Path Tests
	describe('Happy Path', () => {
		it('should render the Skills component correctly', () => {
			render(<Skills />);
			const softSkillName = skillCat['soft'].categoryName[0];
			expect(screen.getByText(softSkillName)).toBeInTheDocument();
		});

		it('should cycle through soft skills every 4500ms', () => {
			render(<Skills />);
			const initialSoftSkillName = skillCat['soft'].categoryName[0];
			expect(screen.getByText(initialSoftSkillName)).toBeInTheDocument();

			act(() => {
				jest.advanceTimersByTime(4500);
			});

			const nextSoftSkillName = skillCat['soft'].categoryName[1];
			expect(screen.getByText(nextSoftSkillName)).toBeInTheDocument();
		});

		it('should display the correct percentage for the soft skills', () => {
			render(<Skills />);
			const percentage = skillCat['soft'].percentage;
			expect(screen.getByText(`${percentage}%`)).toBeInTheDocument();
		});
	});

	// Edge Case Tests
	describe('Edge Cases', () => {
		it('should stop cycling soft skills on mouse enter and resume on mouse leave', () => {
			render(<Skills />);
			const initialSoftSkillName = skillCat['soft'].categoryName[0];
			expect(screen.getByText(initialSoftSkillName)).toBeInTheDocument();

			const hardSkillCategory = Object.keys(skillCat).find(
				(key) => key !== 'soft'
			)!;
			const hardSkillElement = screen.getByText(
				skillCat[hardSkillCategory].categoryName[0]
			);
			fireEvent.mouseEnter(hardSkillElement);

			act(() => {
				jest.advanceTimersByTime(4500);
			});

			expect(screen.getByText(initialSoftSkillName)).toBeInTheDocument();

			fireEvent.mouseLeave(hardSkillElement);

			act(() => {
				jest.advanceTimersByTime(4500);
			});

			const nextSoftSkillName = skillCat['soft'].categoryName[1];
			expect(screen.getByText(nextSoftSkillName)).toBeInTheDocument();
		});
		it('should handle empty skill categories gracefully', () => {
			const emptySkillCat = {
				...skillCat,
				empty: { categoryName: [], percentage: 0 },
			};
			jest.mock('../skillsData', () => ({ skillCat: emptySkillCat }));

			render(<Skills />);
			expect(
				screen.getByText(skillCat['soft'].categoryName[0])
			).toBeInTheDocument();
		});
	});
});
