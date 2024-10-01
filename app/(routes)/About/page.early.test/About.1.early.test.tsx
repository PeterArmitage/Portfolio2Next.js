// Unit tests for: About

import { render, screen } from '@testing-library/react';
import React from 'react';
import About from '../page';
import { describe, it, expect } from '@jest/globals';
import { jest } from '@jest/globals';
// Mocking dynamic imports

jest.mock('next/dynamic', () => ({
	__esModule: true,
	default: (
		importFn: () => React.ComponentType,
		options: { ssr?: boolean }
	) => {
		const Component = importFn();
		Component.displayName = options.ssr ? 'SSRComponent' : 'NoSSRComponent';
		return Component;
	},
}));

// Mocking the components that are dynamically imported
jest.mock('../../../components/AnimatedImage/AnimatedImage', () => {
	const AnimatedImage = () => <div>AnimatedImage</div>;
	AnimatedImage.displayName = 'AnimatedImage';
	return AnimatedImage;
});
jest.mock('../../../components/AnimatedBackground/AnimatedBackground', () => {
	const AnimatedBackground = () => <div>AnimatedBackground</div>;
	AnimatedBackground.displayName = 'AnimatedBackground';
	return AnimatedBackground;
});

describe('About() About method', () => {
	// Happy Path Tests
	describe('Happy Path', () => {
		it('should render the About component correctly', () => {
			// This test checks if the About component renders without crashing
			render(<About />);
			expect(screen.getByText(/Hello! My name is Pete/i)).toBeTruthy();
		});
		it('should render AnimatedBackground when isClient is true', () => {
			// This test checks if the AnimatedBackground component is rendered when isClient is true
			render(<About />);
			expect(screen.getByText('AnimatedBackground')).toBeTruthy();
		});

		it('should render AnimatedImage when isClient is true', () => {
			// This test checks if the AnimatedImage component is rendered when isClient is true
			render(<About />);
			expect(screen.getByText('AnimatedImage')).toBeTruthy();
		});
	});

	// Edge Case Tests
	describe('Edge Cases', () => {
		it('should not render AnimatedBackground or AnimatedImage if isClient is false', () => {
			// This test checks if the AnimatedBackground and AnimatedImage components are not rendered when isClient is false
			jest
				.spyOn(React, 'useState')
				.mockImplementationOnce(() => [false, jest.fn()]);
			render(<About />);
			expect(screen.queryByText('AnimatedBackground')).toBeNull();
			expect(screen.queryByText('AnimatedImage')).toBeNull();
		});
	});
});

// End of unit tests for: About
