'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const dropdownMenus = [
  { id: 1, name: 'Produk', targetId: 'produk' },
  { id: 2, name: 'Artikel', targetId: 'artikel' },
  { id: 3, name: 'Event', targetId: 'event' },
  { id: 4, name: 'Galeri Foto', targetId: 'gallry' },
  { id: 5, name: 'Klien Kami', targetId: 'our-client' },
];

const otherMenus = [
  { id: 6, name: 'About us', targetId: 'about-us' },
  { id: 7, name: 'Visi Misi', targetId: 'visi-misi' },
  { id: 8, name: 'Kontak', targetId: 'kontak' },
  { id: 9, name: 'Login', targetId: 'login' },
];

const Navbar = () => {
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // untuk home dropdown

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleHomeClick = () => {
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">CompanyName</div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden text-gray-700 text-xl"
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li className="relative group">
            <button
              onClick={handleHomeClick}
              className="text-gray-700 hover:text-blue-500 transition"
            >
              Home ▼
            </button>
            <ul className="absolute top-full mt-2 w-48 bg-white shadow-md rounded-md p-2 space-y-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200">
              {dropdownMenus.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.targetId}`}
                    className="block px-3 py-1 text-gray-700 hover:bg-blue-100 rounded"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>

          {otherMenus.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.targetId}`}
                className="text-gray-700 hover:text-blue-500 transition"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu - Accordion Style */}
      {isMobileOpen && (
        <ul className="md:hidden px-4 pb-4 space-y-2">
          <li>
            <button
              onClick={toggleDropdown}
              className="flex justify-between w-full font-semibold text-gray-600"
            >
              <span>Home</span>
              <span>{isDropdownOpen ? '▲' : '▼'}</span>
            </button>

            {isDropdownOpen && (
              <ul className="ml-4 space-y-1 mt-2">
                {dropdownMenus.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.targetId}`}
                      className="block text-gray-700 hover:text-blue-500 transition"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {otherMenus.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.targetId}`}
                className="block text-gray-700 hover:text-blue-500 transition"
                onClick={() => setIsMobileOpen(false)}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
