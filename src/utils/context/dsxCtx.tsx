type MyContextType = {
  posts: PostType[];
  loadingPosts: boolean;
  error: string | null;
  modalType: "add" | "edit" | "delete" | null;
  selectedPost: PostType | null;
  updataPosts: (data: PostType[]) => void;
  updataLoading: (data: boolean) => void;
  updataError: (data: string | null) => void;
  updataModalType: (data: "add" | "edit" | "delete" | null) => void;
  updataSelectedPost: (data: PostType | null) => void;
  fetchPosts: () => void;
  toatalPages: number;
  PerPageCount: number;
  currentPage: number;
  updateCurrentPage: (page: number) => void;
  updatePerPageCount: (count: number) => void;
  categories: CategoryType[];
  loadingCategories: boolean;
  errorCategories: string | null;
  fetchCategories: () => void;
};

const DashboardContext = createContext<MyContextType>({
  posts: [],
  loadingPosts: false,
  error: null,
  modalType: null,
  selectedPost: null,
  fetchPosts: () => {},
  updataPosts: () => {},
  updataLoading: () => {},
  updataError: () => {},
  updataModalType: () => {},
  updataSelectedPost: () => {},
  toatalPages: 0,
  PerPageCount: 10,
  currentPage: 1,
  updateCurrentPage: () => {},
  updatePerPageCount: () => {},
  categories: [],
  loadingCategories: false,
  errorCategories: null,
  fetchCategories: () => {},
});
