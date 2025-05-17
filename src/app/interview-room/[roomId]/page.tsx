import VideoRoom from "@/components/VideoRoom";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;

  return (
    <div className="">
      <VideoRoom roomId={roomId} />
    </div>
  );
}
