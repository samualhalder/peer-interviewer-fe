import React from "react";
import ReactPlayer from "react-player";
import Loader from "../ui/Loader";

export default function VideoWindow({
  name,
  stream,
  audio,
  video,
}: {
  name?: string;
  stream?: MediaStream | null;
  audio: boolean;
  video: boolean;
}) {
  return (
    <div className="relative w-[300px] h-[200px] border-2 border-white rounded-md overflow-hidden flex items-center justify-center z-30">
      {video && stream ? (
        <ReactPlayer
          url={stream}
          playing={true}
          height="400px"
          width="300px"
          muted={!audio}
        />
      ) : (
        <div className="w-[300px] h-[400px] flex justify-center items-center">
          <Loader color="#025AE0" />
        </div>
      )}
      <div className=" absolute bottom-1 left-1 bg-mysecondary text-white px-2 py-1 opacity-70 rounded-lg text-sm">
        {name}
      </div>
    </div>
  );
}
