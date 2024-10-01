// Unit tests for: Skills

import { act, fireEvent, render, screen } from '@testing-library/react';
import Skills from '../Skills';
import { skillCat } from '../skillsData';

// Mocking the SkillItem component
jest.mock('../SkillItem', () => ({ title, xp }: any) => (
	<div data-testid='skill-item'>
		<span>{title}</span>
		<span>{xp}</span>
	</div>
));

// Mocking framer-motion components
jest.mock('framer-motion', () => ({
	motion: {
		section: ({ children }: any) => <section>{children}</section>,
		div: ({ children }: any) => <div>{children}</div>,
		h1: ({ children }: any) => <h1>{children}</h1>,
	},
	AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Skills() Skills method', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.clearAllTimers();
	});

	// Happy Path Tests
	describe('Happy Path', () => {
		it('should render the Skills component correctly', () => {
			// Render the component
			render(<Skills />);

			// Check if the component renders the soft skills category name
			const softSkillName = skillCat['soft'].categoryName[0];
			expect(screen.getByText(softSkillName)).toBeInTheDocument();
		});

		it('should cycle through soft skills every 4500ms', () => {
			// Render the component
			render(<Skills />);

			// Initial soft skill
			const initialSoftSkillName = skillCat['soft'].categoryName[0];
			expect(screen.getByText(initialSoftSkillName)).toBeInTheDocument();

			// Fast-forward time by 4500ms
			act(() => {
				jest.advanceTimersByTime(4500);
			});

			// Next soft skill
			const nextSoftSkillName = skillCat['soft'].categoryName[1];
			expect(screen.getByText(nextSoftSkillName)).toBeInTheDocument();
		});

		it('should display the correct percentage for the soft skills', () => {
			// Render the component
			render(<Skills />);

			// Check if the percentage is displayed correctly
			const percentage = skillCat['soft'].percentage;
			expect(screen.getByText(`${percentage}%`)).toBeInTheDocument();
		});
	});

	// Edge Case Tests
	describe('Edge Cases', () => {
		it('should stop cycling soft skills on mouse enter and resume on mouse leave', () => {
			// Render the component
			render(<Skills />);

			// Initial soft skill
			const initialSoftSkillName = skillCat['soft'].categoryName[0];
			expect(screen.getByText(initialSoftSkillName)).toBeInTheDocument();

			// Simulate mouse enter on a hard skill category
			const hardSkillCategory = Object.keys(skillCat).find(
				(key) => key !== 'soft'
			)!;
			const hardSkillElement = screen.getByText(
				skillCat[hardSkillCategory].categoryName
			);
			fireEvent.mouseEnter(hardSkillElement);

			// Fast-forward time by 4500ms
			act(() => {
				jest.advanceTimersByTime(4500);
			});

			// Ensure the soft skill has not changed
			expect(screen.getByText(initialSoftSkillName)).toBeInTheDocument();

			// Simulate mouse leave
			fireEvent.mouseLeave(hardSkillElement);

			// Fast-forward time by 4500ms
			act(() => {
				jest.advanceTimersByTime(4500);
			});

			// Next soft skill
			const nextSoftSkillName = skillCat['soft'].categoryName[1];
			expect(screen.getByText(nextSoftSkillName)).toBeInTheDocument();
		});

		it('should handle empty skill categories gracefully', () => {
			// Modify skillCat to have an empty category
			const emptySkillCat = {
				...skillCat,
				empty: { categoryName: [], percentage: 0 },
			};
			jest.mock('../skillsData', () => ({ skillCat: emptySkillCat }));

			// Render the component
			render(<Skills />);

			// Ensure no errors occur and the component renders correctly
			expect(
				screen.getByText(skillCat['soft'].categoryName[0])
			).toBeInTheDocument();
		});
	});
});

// End of unit tests for: Skills
