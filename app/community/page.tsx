"use client";
import React, { useEffect, useState } from "react";
import apiService from "@/app/services/apiService";
import CommunitySidebar from "./CommunitySidebar";
import StoryModal from "./StoryModal";
import {
  IconThumbUp,
  IconFileOrientation,
} from "@tabler/icons-react";
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
  // Profile state
  const [user, setUser] = useState<User | null>(null);
  const [showProfileForm, setShowProfileForm] = useState(true);

  // Friend requests and chat
  const [friends, setFriends] = useState<string[]>([]);
  const [requests, setRequests] = useState<string[]>(["Sunny Upadhay","Ganga Jaiswal", "Miya Sharma"]);

  // Posts
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState<NewPost>({ text: "", image: null, video: null });
  const [loading, setLoading] = useState(true);

  // Stories
  const [stories] = useState([
    { id: 1, user: { name: "Suman", avatar_url: "/p1.jpeg" }, video: "/social.mp4" },
    { id: 2, user: { name: "Shubham", avatar_url: "/p2.jpeg" }, video: "/social2.mp4" },
    { id: 3, user: { name: "Suraj", avatar_url: "/p3.jpeg" }, video: "/49.mp4" },
   
    
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

  // Handle profile form submission
  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const profilePicInput = form.elements.namedItem("profilePic") as HTMLInputElement;

    const name = nameInput.value;
    const avatar_url = URL.createObjectURL(profilePicInput.files![0]);

    setUser({ id: "1", name, avatar_url });
    setShowProfileForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files?.[0] || null;
    if (file) {
      const fileType = file.type.split("/")[0];
      if (fileType === "image") {
        setNewPost((prev) => ({ ...prev, image: file, video: null }));
      } else if (fileType === "video") {
        setNewPost((prev) => ({ ...prev, video: file, image: null }));
      }
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", newPost.text);
    if (newPost.image) formData.append("image", newPost.image);
    if (newPost.video) formData.append("video", newPost.video);

    try {
      const data = await apiService.post("/api/community/posts/create/", formData);
      setPosts([data, ...posts]);
      setNewPost({ text: "", image: null, video: null });
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      await apiService.post(`/api/community/posts/${postId}/like/`, {});
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId ? { ...post, likes_count: post.likes_count + 1 } : post
        )
      );
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  const handleComment = async (postId: string, commentText: string) => {
    try {
      const data = await apiService.post(`/api/community/posts/${postId}/comment/`, { text: commentText });
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId ? { ...post, comments: [...post.comments, data] } : post
        )
      );
    } catch (error) {
      console.error("Failed to comment on post:", error);
    }
  };

  const acceptRequest = (name: string) => {
    setFriends([...friends, name]);
    setRequests(requests.filter((req) => req !== name));
  };

  return (
    <div className="flex bg-gray-100 text-gray-800">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-white p-4 px-8 hidden md:block rounded shadow-md">
        <div className="profile mb-8 text-center">
          <img
            src={user?.avatar_url || "/default-avatar.png"}
            alt=""
            className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-"
          />
          <h3 className="text-xl font-semibold text-gray-900">{user?.name}</h3>
          {user?.bio && <p className="text-gray-600 rounded-3xl">{user.bio}</p>}
          {user?.location && <p className="text-gray-600">{user.location}</p>}
        </div>

        {showProfileForm && (
          <form onSubmit={handleProfileSubmit} className="mb-8">
            <h3 className="text-xl font-bold mb-4 rounded-3xl font-sans text-gray-900">Complete your profile</h3>
            <input
              type="file"
              name="profilePic"
              accept="image/*"
              className="block w-full rounded-3xl font-sans font-semibold text-xs text-gray-500 mb-2"
            />
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="w-full p-2 border rounded-3xl font-sans font-semibold text-xs border-gray-300 mb-2"
            />
            <input
              type="text"
              name="bio"
              placeholder="Enter your bio"
              className="w-full p-2 border font-sans font-semibold text-xs border-gray-300 rounded-3xl mb-2"
            />
            <input
              type="text"
              name="location"
              placeholder="Enter your location"
              className="w-full p-2 border font-sans font-semibold text-xs border-gray-300 rounded-3xl mb-2"
            />
            <button
              type="submit"
              className="w-full bg-emerald-500 font-sans  text-white py-2 px-4 rounded-3xl hover:bg-emerald-600 transition-colors"
            >
              Complete Profile
            </button>
          </form>
        )}

        <div className="friend-requests mb-8">
          <h4 className="text-lg font-bold mb-2 font-sans text-gray-900">Send Friend Requests</h4>
          {requests.map((req) => (
            <div key={req} className="mb-2 flex justify-between font-sans font-semibold items-center">
              <span>{req}</span>
              <button
                onClick={() => acceptRequest(req)}
                className="bg-emerald-500 text-white py-1 px-2 rounded-3xl hover:bg-emerald-500 transition-colors"
              >
                 request
              </button>
            </div>
          ))}
        </div>

        <div className="friends-list">
          <h4 className="text-lg font-bold font-sans mb-2 text-gray-900">Pending</h4>
          {friends.length > 0 ? (
            friends.map((friend, idx) => <div className="p-2 my-2 font-sans font-semibold text-center bg-emerald-500 rounded-3xl" key={idx}>{friend}</div>)
          ) : (
            <p className="text-gray-500">No friends yet</p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className=" w-full p-5 md:p-0 md:w-3/4 md:mx-4 md:px-10 relative">
        {/* Stories Section */}
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
                <p className="text-center text-sm text-gray-800">{story.user.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Display selected story */}
        {selectedStory && (
          <StoryModal
            videoUrl={selectedStory}
            onClose={() => setSelectedStory(null)}
          />
        )}
        {/* Posts List - Scrollable */}
        <div className="mb-8 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-white border rounded-3xl font-sans font-semibold border-gray-200 mb-6 p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  
                  <h3 className="font-semibold text-lg text-gray-900">{post.user.name}</h3>
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
                    className="text-emerald-500 font-semibold hover:underline"
                  >
                    <div className="flex flex-row">
                    <IconThumbUp className="text-teal-700 h-5 w-5 flex-shrink-0" />
                    {post.likes_count}
                    </div>
                  
                  </button>
                  <button className="text-gray-500 rounded-3xl font-semibold hover:underline">
                    Comment {post.comments_count}
                  </button>
                </div>
                <div className="mt-6">
                  {(post.comments || []).map((comment: Comment) => (
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

        {/* New Post Form - Fixed at the bottom */}
        <form
          onSubmit={handlePostSubmit}
          className=" w-full bottom-0 fixed left-0 right-0 bg-white p-4 rounded-3xl shadow-md flex items-center space-x-3"
        >
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
            onChange={(e) => setNewPost((prev) => ({ ...prev, text: e.target.value }))}
            className="flex-grow p-2 rounded-3xl bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <label className="cursor-pointer">
            <input
              type="file"
              name="media"
              accept="image/*,video/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const fileType = file.type.split("/")[0];
                  if (fileType === "image") {
                    setNewPost((prev) => ({ ...prev, image: file, video: null }));
                  } else if (fileType === "video") {
                    setNewPost((prev) => ({ ...prev, video: file, image: null }));
                  }
                }
              }}
              className="hidden"
            />
             <IconFileOrientation className="text-teal-700 h-7 w-7 flex-shrink-0" />

          </label>
          <button
            type="submit"
            className="bg-emerald-500 text-white py-2 px-4 rounded-3xl hover:bg-emerald-600 transition-colors"
          >
            Post
          </button>
        </form>
      </div>

      {/* Right Sidebar */}
     
        
      <CommunitySidebar />
    
    </div>
  );
};

export default CommunityPage;
