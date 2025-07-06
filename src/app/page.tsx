import HomeIntro from "@/components/HomeIntro";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function Home() {
  return (
    <div>
      <HomeBackGround>
        <HomeIntro />
        <HomeCard />
      </HomeBackGround>
    </div>
  );
}

function HomeCard() {
  return (
    <div className="px-8 py-16 rounded-lg text-white grid grid-cols-2 bg-gradient-to-r from-myprimary via-blue-500 to-mysecondary gap-5">
      <div className="col-span-1 flex items-center justify-center">
        <p className="text-lg">
          Preparing for your first interview can be challenging. That's why
          participating in mock interviews is highly recommended. Practicing
          with peers who understand the interview process can provide valuable
          insights and help simulate real interview conditions. Connect with
          like-minded individuals and refine your skills—find your interview
          partners here.
        </p>
      </div>
      <div className="col-span-1 ">
        <div className="rounded-lg overflow-hidden">
          <img src="/images/int-img-1.webp" alt="img" />
        </div>
      </div>
    </div>
  );
}

type BubbleConfig = {
  size: string;
  color: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

function HomeBackGround({ children }: { children: ReactNode }) {
  const bubbolPositions: BubbleConfig[] = [
    // Top-left quadrant
    { size: "60", color: "blue-400", top: "8", left: "6" },
    { size: "440", color: "blue-200", top: "1", left: "1" },

    // Top-center
    { size: "360", color: "blue-300", top: "2", left: "1/2" },

    // Top-right quadrant
    { size: "408", color: "blue-500", top: "10", right: "6" },
    { size: "30", color: "blue-600", top: "16", right: "1" },

    // Right-center
    { size: "40", color: "blue-700", top: "1/2", right: "3" },

    // Bottom-right quadrant
    { size: "100", color: "blue-400", bottom: "8", right: "6" },
    { size: "28", color: "blue-300", bottom: "4", right: "2" },

    // Bottom-center
    { size: "50", color: "blue-500", bottom: "2", left: "1/2" },

    // Bottom-left quadrant
    { size: "34", color: "blue-600", bottom: "10", left: "6" },
    { size: "30", color: "blue-700", bottom: "4", left: "2" },

    // Left-center
    { size: "42", color: "blue-800", top: "1/2", left: "3" },
  ];
  return (
    <div className="relative p-40 flex flex-col items-center justify-center gap-20">
      {bubbolPositions.map((bubble, index) => {
        const positionClasses = [
          bubble.top && `top-${bubble.top}`,
          bubble.bottom && `bottom-${bubble.bottom}`,
          bubble.left && `left-${bubble.left}`,
          bubble.right && `right-${bubble.right}`,
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <Bubblos
            key={index}
            size={bubble.size}
            color={bubble.color}
            className={`absolute ${positionClasses}`}
          />
        );
      })}
      {children}
    </div>
  );
}

function Bubblos({
  size,
  color,
  className,
}: {
  size: string;
  color: string;
  className?: string;
}) {
  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className={cn(`bg-${color} rounded-full`, className)}
    ></div>
  );
}
