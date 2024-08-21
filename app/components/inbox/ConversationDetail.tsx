'use client';

import { useEffect, useState, useRef } from "react";
import CustomButton from "../forms/CustomButton";
import { ConversationType } from "@/app/inbox/page";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { MessageType } from "@/app/inbox/[id]/page";
import { UserType } from "@/app/inbox/page";

interface ConversationDetailProps {
    token: string;
    userId: string;
    conversation: ConversationType;
    messages: MessageType[];
}

const ConversationDetail: React.FC<ConversationDetailProps> = ({
    userId,
    token,
    messages,
    conversation
}) => {
    const messagesDiv = useRef<HTMLDivElement>(null);
    const [newMessage, setNewMessage] = useState('');
    const myUser = conversation.users?.find((user) => user.id == userId);
    const otherUser = conversation.users?.find((user) => user.id != userId);
    const [realtimeMessages, setRealtimeMessages] = useState<MessageType[]>([]);

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(`${process.env.NEXT_PUBLIC_WS_HOST}/ws/${conversation.id}/?token=${token}`, {
        share: false,
        shouldReconnect: () => true,
    });

    useEffect(() => {
        console.log("Connection state changed", readyState);
    }, [readyState]);

    useEffect(() => {
        if (lastJsonMessage && typeof lastJsonMessage === 'object' && 'name' in lastJsonMessage && 'body' in lastJsonMessage) {
            const message: MessageType = {
                id: '',
                name: lastJsonMessage.name as string,
                body: lastJsonMessage.body as string,
                sent_to: otherUser as UserType,
                created_by: myUser as UserType,
                conversationId: conversation.id,
            };

            setRealtimeMessages((realtimeMessages) => [...realtimeMessages, message]);
        }

        scrollToBottom();
    }, [lastJsonMessage]);

    const sendMessage = async () => {
        console.log('sendMessage');

        sendJsonMessage({
            event: 'chat_message',
            data: {
                body: newMessage,
                name: myUser?.name,
                sent_to_id: otherUser?.id,
                conversation_id: conversation.id,
            }
        });

        setNewMessage('');

        setTimeout(() => {
            scrollToBottom();
        }, 50);
    };

    const scrollToBottom = () => {
        if (messagesDiv.current) {
            messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
        }
    };

    return (
        <div className="flex flex-col h-[740px]">
            <div
                ref={messagesDiv}
                className="flex-1 overflow-auto flex flex-col space-y-4 p-4"
            >
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`py-3 px-16 rounded-3xl ${message.created_by.id === myUser?.id ? 'self-end bg-emerald-500' : 'self-start bg-gray-200'}`}
                    >
                        <p className="font-bold font-sans text-gray-500">{message.created_by.name}</p>
                        <p>{message.body}</p>
                    </div>
                ))}

                {realtimeMessages.map((message, index) => (
                    <div
                        key={index}
                        className={`py-3 px-16 rounded-3xl ${message.name === myUser?.name ? 'self-end bg-emerald-500' : 'self-start bg-gray-200'}`}
                    >
                        <p className="font-bold font-sans text-gray-500">{message.name}</p>
                        <p>{message.body}</p>
                    </div>
                ))}
            </div>

            <div className="p-4 bg-white border-t border-gray-300 flex items-center space-x-4">
                <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-grow p-3 bg-gray-100 rounded-3xl"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />

                <button
                    onClick={sendMessage}
                    className="p-1 px-5 text-sm font-sans font-semibold text-neutral-800 rounded-3xl">
                    Send
                </button>
            </div>
        </div>
    );
}

export default ConversationDetail;
