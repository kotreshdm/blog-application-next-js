import Link from "next/link";

export default function AuthorNav() {
  return (
    <>
      <nav className='nav justify-content-center mb-3'>
        <Link className='nav-link' href='/dashboard/author'>
          Author
        </Link>

        <a className='nav-link' href='/blog/create'>
          Write a Blog
        </a>

        <Link className='nav-link' href='/dashboard/author/blogs'>
          My Blogs
        </Link>
      </nav>
    </>
  );
}
