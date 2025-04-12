
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const dropdownMenus = [
  { id: 1, name: 'Produk', targetId: 'produk' },
  { id: 2, name: 'Artikel', path: '/article' },
  { id: 3, name: 'Event', targetId: 'event' },
  { id: 4, name: 'Galeri Foto', targetId: 'gallery' },
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleHomeClick = () => {
    router.push('/');
  };

  const handleNavigate = (item: any) => {
    if (item.path) {
      router.push(item.path);
    } else if (item.targetId) {
      const targetElement = document.getElementById(item.targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="bg-white text-black shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-black">
          <img src="/resource/logo.png" alt="Logo" className="h-15 w-auto" />
        </div>

        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden text-black text-xl"
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li className="relative group">
            <button
              onClick={handleHomeClick}
              className="text-black hover:text-red-500 transition"
            >
              Home ▼
            </button>
            <ul className="absolute top-full mt-2 w-48 bg-white shadow-md rounded-md p-2 space-y-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200">
              {dropdownMenus.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigate(item)}
                    className="w-full text-left px-3 py-1 text-black hover:bg-red-100 hover:text-red-600 rounded"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </li>

          {otherMenus.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavigate(item)}
                className="text-black hover:text-red-500 transition"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <ul className="md:hidden px-4 pb-4 space-y-2 bg-white text-black">
          <li>
            <button
              onClick={toggleDropdown}
              className="flex justify-between w-full font-semibold"
            >
              <span>Home</span>
              <span>{isDropdownOpen ? '▲' : '▼'}</span>
            </button>

            {isDropdownOpen && (
              <ul className="ml-4 space-y-1 mt-2">
                {dropdownMenus.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        handleNavigate(item);
                        setIsMobileOpen(false);
                      }}
                      className="block w-full text-left hover:text-red-500 transition"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {otherMenus.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  handleNavigate(item);
                  setIsMobileOpen(false);
                }}
                className="block w-full text-left hover:text-red-500 transition"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
