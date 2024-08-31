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

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const videoElement = document.getElementById("story-video");
    if (videoElement && !videoElement.contains(event.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="relative w-3/4 h-3/4">
        <video
          id="story-video"
          src={videoUrl}
          autoPlay
          className="w-full h-full rounded"
        />
      </div>
    </div>
  );
};

export default StoryModal;
