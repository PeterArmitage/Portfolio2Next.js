'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import ThreeJsLoader from './Loading';

interface LoadingManagerProps {
	children: React.ReactNode;
	minimumLoadTime?: number;
}

const LoadingManager: React.FC<LoadingManagerProps> = ({
	children,
	minimumLoadTime = 500, // Default minimum load time of 500ms
}) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [loading, setLoading] = useState(false);

	const startLoading = useCallback(() => {
		setLoading(true);
	}, []);

	const stopLoading = useCallback(() => {
		const stopLoadingTimer = setTimeout(() => {
			setLoading(false);
		}, minimumLoadTime);

		return () => clearTimeout(stopLoadingTimer);
	}, [minimumLoadTime]);

	useEffect(() => {
		startLoading();
		return stopLoading();
	}, [pathname, searchParams, startLoading, stopLoading]);

	return (
		<>
			{loading && <ThreeJsLoader />}
			{children}
		</>
	);
};

export default LoadingManager;
