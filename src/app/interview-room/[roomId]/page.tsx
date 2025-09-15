import VideoRoom from "@/components/VideoRoom";
import React from "react";

export const metadata = {
  title: "Interviewe",
  description: "Give interview among peers",
};

// ❌ Don't declare your own PageProps
// ✅ Let Next.js handle it
export default function Page({ params, searchParams }: any) {
  const { roomId } = params;
  const peerId = searchParams?.peerId ?? "";

  return (
    <div className="h-screen w-screen overflow-y-hidden flex justify-center items-center">
      <VideoRoom roomId={roomId} peerId={peerId} />
    </div>
  );
}
