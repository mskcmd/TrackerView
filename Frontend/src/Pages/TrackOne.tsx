import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useVideoContext } from '../Context/VideoContext';
import VideoPlayer from '../Components/VideoPlayer';
import VideoControls from '../Components/VideoControls';
import ProgressBar from '../Components/ProgressBar';
import { fetchHeading, getModuleOne } from "../App/ApiSlice";
import image from "../../public/right.png";
import image1 from "../../public/moduleone.png";
import image2 from "../../public/moduetow.png";
import ReactPlayer from "react-player";

interface VideoData {
  _id: string;
  name: string;
  videoNumber: number;
  videoFile: string;
  heading: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const TrackOne: React.FC = () => {
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [head, setHead] = useState<any>("");
  const navigate = useNavigate();
  const playerRef = useRef<ReactPlayer>(null);
  const { played, setPlayed, setPlaying } = useVideoContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await getModuleOne();
        setVideoData(response.data);
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchHeadingData = async (videoNumber: number) => {
      try {
        const response: any = await fetchHeading(videoNumber);
        if (response) {
          setHead(response);
        }
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    if (videoData?.videoNumber) {
      fetchHeadingData(videoData.videoNumber);
    }
  }, [videoData]);

  useEffect(() => {
    const savedProgress = localStorage.getItem("videoProgress");
    if (savedProgress) {
      setPlayed(parseFloat(savedProgress));
    }
  }, []);

  const calculateOverallProgress = () => {
    if (!videoData) return 0;
    const trackProgress = played * 100;
    let overallProgress: number;
    if (videoData.videoNumber === 1) {
      overallProgress = (trackProgress / 100) * 26 + 2;
    } else if (videoData.videoNumber === 2) {
      overallProgress = (trackProgress / 100) * 18 + 28;
    } else if (videoData.videoNumber === 3) {
      overallProgress = (trackProgress / 100) * 54 + 46;
    } else {
      overallProgress = 0;
    }
    return Math.min(Math.round(overallProgress), 100);
  };

  const handleEnded = () => {
    localStorage.removeItem("videoProgress");
    setPlaying(false);
  };

  const handleNext = () => {
    if (played >= 0.99) {
      navigate("/Tracktwo");
    }
  };

  const handlePrevious = () => {
    if (videoData && videoData.videoNumber > 1) {
      navigate(`/Track${videoData.videoNumber - 1}`);
    }
  };

  const handleFullscreen = () => {
    if (playerRef.current) {
      const player = playerRef.current.getInternalPlayer() as HTMLVideoElement;
      if (player.requestFullscreen) {
        player.requestFullscreen();
      }
    }
  };

  if (!videoData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen flex flex-col work-sans-bold overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="h-full">
          <div className="lg:ps-16 ps-5">
            <h2 className="text-black text-xl lg:text-2xl font-medium mt-10 lg:mt-20 mb-6 lg:mb-10">
              {videoData.heading}
            </h2>
            <div
              className="text-black text-xs lg:text-xl work-sans-regular font-medium"
              dangerouslySetInnerHTML={{ __html: videoData.description }}
            />
          </div>
        </div>
        <div className="w-full order-2 relative">
          <div className="w-full flex justify-end">
            <ProgressBar calculateOverallProgress={calculateOverallProgress} />
          </div>
          <div className="lg:rounded-lg w-full lg:w-[80%] mt-1 lg:ms-10 ms-1 mx-auto">
            <VideoPlayer videoFile={videoData.videoFile} onEnded={handleEnded} />
            <VideoControls onPrevious={handlePrevious} onNext={handleNext} onFullscreen={handleFullscreen} />
            <div className="400 w-full flex justify-end mt-2">
              <p className="me-3 mt-2">{head?.data}</p>
              <button
                onClick={handleNext}
                disabled={played < 0.99}
                className={`${
                  played < 0.99 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <img src={image} alt="Next" className="w-10 h-10" />
              </button>
            </div>
          </div>
        </div>
        <div className="hidden lg:block absolute bottom-0 left-0">
          <img src={image1} className="w-72" alt="Module One" />
        </div>
        <div className="hidden lg:block absolute bottom-0 right-0">
          <img src={image2} className="w-40" alt="Module Two" />
        </div>
      </div>
    </div>
  );
};

export default TrackOne;