import  { type FC } from "react";

interface ProgressBarProps {
  progress: number; // value 0-100
  height?: number; // optional height in px
  color?: string; // optional color
  bgColor?: string; // optional background color
}

const ProgressBar: FC<ProgressBarProps> = ({
  progress,
  height = 8,
  color = "#4ADE80", // green-400 tailwind
  bgColor = "#E5E7EB", // gray-200 tailwind
}) => {
  return (
    <div
      className="w-full rounded-full overflow-hidden"
      style={{ backgroundColor: bgColor, height }}
    >
      <div
        className="h-full rounded-full transition-all duration-300"
        style={{ width: `${Math.min(Math.max(progress, 0), 100)}%`, backgroundColor: color }}
      />
    </div>
  );
};

export default ProgressBar;
