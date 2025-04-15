"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
type MyContextType = {
  posts: PostType[];
  fetchPosts: () => void;
  categories: CategoryType[];
  fetchCategories: () => void;
};

const DashboardContext = createContext<MyContextType>({
  posts: [],
  fetchPosts: () => {},
  categories: [],
  fetchCategories: () => {},
});

export type PostType = {
  id: number;
  _id: number;
  name: string;
  createdAt: string;
};
export type CategoryType = {
  id: number;
  name: string;
  createdAt: string;
};
export default function DashboardContextProvoider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [PerPageCount, setPerPageCount] = useState(10);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loadingPosts, setLoadingPosts] = useState<boolean>(false);
  const [errorPosts, setErrorPosts] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);
  const [modalType, setModalType] = useState<"add" | "edit" | "delete" | null>(
    null
  );

  const toatalPages = Math.ceil(posts.length / PerPageCount);
  const [currentPage, setCurrentPage] = useState(1);

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(false);
  const [errorCategories, setErrorCategories] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const fetchPosts = async () => {
    setLoadingPosts(true);
    try {
      const response = await fetch("/api/dashboard/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      setErrorPosts("Failed to fetch posts");
    } finally {
      setLoadingPosts(false);
    }
  };

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const response = await fetch("/api/dashboard/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      setErrorCategories("Failed to fetch categories");
    } finally {
      setLoadingCategories(false);
    }
  };

  // const fetchPosts = async () => {
  // const addPost = async (post: Partial<PostType>) => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch("/api/dashboard/posts", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(post),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const data = await response.json();
  //     setPosts((prevPosts) => [...prevPosts, data]);
  //   } catch (error) {
  //     setError("Failed to add post");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // const editPost = async (post: Partial<PostType>) => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch("/api/dashboard/posts", {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(post),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const data = await response.json();
  //     setPosts((prevPosts) =>
  //       prevPosts.map((prev) => (prev.id === data.id ? data : prev))
  //     );
  //   } catch (error) {
  //     setError("Failed to edit post");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // const deletePost = async (id: number) => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch("/api/dashboard/posts", {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ id }),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const data = await response.json();
  //     setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  //   } catch (error) {
  //     setError("Failed to delete post");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const updataPosts = (data: PostType[]) => {
    setPosts(data);
  };
  const updataLoading = (data: boolean) => {
    setLoadingPosts(data);
  };
  const updataError = (data: string | null) => {
    setErrorPosts(data);
  };
  const updataModalType = (data: "add" | "edit" | "delete" | null) => {
    setModalType(data);
  };
  const updataSelectedPost = (data: PostType | null) => {
    setSelectedPost(data);
  };

  const updateCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  const updatePerPageCount = (count: number) => {
    setPerPageCount(count);
  };

  // const { data, isLoading, isError } = useQuery({
  const ctxVlaue = {
    posts,
    fetchPosts,
    categories,
    fetchCategories,
  };

  return (
    <DashboardContext.Provider value={ctxVlaue}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardContext must be used within a DashboardContextProvider"
    );
  }
  return context;
};
