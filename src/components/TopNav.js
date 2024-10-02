// import ThemeToggle from "@/components/theme/ThemeToggle";
import { useTheme } from "@/context/theme";
import Link from "next/link";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useSession, signOut } from "next-auth/react";

export default function TopNav() {
  const { data, status, loading } = useSession();

  const { theme, toggleTheme } = useTheme();
  return (
    <nav className='nav shadow justify-content-between mb-3'>
      <div className='d-flex justify-content-start'>
        <Link href='/' className='nav-link'>
          TechPack Designers
        </Link>
      </div>
      <div className='d-flex align-items-center'>
        {status === "authenticated" ? (
          <>
            <Link className='nav-link' href='/dashboard/user'>
              {data?.user?.name}
            </Link>

            {data?.user?.role
              ?.filter((r) => r !== "subscriber")
              .map((r) => (
                <Link className='nav-link' href={`/dashboard/${r}`}>
                  {r?.charAt(0).toUpperCase()}
                  {r?.slice(1)}
                </Link>
              ))}

            <a
              className='nav-link pointer'
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              Logout
            </a>
          </>
        ) : (
          <div className='d-flex justify-content-center'>
            <Link className='nav-link' href='/login'>
              Login
            </Link>

            <Link className='nav-link' href='/register'>
              Register
            </Link>
          </div>
        )}
        <button className='nav-link' onClick={toggleTheme}>
          {theme === "light" ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
        </button>
      </div>
    </nav>
  );
}
