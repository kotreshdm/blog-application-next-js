import apiService from "@/utils/api";
// import defaultOgImg from "../../../public/images/default-og-img.webp";

export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const res = await apiService.get(`/public/blogs?slug=${slug}`);
    const blog = res.data;
    const imageUrl =
      "https://www.paromitadas.com/clothing-designer/wp-content/uploads/2023/12/Product-Brief-or-Style-Brief.jpg";

    return {
      title: `${blog.name}`,
      description: blog.seoDescription,
      keywords: blog.seoKeyword,

      openGraph: {
        title: blog.name,
        type: "article",
        url: `https://www.example.com/blog/${slug}`, // Replace with actual URL
        site_name: "Your Site Name",
        locale: "en_US",
        description: blog.seoDescription,
        images: [
          {
            url: imageUrl,
            width: 800,
            height: 600,
            alt: blog.name,
            type: "image/jpeg",
          },
        ],
        article: {
          published_time: blog.publishedAt,
          modified_time: blog.updatedAt,
          author: "https://www.facebook.com/authorPage", // Replace with author's profile link
          publisher: "https://www.facebook.com/publisherPage", // Replace with publisher's profile link
        },
      },

      twitter: {
        card: "summary_large_image",
        creator: "@yourTwitterHandle", // Replace with actual Twitter handle
        site: "@yourTwitterSiteHandle", // Replace with actual Twitter site handle
        title: blog.name,
        description: blog.seoDescription,
        image: imageUrl,
        label1: "Written by",
        data1: "Author Name", // Replace with actual author name
        label2: "Est. reading time",
        data2: `${Math.ceil(blog.wordCount / 200)} minutes`, // Estimated reading time based on word count
      },

      canonical: `https://www.example.com/blog/${slug}`, // Canonical URL
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);

    return {
      title: "Blog Not Found",
      description: "The blog you are looking for could not be found.",

      openGraph: {
        title: "Blog Not Found",
        description: "The blog you are looking for could not be found.",
        images: [
          {
            url: "/default-og-image.jpg",
            width: 800,
            height: 600,
            alt: "Blog Not Found",
          },
        ],
        type: "website",
        site_name: "Your Site Name",
        locale: "en_US",
      },

      twitter: {
        card: "summary_large_image",
        creator: "@yourTwitterHandle",
        site: "@yourTwitterSiteHandle",
        title: "Blog Not Found",
        description: "The blog you are looking for could not be found.",
        image: "/default-og-image.jpg",
      },
    };
  }
}

export default function RootLayout({ children }) {
  return <main className='justify-between'>{children}</main>;
}
