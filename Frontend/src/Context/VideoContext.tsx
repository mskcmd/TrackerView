import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface VideoContextProps {
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
  played: number;
  setPlayed: Dispatch<SetStateAction<number>>;
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  volume: number;
  setVolume: Dispatch<SetStateAction<number>>;
  muted: boolean;
  setMuted: Dispatch<SetStateAction<boolean>>;
  playbackRate: number;
  setPlaybackRate: Dispatch<SetStateAction<number>>;
  duration: number;
  setDuration: Dispatch<SetStateAction<number>>;
  currentTime: number;
  setCurrentTime: Dispatch<SetStateAction<number>>;
  showSettings: boolean;
  setShowSettings: Dispatch<SetStateAction<boolean>>;
}

const VideoContext = createContext<VideoContextProps | undefined>(undefined);

export const VideoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [progress, setProgress] = useState(0);
  const [played, setPlayed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <VideoContext.Provider
      value={{
        progress,
        setProgress,
        played,
        setPlayed,
        playing,
        setPlaying,
        volume,
        setVolume,
        muted,
        setMuted,
        playbackRate,
        setPlaybackRate,
        duration,
        setDuration,
        currentTime,
        setCurrentTime,
        showSettings,
        setShowSettings,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error("useVideoContext must be used within a VideoProvider");
  }
  return context;
};

export default VideoContext;
