"use client";
import React, { useEffect, useState } from "react";
import apiService from "@/app/services/apiService";
import CommunitySidebar from "./CommunitySidebar";
import StoryModal from "./StoryModal";
import LeftSide from "./LeftSide"; // Import the LeftSide component
import { IconThumbUp, IconFileOrientation } from "@tabler/icons-react";

// Type Definitions
interface User {
  id: string;
  name: string;
  avatar_url: string;
  bio?: string;
  location?: string;
  jobTitle?: string;
}

interface Comment {
  id: string;
  user: User;
  text: string;
}

interface Post {
  id: string;
  user: User;
  text: string;
  image?: string;
  video?: string;
  likes_count: number;
  comments_count: number;
  comments: Comment[];
}

interface NewPost {
  text: string;
  image: File | null;
  video: File | null;
}

const CommunityPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showProfileForm, setShowProfileForm] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState<NewPost>({
    text: "",
    image: null,
    video: null,
  });
  const [loading, setLoading] = useState(true);
  const [stories] = useState([
    {
      id: 1,
      user: { name: "testuser1", avatar_url: "/p1.jpeg" },
      video: "/5.mp4",
    },
    {
      id: 2,
      user: { name: "testuser2", avatar_url: "/p2.jpeg" },
      video: "/6.mp4",
    },
    {
      id: 3,
      user: { name: "test user11", avatar_url: "/p3.jpeg" },
      video: "/main.mp4",
    },
  ]);
  const [selectedStory, setSelectedStory] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await apiService.get("/api/community/posts/");
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const fileType = file.type.split("/")[0];
      if (fileType === "image") {
        setNewPost((prev: NewPost) => ({
          ...prev,
          image: file,
          video: null,
        }));
      } else if (fileType === "video") {
        setNewPost((prev: NewPost) => ({
          ...prev,
          video: file,
          image: null,
        }));
      }
    }
  };

  const handlePostSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", newPost.text);
    if (newPost.image) formData.append("image", newPost.image);
    if (newPost.video) formData.append("video", newPost.video);

    try {
      const data = await apiService.post(
        "/api/community/posts/create/",
        formData
      );
      setPosts([data, ...posts]);
      setNewPost({ text: "", image: null, video: null });
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  // Define handleLike function
  const handleLike = async (postId: string): Promise<void> => {
    try {
      await apiService.post(`/api/community/posts/${postId}/like/`, {});
      setPosts((prev: Post[]) =>
        prev.map((post) =>
          post.id === postId
            ? { ...post, likes_count: post.likes_count + 1 }
            : post
        )
      );
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  // Define handleComment function
  const handleComment = async (
    postId: string,
    commentText: string
  ): Promise<void> => {
    try {
      const data = await apiService.post(
        `/api/community/posts/${postId}/comment/`,
        { text: commentText }
      );
      setPosts((prev: Post[]) =>
        prev.map((post) =>
          post.id === postId
            ? { ...post, comments: [...post.comments, data] }
            : post
        )
      );
    } catch (error) {
      console.error("Failed to comment on post:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 text-gray-800 h-screen">

      <LeftSide 
        user={user}
        setUser={setUser}
        showProfileForm={showProfileForm}
        setShowProfileForm={setShowProfileForm}
      />

      <div className="w-full p-5 md:p-0 md:w-3/4 md:mx-4 md:px-10 relative overflow-y-auto">
        <div className="mt-5 mb-6">
          <h4 className="text-lg font-bold mb-4 text-gray-900">Stories</h4>
          <div className="flex gap-4 font-sans font-semibold text-xs">
            {stories.map((story) => (
              <div
                key={story.id}
                onClick={() => setSelectedStory(story.video)}
                className="cursor-pointer"
              >
                <img
                  src={story.user.avatar_url}
                  alt={`${story.user.name}'s avatar`}
                  className="w-16 h-16 rounded-full mb-2 border-2 border-emerald-500"
                />
                <p className="text-center text-sm text-gray-800">
                  {story.user.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {selectedStory && (
          <StoryModal
            videoUrl={selectedStory}
            onClose={() => setSelectedStory(null)}
          />
        )}

        <div className="mb-8 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 md:max-h-none">
          {loading ? (
            <p className="text-center text-gray-500"> Login to view community posts</p>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-white border rounded-3xl font-sans font-semibold border-gray-200 mb-6 p-6 shadow-sm"
              >
                <div className="flex items-center mb-4">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {post.user.name}
                  </h3>
                </div>
                <p className="text-gray-700 mb-4">{post.text}</p>
                {post.image && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_HOST}${post.image}`}
                    alt="Post image"
                    className="w-full h-auto rounded mb-4"
                  />
                )}
                {post.video && (
                  <video
                    src={`${process.env.NEXT_PUBLIC_API_HOST}${post.video}`}
                    controls
                    className="w-full h-auto rounded mb-4"
                  />
                )}
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="text-emerald-500 font-semibold hover:underline flex items-center"
                  >
                    <IconThumbUp className="text-teal-700 h-5 w-5 flex-shrink-0 mr-1" />
                    {post.likes_count}
                  </button>
                  <button className="text-gray-500 rounded-3xl font-semibold hover:underline">
                    Comment {post.comments_count}
                  </button>
                </div>
                <div className="mt-6">
                  {(post.comments || []).map((comment) => (
                    <div key={comment.id} className="mb-3">
                      <strong className="text-gray-800">{comment.user.name}:</strong>{" "}
                      <span className="text-gray-600">{comment.text}</span>
                    </div>
                  ))}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleComment(post.id, e.currentTarget.comment.value);
                      e.currentTarget.comment.value = "";
                    }}
                    className="mt-4"
                  >
                    <input
                      type="text"
                      name="comment"
                      placeholder="Add a comment..."
                      className="w-full p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                    <button
                      type="submit"
                      className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-3xl mt-2 hover:bg-gray-200 transition-colors"
                    >
                      Comment
                    </button>
                  </form>
                </div>
              </div>
            ))
          )}
        </div>

        <form
          onSubmit={handlePostSubmit}
          className="fixed inset-x-0 bottom-0 bg-white p-4 shadow-md flex flex-col md:flex-row justify-center space-y-2 md:space-y-0"
        >
          <div className="w-full md:w-1/2 flex items-center space-x-3">
            <img
              src={user?.avatar_url || "/default-avatar.png"}
              alt="Profile"
              className="w-10 h-10 hidden md:block rounded-full border-2 border-emerald-500"
            />
            <input
              type="text"
              name="text"
              placeholder="What's on your mind?"
              value={newPost.text}
              onChange={(e) =>
                setNewPost((prev: NewPost) => ({
                  ...prev,
                  text: e.target.value,
                }))
              }
              className="flex-grow p-2 rounded-3xl bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <label className="cursor-pointer">
              <input
                type="file"
                name="media"
                accept="image/*,video/*"
                onChange={handleInputChange}
                className="hidden"
              />
              <IconFileOrientation className="text-teal-700 h-7 w-7 flex-shrink-0" />
            </label>
            <button
              type="submit"
              className="bg-teal-400 text-white py-2 px-4 rounded-3xl hover:bg-teal-400 transition-colors"
            >
              Post
            </button>
          </div>
        </form>

      </div>

      <div className="w-full md:w-1/4 hidden md:block bg-white px-6 py-4 rounded shadow-md">
        {/* Right Sidebar Content */}
        <CommunitySidebar />
      </div>
    </div>
  );
};

export default CommunityPage;
