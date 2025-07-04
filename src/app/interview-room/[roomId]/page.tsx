import VideoRoom from "@/components/VideoRoom";
import React from "react";

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
    <div className="h-screen w-full overflow-y-hidden">
      <VideoRoom roomId={roomId} peerId={peerId as string} />
    </div>
  );
}
