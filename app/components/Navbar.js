'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const pathname = usePathname();

  const isActiveLink = (link) => {
    return pathname === link
      ? 'bg-blue-600 px-2 py-1 rounded-md hover:bg-blue-500 text-gray-400' 
      : 'hover:text-gray-400';
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center space-x-6">
        <div className="font-bold text-xl">MicroFinance</div>

        <div className="flex items-center space-x-4">
          <Link href="/">
            <span className={`${isActiveLink('/')} cursor-pointer`}>Home</span>
          </Link>

          <Link href="/blog">
            <span className={`${isActiveLink('/blog')} cursor-pointer`}>Blog</span>
          </Link>

          <Link href="/donate_us">
            <span className={`${isActiveLink('/donate_us')} cursor-pointer`}>Donate us</span>
          </Link>

          <Link href="/about">
            <span className={`${isActiveLink('/about')} cursor-pointer`}>About</span>
          </Link>
          <Link href="/logins">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500">
              Login
            </button>
          </Link>
          
        </div>
      </div>
    </nav>
  );
}
