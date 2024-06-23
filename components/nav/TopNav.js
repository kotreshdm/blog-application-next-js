import Link from "next/link";
import React from "react";
import ThemeToggle from "../theme/ThemeToggle";

const TopNav = () => {
  return (
    <nav className='nav shadow justify-content-between mb-3'>
      <div className='d-flex justify-content-start'>
        <Link href='/' className='nav-link'>
          🌀 Next Blog
        </Link>

        <a className='nav-link' href='/blog/create'>
          Write a Blog
        </a>
      </div>
      <div className='d-flex align-items-center'>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default TopNav;
