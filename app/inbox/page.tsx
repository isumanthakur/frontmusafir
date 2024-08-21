import { getUserId } from "../lib/actions";
import apiService from "../services/apiService";
import React from 'react';
import Conversation from "../components/inbox/Conversation";
import BackButton from "../components/BackButton"; // Import the BackButton component

export type UserType = {
    id: string;
    name: string;
    avatar_url: string;
}

export type ConversationType = {
    id: string;
    users: UserType[];
}

const InboxPage = async () => {
    const userId = await getUserId();

    if (!userId) {
        return (
            <main className="max-w-[1500px] mx-auto px-6 py-12">
                <p>You need to be authenticated...</p>
            </main>
        )
    }

    const conversations = await apiService.get('/api/chat/')

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
            {/* Use the BackButton component here */}
            <BackButton />

            <div className="flex flex-row justify-between">
                <div>
                    <h1 className="mb-3 mt-10 font-sans font-semibold text-4xl">Conversations</h1>
                    <div className="flex flex-row">
                        <button className="border border-emerald-500 text-xs px-1 rounded-md font-sans font-semibold text-emerald-500">Encrypted</button>
                        <p className="text-xs font-sans px-5"></p>
                    </div>
                </div>
                <div className="flex items-center justify-center h-full">
                </div>
            </div>
            <hr className="my-10" />

            {conversations.map((conversation: ConversationType) => {
                return (
                    <Conversation 
                        userId={userId}
                        key={conversation.id}
                        conversation={conversation}
                    />
                )
            })}
        </main>
    )
}

export default InboxPage;
