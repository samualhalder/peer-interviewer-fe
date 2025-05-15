import VideoRoom from "@/components/VideoRoom";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;
  console.log("rmid", roomId);

  return (
    <div className="mt-80 h-screen">
      {roomId}
      <VideoRoom roomId={roomId} />
    </div>
  );
}
