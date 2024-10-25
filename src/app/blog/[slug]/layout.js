import apiService from "@/utils/api";

export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const res = await apiService.get(`/public/blogs?slug=${slug}`);
    const blog = res.data;

    return {
      title: `${blog.name} - My Blog`,
      description: blog.seoDescription,
      keywords: blog.seoKeyword,
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Blog Not Found",
      description: "The blog you are looking for could not be found.",
    };
  }
}

export default function RootLayout({ children }) {
  return <main className='justify-between'>{children}</main>;
}
