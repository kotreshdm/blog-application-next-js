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
        url: `https://techpack-desiginers-app.netlify.app/blog/${slug}`,
        site_name: "Fashion Tech Pack Designer",
        locale: "en_US",
        description: blog.seoDescription,
        images: [
          {
            url: imageUrl,
            alt: blog.name,
            type: "image/jpeg",
            width: 1200, // LinkedIn optimal width
            height: 627, // LinkedIn optimal height
          },
        ],
        article: {
          published_time: blog.publishedAt,
          modified_time: blog.updatedAt,
          author: "https://www.facebook.com/urbanpurple",
          publisher: "http://www.facebook.com/techpacks",
        },
      },

      twitter: {
        card: "summary_large_image",
        creator: "@paromitadas",
        site: "@paromitadas",
        title: blog.name,
        description: blog.seoDescription,
        image: imageUrl,
        label1: "Written by",
        data1: "Paromita",
        label2: "Est. reading time",
        data2: `${Math.ceil(blog.wordCount / 200)} minutes`,
      },

      canonical: `https://www.techpack-desiginers-app.netlify.app/blog/${slug}`,
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
