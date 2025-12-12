import React from "react";

function About() {
  return (
    <div className="w-full h-full flex items-center justify-center mt-60">
      <div className="w-full mx-40 border-mysecondary border-[1.5px] shadow-xl rounded-md px-20 py-10">
        <div className="w-full flex flex-col gap-4">
          <p className="text-5xl w-full flex  justify-center">
            Why a Mock Interview?
          </p>
          <p className="text-gray-500">
            Mock interviews help you practice answering questions confidently
            and reduce anxiety. They highlight your strengths and reveal areas
            that need improvement. You get real-time feedback to fine-tune your
            communication and problem-solving skills. Overall, they prepare you
            to perform better in actual interviews.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
