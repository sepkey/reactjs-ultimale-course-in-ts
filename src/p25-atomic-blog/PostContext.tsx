import { faker } from "@faker-js/faker";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type Post = {
  body: string;
  title: string;
};

type ContextType = {
  posts: Post[];
  onClearPosts: () => void;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  searchQuery: string;
  onAddPost: (post: Post) => void;
};
const PostContext = createContext<ContextType | null>(null);

export function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

function PostProvider({ children }: PropsWithChildren) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post: Post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  return (
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        onClearPosts: handleClearPosts,
        searchQuery,
        setSearchQuery,
        onAddPost: handleAddPost,
        // onAddPost: handleAddPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

function usePosts() {
  const context = useContext(PostContext) as ContextType;
  if (context === undefined) throw new Error("Out of post context");
  return context;
}
export { PostProvider, usePosts };
