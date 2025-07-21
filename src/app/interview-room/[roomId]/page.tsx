import VideoRoom from "@/components/VideoRoom";
import React from "react";

export const metadata = {
  title: "Interviewe",
  description: "Give interview among peers",
};

export default function Page({
  params,
  searchParams,
}: {
  params: { roomId: string };
  searchParams: { peerId?: string };
}) {
  const { roomId } = params;
  const peerId = searchParams.peerId ?? null;

  return (
    <div className="h-screen w-screen overflow-y-hidden flex justify-center items-center ">
      <VideoRoom roomId={roomId} peerId={peerId as string} />
    </div>
  );
}
