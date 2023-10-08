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
			<body className={outfit.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
