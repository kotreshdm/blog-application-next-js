import AuthorNav from "@/components/nav/AuthorNav";

export default function AdminLayout({ children }) {
  return (
    <>
      <AuthorNav />
      {children}
    </>
  );
}
