import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Space_Mono, Exo_2 } from 'next/font/google';
import './globals.scss';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});

const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

const spaceMono = Space_Mono({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-space-mono',
});

const exo2 = Exo_2({
	subsets: ['latin'],
	weight: ['400', '600'],
	variable: '--font-exo-2',
});

export const metadata: Metadata = {
	title: 'Portfolio',
	description: 'Portfolio created by Next.js',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${spaceMono.variable} ${exo2.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
