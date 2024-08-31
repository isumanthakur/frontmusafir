"use client";
import React, { useState } from "react";

interface User {
  id: string;
  name: string;
  avatar_url: string;
  bio?: string;
  location?: string;
  jobTitle?: string;
}

interface LeftSideProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  showProfileForm: boolean;
  setShowProfileForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const LeftSide: React.FC<LeftSideProps> = ({
  user,
  setUser,
  showProfileForm,
  setShowProfileForm,
}) => {
  const [friends, setFriends] = useState<string[]>([]);
  const [requests, setRequests] = useState<string[]>([
    "testuser1",
    "testuse2 ",
    "test user11",
  ]);

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

  const acceptRequest = (name: string) => {
    setFriends([...friends, name]);
    setRequests(requests.filter((req) => req !== name));
  };

  return (
    <div className="w-1/4 bg-white p-4 px-8 hidden md:block rounded shadow-md">
      <div className="profile mb-8 text-center">
      <img
  src={user?.avatar_url || "/default-avatar.png"}
  alt=""
  className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-gray-300 object-cover"
/>

        <h3 className="text-xl font-semibold text-gray-900">{user?.name}</h3>
        {user?.bio && <p className="text-gray-600 rounded-3xl">{user.bio}</p>}
        {user?.location && <p className="text-gray-600">{user.location}</p>}
      </div>

      {showProfileForm && (
        <form onSubmit={handleProfileSubmit} className="mb-8">
          <h3 className="text-xl font-bold mb-4 rounded-3xl font-sans text-gray-900">
            Complete your profile
          </h3>
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
            className="w-full bg-teal-400 font-sans text-white py-2 px-4 rounded-3xl hover:bg-teal-600 transition-colors"
          >
            Complete Profile
          </button>
        </form>
      )}

      <div className="friend-requests mb-8">
        <h4 className="text-lg font-bold mb-2 font-sans text-gray-900">
          Send Friend Requests
        </h4>
        {requests.map((req) => (
          <div
            key={req}
            className="mb-2 flex justify-between font-sans font-semibold items-center"
          >
            <span>{req}</span>
            <button
              onClick={() => acceptRequest(req)}
              className="bg-teal-400 text-white py-1 px-2 rounded-3xl hover:bg-teal-400 transition-colors"
            >
              request
            </button>
          </div>
        ))}
      </div>

      <div className="friends-list">
        <h4 className="text-lg font-bold font-sans mb-2 text-gray-900">Pending</h4>
        {friends.length > 0 ? (
          friends.map((friend, idx) => (
            <div
              className="p-2 my-2 font-sans font-semibold text-center bg-teal-400 rounded-3xl"
              key={idx}
            >
              {friend}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No friends yet</p>
        )}
      </div>
    </div>
  );
};

export default LeftSide;
