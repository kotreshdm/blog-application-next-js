"use client";
import React, { createContext, useContext, useEffect, useReducer } from "react";

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
type PostState = {
  posts: PostType[];
  loading: boolean;
  error: string | null;
};
type categoryStateType = {
  categories: CategoryType[];
  loading: boolean;
  error: string | null;
};

const initialPostState: PostState = {
  posts: [],
  loading: false,
  error: null,
};
const initialCategoryState: categoryStateType = {
  categories: [],
  loading: false,
  error: null,
};

type MyContextType = {
  postState: PostState;
  categoryState: categoryStateType;
  fetchPosts: () => void;
  fetchCategories: () => void;
};

const DashboardContext = createContext<MyContextType>({
  postState: initialPostState,
  categoryState: initialCategoryState,
  fetchPosts: () => {},
  fetchCategories: () => {},
});

type PostAction =
  | { type: "SET_POSTS"; payload: PostType[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

type CategoryAction =
  | { type: "SET_CATEGORIES"; payload: CategoryType[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

export default function DashboardContextProvoider({
  children,
}: {
  children: React.ReactNode;
}) {
  const postReducer = (state: PostState, action: PostAction) => {
    switch (action.type) {
      case "SET_POSTS":
        return { ...state, posts: action.payload };
      case "SET_LOADING":
        return { ...state, loading: action.payload };
      case "SET_ERROR":
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };

  const catReducer = (state: categoryStateType, action: CategoryAction) => {
    switch (action.type) {
      case "SET_CATEGORIES":
        return { ...state, categories: action.payload };
      case "SET_LOADING":
        return { ...state, loading: action.payload };
      case "SET_ERROR":
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };

  const [postState, postDispatch] = useReducer(postReducer, initialPostState);
  const [categoryState, categoryDispatch] = useReducer(
    catReducer,
    initialCategoryState
  );
  // const [PerPageCount, setPerPageCount] = useState(10);
  // const [selectedPost, setSelectedPost] = useState<PostType | null>(null);
  // const [modalType, setModalType] = useState<"add" | "edit" | "delete" | null>(
  //   null
  // );

  // const toatalPages = Math.ceil(posts.length / PerPageCount);
  // const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const fetchPosts = async () => {
    postDispatch({ type: "SET_LOADING", payload: true });
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
      postDispatch({ type: "SET_POSTS", payload: data });
    } catch (error) {
      console.error("Error fetching posts:", error);
      postDispatch({
        type: "SET_ERROR",
        payload: "Failed to fetch posts",
      });
    } finally {
      postDispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const fetchCategories = async () => {
    categoryDispatch({ type: "SET_LOADING", payload: true });
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
      categoryDispatch({ type: "SET_CATEGORIES", payload: data });
    } catch (error) {
      console.error("Error fetching categories:", error);
      categoryDispatch({
        type: "SET_ERROR",
        payload: "Failed to fetch categories",
      });
    } finally {
      categoryDispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <DashboardContext.Provider
      value={{ postState, categoryState, fetchPosts, fetchCategories }}
    >
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
