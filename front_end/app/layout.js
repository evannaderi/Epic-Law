import './globals.css';
import { Outfit } from 'next/font/google';
import { Providers } from './providers';
const outfit = Outfit({ subsets: ['latin'] });

export const metadata = {
	title: 'Epic Law',
	description: 'Best Law Assistant',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<Providers>
				<body className={outfit.className}>{children}</body>{' '}
			</Providers>
		</html>
	);
}
