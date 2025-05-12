// app/layout.tsx
import Header from './components/Header';
import Footer from './components/Footer';
import './globals.css';

export const metadata = {
  title: 'Eventsair Events Dashboard',
  description: 'A dashboard application built with Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow p-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}