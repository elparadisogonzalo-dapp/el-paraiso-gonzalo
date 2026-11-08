import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'El Paraíso Gonzalo', description: 'A secure financial platform for modern money.', icons: { icon: '/icon.png', apple: '/icon.png' } };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) { return <html lang="en"><body>{children}</body></html>; }
