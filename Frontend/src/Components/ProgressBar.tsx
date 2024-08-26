import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ProgressBarProps {
  calculateOverallProgress: () => number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ calculateOverallProgress }) => {
  const progress = calculateOverallProgress();


  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 lg:w-20 lg:h-20 me-4 lg:me-16 mt-4 lg:mt-5 items-center">
        <CircularProgressbar
          value={progress}
          text={`${progress}%`}
          styles={buildStyles({
            textSize: "25px",
            pathColor: "#00bbdc",
            textColor: "#000000",
            trailColor: "#6ae3e6",
            strokeLinecap: "butt",
            pathTransitionDuration: 0.5,
          })}
        />
      </div>
      <p className="me-16 whitespace-nowrap">
  {progress < 28 ? (
    <>1</>
  ) : progress < 48 ? (
    <>2</>
  ) : (
    <>3</>
  )} 
  /8 completed
</p>

    </div>
  );
};

export default ProgressBar;