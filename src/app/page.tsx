import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Montserrat } from "next/font/google";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const montserratFont = Montserrat({
  subsets: ["latin"],
  weight: "400",
});
export const metadata = {
  title: "Peer Interviewer",
  description: "Give interview among peers",
};

export default function Home() {
  return (
    <div className="">
      <HomeBackGround>
        <HomeIntro />
        <HomeCard />
      </HomeBackGround>
    </div>
  );
}

function HomeIntro() {
  return (
    <div className="">
      <div>
        <h1
          className={`text-white text-8xl font-semibold ${montserratFont.className}`}
        >
          Peer Interviewer
        </h1>
        <p className="text-white text-xl">
          find peers <MdKeyboardDoubleArrowRight className="inline" />
          send request <MdKeyboardDoubleArrowRight className="inline" />
          give interview
        </p>
      </div>
    </div>
  );
}

function HomeCard() {
  return (
    <div className="px-4 py-4 rounded-lg text-white grid grid-cols-2 bg-mysecondary shadow-xl gap-5">
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

function HomeBackGround({ children }: { children: ReactNode }) {
  return (
    <div className="relative p-40 flex flex-col items-center justify-center gap-5 overflow-x-clip">
      <Bubblos />
      {children}
    </div>
  );
}

function Bubblos() {
  return (
    <div className="absolute -z-10">
      <div
        style={{
          width: "1400px",
          height: "1300px",
          clipPath: "inset(230px 0px 0px 0px)", // trims 100px from the top
        }}
        className="rounded-full bg-myprimary shadow-[0_0_60px_rgba(0,0,0,0.2)] ring-8 ring-[#a2d2ff]/40 "
      ></div>
    </div>
  );
}
