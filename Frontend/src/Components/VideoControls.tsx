import React from 'react';
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp, FaCog, FaExpand, FaStepBackward, FaStepForward } from 'react-icons/fa';
import { useVideoContext } from '../Context/VideoContext';

interface VideoControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  onFullscreen: () => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({ onPrevious, onNext, onFullscreen }) => {
  const { playing, muted, played, setPlaying, setMuted, setShowSettings, setPlayed } = useVideoContext();

  const handlePlayPause = () => setPlaying(!playing);
  const handleToggleMute = () => setMuted(!muted);
  const toggleSettings = () => setShowSettings(prev => !prev);

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPlayed = parseFloat(e.target.value);
    if (newPlayed <= played) {
      setPlayed(newPlayed);
    }
  };

  return (
    <div className="bg-[#122c34] p-2 h-14">
      <div className="flex items-center ms-5">
        <button
          onClick={handlePlayPause}
          className="text-2xl lg:text-3xl text-white transition-transform duration-200 ease-in-out transform hover:scale-110"
        >
          {playing ? <FaPause /> : <FaPlay />}
        </button>
        <div className="w-full mx-4">
          <input
            type="range"
            min={0}
            max={1}
            step="0.01"
            value={played}
            onChange={handleSeekChange}
            className="slider-progress w-full"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                played * 100
              }%, #e5e7eb ${played * 100}%, #e5e7eb 100%)`,
            }}
          />
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button
                onClick={onPrevious}
                className="text-xl text-white"
              >
                <FaStepBackward />
              </button>
              <button
                onClick={onNext}
                className="text-xl text-white"
                disabled={played < 0.99}
              >
                <FaStepForward />
              </button>
              <button
                onClick={handleToggleMute}
                className="text-xl text-white"
              >
                {muted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 ml-auto">
          <button
            onClick={toggleSettings}
            className="text-xl text-white"
          >
            <FaCog />
          </button>
          <button
            onClick={onFullscreen}
            className="text-xl text-white"
          >
            <FaExpand />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;