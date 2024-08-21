'use client';

import { useRouter } from "next/navigation";
import { ConversationType } from "@/app/inbox/page";

interface ConversationProps {
    conversation: ConversationType;
    userId: string;
}

const Conversation: React.FC<ConversationProps> = ({
    conversation,
    userId
}) => {
    const router = useRouter();
    const otherUser = conversation.users.find((user) => user.id != userId)

    return (
        <div className="px-6 py-4 cursor-pointer bg-gradient-to-tr from-gray-200 via-gray-200/70 to-transparent shadow-lg rounded-3xl">
            <p className="mb-6 text-xl">{otherUser?.name}</p>

            <p 
                onClick={() => router.push(`/inbox/${conversation.id}`)}
                className="text-emerald-500"
            >
                Go to conversation
            </p>
        </div>
    )
}

export default Conversation;