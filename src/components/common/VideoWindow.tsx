import React from "react";
import ReactPlayer from "react-player";
import Loader from "../ui/Loader";

export default function VideoWindow({
  name,
  stream,
  audio,
  video,
  height = 200,
  width = 300,
}: {
  name?: string;
  stream?: MediaStream | null;
  audio: boolean;
  video: boolean;
  height?: number;
  width?: number;
}) {
  return (
    <div
      className="relative border-2 border-white rounded-md overflow-hidden flex items-center justify-center z-30"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {video && stream ? (
        <ReactPlayer
          url={stream}
          playing={true}
          height={`${height}px`}
          width={`${width}px`}
          muted={!audio}
        />
      ) : (
        <div
          className="flex justify-center items-center"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <Loader color="#025AE0" />
        </div>
      )}
      <div className="absolute bottom-1 left-1 bg-mysecondary text-white px-2 py-1 opacity-70 rounded-lg text-sm">
        {name}
      </div>
    </div>
  );
}
