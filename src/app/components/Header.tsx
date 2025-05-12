// app/components/Header.tsx
import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-gray-800 text-white p-4">
            <nav className="flex justify-between items-center">
                <Link href="/" className="text-lg font-bold">
                    My App
                </Link>
                <div className="space-x-4">
                    <Link href="/">Home</Link>
                    <Link href="/events">Events</Link>
                    <Link href="/registrations">Registrations</Link>
                    <button className="bg-red-500 px-3 py-1 rounded">Login</button>
                </div>
            </nav>
        </header>
    );
}

