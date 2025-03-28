"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import DarkModeToggle from "../darkModeToggle/DarkModeToggle";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Tech Pack", href: "/tech-pack" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Manufacturing", href: "/manufacturing" },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "/contact" },
];

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <nav className='bg-gray-800 sticky top-0 z-50'>
      <div className='mx-auto max-w-12xl px-2 sm:px-2 lg:px-2'>
        <div className='relative flex h-16 items-center justify-between'>
          {/* Mobile Menu Button */}
          <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type='button'
              className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none'
              aria-controls='mobile-menu'
              aria-expanded={isMobileMenuOpen}
            >
              <span className='sr-only'>Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className='size-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path d='M6 18L18 6M6 6l12 12' />
                </svg>
              ) : (
                <svg
                  className='size-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
                </svg>
              )}
            </button>
          </div>

          {/* Logo & Navigation Links */}
          <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-between'>
            <div className='flex shrink-0 items-center'>
              <img
                className='h-8 w-auto'
                src='https://placehold.co/600x400.png'
                alt='Your Company'
              />
            </div>
            <div className='hidden sm:ml-6 sm:block'>
              <div className='flex space-x-4'>
                {navLinks.map((nav) => (
                  <Link
                    href={nav.href}
                    className='rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                    key={nav.name}
                  >
                    {nav.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* User Profile Dropdown */}
          <div className='relative' ref={dropdownRef}>
            <button
              type='button'
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className='relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none'
            >
              <span className='sr-only'>Open user menu</span>
              <img
                className='size-8 rounded-full'
                src='https://placehold.co/600x400.png'
                alt=''
              />
            </button>

            {isDropdownOpen && (
              <div className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none'>
                <Link
                  href='#'
                  className='block px-4 py-2 text-sm text-gray-700'
                >
                  Your Profile
                </Link>
                <Link
                  href='#'
                  className='block px-4 py-2 text-sm text-gray-700'
                >
                  Settings
                </Link>
                <Link
                  href='#'
                  className='block px-4 py-2 text-sm text-gray-700'
                >
                  Sign out
                </Link>
              </div>
            )}
          </div>

          <DarkModeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='sm:hidden' id='mobile-menu'>
          <div className='space-y-1 px-2 pt-2 pb-3'>
            {navLinks.map((nav) => (
              <Link
                href={nav.href}
                className='block rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                key={nav.name}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {nav.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
