import React from 'react';
import ReactPlayer from 'react-player';
import { useVideoContext } from '../Context/VideoContext';

interface VideoPlayerProps {
  videoFile: string;
  onEnded: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoFile, onEnded }) => {
  const { playing, volume, muted, playbackRate, setPlayed, setDuration } = useVideoContext();

  const handleProgress = (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => {
    setPlayed(state.played);
  };

  return (
    <ReactPlayer
      url={videoFile}
      playing={playing}
      volume={volume}
      muted={muted}
      playbackRate={playbackRate}
      onProgress={handleProgress}
      onDuration={setDuration}
      onEnded={onEnded}
      width="100%"
      height="auto"
      progressInterval={1000}
    />
  );
};

export default VideoPlayer;