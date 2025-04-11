import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-red-500 pt-10 pb-4 drop-shadow-[0_0_6px_rgba(255,0,0,0.6)]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Konten utama: Logo, Deskripsi, Link, dan Social Icons */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold">Company Name</h2>
            <p className="text-sm mt-2 text-center md:text-left text-red-400">
              Empowering your business with innovative solutions.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-6">
              <a href="#" className="hover:text-red-300 transition text-sm" aria-label="Home">
                Home
              </a>
              <a href="#" className="hover:text-red-300 transition text-sm" aria-label="Products">
                Products
              </a>
              <a href="#" className="hover:text-red-300 transition text-sm" aria-label="About">
                About
              </a>
              <a href="#" className="hover:text-red-300 transition text-sm" aria-label="Contact">
                Contact
              </a>
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-red-300 transition" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22,12a10,10,0,1,0-11.5,9.9V15.4H8.1V12h2.4V9.8c0-2.4,1.4-3.7,3.5-3.7a14.4,14.4,0,0,1,2,0v2.2H16.1c-1.1,0-1.4.7-1.4,1.4V12h2.4l-.4,3.4H14.7v6.5A10,10,0,0,0,22,12Z" />
                </svg>
              </a>
              <a href="#" className="hover:text-red-300 transition" aria-label="Twitter">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46,6c-.77.35-1.6.59-2.46.69A4.3,4.3,0,0,0,21.86,4.3a8.52,8.52,0,0,1-2.72,1A4.27,4.27,0,0,0,16,4a4.26,4.26,0,0,0-4.26,4.26,4.59,4.59,0,0,0,.11,0.97A12.12,12.12,0,0,1,3,5.16A4.25,4.25,0,0,0,4.47,10a4.19,4.19,0,0,1-1.93-.53v0.06A4.26,4.26,0,0,0,4.26,14a4.28,4.28,0,0,1-1.12.15A4.35,4.35,0,0,1,2,14.12a4.27,4.27,0,0,0,4,2.97,8.54,8.54,0,0,1-5.29,1.82,8.71,8.71,0,0,1-1-0.06,12.07,12.07,0,0,0,6.54,1.92c7.85,0,12.13-6.5,12.13-12.13,0-.18-.01-.35-.02-.53A8.66,8.66,0,0,0,22.46,6Z" />
                </svg>
              </a>
              <a href="#" className="hover:text-red-300 transition" aria-label="LinkedIn">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.45 20.45h-3.55v-5.6c0-1.33-.03-3.04-1.86-3.04-1.87 0-2.16 1.46-2.16 2.97v5.67H9.63V9h3.41v1.56h.05c.47-.89 1.62-1.83 3.33-1.83 3.56 0 4.22 2.34 4.22 5.38v6.35ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm1.78 13.02H3.56V9h3.56v11.45ZM22.23 0H1.77A1.77 1.77 0 0 0 0 1.77v20.46A1.77 1.77 0 0 0 1.77 24h20.46A1.77 1.77 0 0 0 24 22.23V1.77A1.77 1.77 0 0 0 22.23 0Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Section bawah */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-red-400">
            &copy; {new Date().getFullYear()} Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
