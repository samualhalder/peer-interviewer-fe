import React from "react";

interface LoaderProps {
  size?: string; // Tailwind size class (e.g., "w-12 h-12")
  color?: string; // Tailwind color class (e.g., "border-blue-500")
}

const Loader: React.FC<LoaderProps> = ({
  size = "w-12 h-12",
  color = "border-blue-500",
}) => {
  return (
    <div className={`flex justify-center items-center`}>
      <div
        className={` ${size} border-4 border-t-transparent ${color} rounded-full animate-spin`}
      />
    </div>
  );
};

export default Loader;
