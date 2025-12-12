import React from "react";
import { FaSquareXTwitter } from "react-icons/fa6";
import {
  FaFacebook,
  FaGithub,
  FaInstagramSquare,
  FaRegCopyright,
} from "react-icons/fa";
import { Title } from "./layouts/Navbar";

export default function Footer() {
  return (
    <div className="w-full bg-myprimary text-white flex flex-col md:flex-row gap-5 justify-between px-10 py-20 mt-20">
      {/* // image */}
      <div>
        <Title />
      </div>

      <div className="grid grid-cols-1  md:grid-cols-3 justify-between w-[70%] gap-4">
        <div>
          <p className=" font-semibold">Contact Us</p>
          <div className="flex gap-2 mt-5">
            <a href="https://www.facebook.com/samual1six">
              <FaFacebook size={40} />
            </a>
            <a
              href="https://x.com/samualhalder
            "
            >
              <FaSquareXTwitter size={40} />
            </a>
            <a
              href="https://www.instagram.com/samualhalder/
            "
            >
              <FaInstagramSquare size={40} />
            </a>
          </div>
        </div>
        <div>
          <p className=" font-semibold">Raise Bug</p>
          <a href="https://github.com/samualhalder/peer-interviewer-fe/issues">
            <FaGithub size={40} className="mt-5" />
          </a>
        </div>
        <div>
          <p className=" font-semibold">Copyright</p>
          <div className="flex items-center gap-2 mt-5">
            <FaRegCopyright />
            <p>
              <a
                className=" underline"
                href={"https://www.linkedin.com/in/samual-halder-464b8820a/"}
              >
                Samual Halder
              </a>
              , 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
