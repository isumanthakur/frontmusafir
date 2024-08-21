import React, { useEffect } from "react";

interface StoryModalProps {
  videoUrl: string;
  onClose: () => void;
}

const StoryModal: React.FC<StoryModalProps> = ({ videoUrl, onClose }) => {
  useEffect(() => {
    const videoElement = document.getElementById("story-video") as HTMLVideoElement;
    videoElement.onended = onClose;

    return () => {
      videoElement.onended = null;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative w-3/4 h-3/4">
        <video
          id="story-video"
          src={videoUrl}
          autoPlay
          className="w-full h-full rounded"
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default StoryModal;
