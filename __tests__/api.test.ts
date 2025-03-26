import { getPosts, getPost, createPost, updatePost, deletePost } from "../lib/api"; 
import Parse from "parse";

// Mock Parse API calls
jest.mock("parse");


const newPostData = { title: "New Post", content: "New Content", author: "Jane Doe" };

describe("Blog API Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (Parse.Object.extend as jest.Mock).mockReturnValue(
      class {
        set = jest.fn();
        save = jest.fn().mockResolvedValue({ 
          id: "2", 
          get: (key: string) => newPostData[key as keyof typeof newPostData] 
        });
      }
    );
  });

  test("should fetch all posts", async () => {
    const mockPosts = [
      { id: "1", get: (key: string) => ({ title: "Test Post", content: "Test Content", author: "John Doe" }[key]) },
    ];

    (Parse.Query.prototype.find as jest.Mock).mockResolvedValue(mockPosts);

    const posts = await getPosts();
    expect(posts).toHaveLength(1);
    expect(posts[0].title).toBe("Test Post");
  });

  test("should fetch a single post", async () => {
    const mockPost = {
      id: "1",
      get: (key: string) => ({ title: "Test Post", content: "Test Content", author: "John Doe" }[key]),
    };

    (Parse.Query.prototype.get as jest.Mock).mockResolvedValue(mockPost);

    const post = await getPost("1");
    expect(post.title).toBe("Test Post");
  });

  test("should create a new post", async () => {
    const mockSavedPost = {
      id: "2",
      get: (key: string) => newPostData[key as keyof typeof newPostData],
    };

    (Parse.Object.prototype.save as jest.Mock).mockResolvedValue(mockSavedPost);

    const createdPost = await createPost(newPostData);
    expect(createdPost.title).toBe("New Post");
  });

  test("should update an existing post", async () => {
    const updatedData = { title: "Updated Post", content: "Updated Content", author: "Jane Doe" };
    const mockUpdatedPost = {
      id: "1",
      get: (key: string) => updatedData[key as keyof typeof updatedData],
    };

    (Parse.Query.prototype.get as jest.Mock).mockResolvedValue({
      set: jest.fn(),
      save: jest.fn().mockResolvedValue(mockUpdatedPost),
    });

    const updatedPost = await updatePost("1", updatedData);
    expect(updatedPost.title).toBe("Updated Post");
  });

  test("should delete a post", async () => {
    (Parse.Query.prototype.get as jest.Mock).mockResolvedValue({
      destroy: jest.fn().mockResolvedValue(true),
    });

    const result = await deletePost("1");
    expect(result).toBe(true);
  });
});
