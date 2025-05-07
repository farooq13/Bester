import React from "react";
import { useState } from "react";
import SideBar from "./SideBar";
import {
  PlusIcon,
  MicrophoneIcon,
  ArrowUpTrayIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  ShareIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import Upload from "./Upload";

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-screen container mx-auto relative flex flex-col">
      {/* Left section */}
      <div className="hidden md:block fixed top-0 right-0 left-0 bottom-0  dark:bg-gray-800  min-w-[400px] shadow-lg">
        {/* Left section header */}
        <header className="relative flex justify-end items-center px-3 max-w-[440px] h-12 bg-slate-100 pr-12">
          <button onClick={() => setIsOpen(!isOpen)} className="">
            {isOpen ? (
              <ChevronDoubleLeftIcon className="h-6 w-6" />
            ) : (
              <div className="fixed top-0 left-0 right-[10px] max-w-[430px]">
                <ChevronDoubleRightIcon className="z-30 absolute top-3 right-[1px]  h-6 w-6" />
                <SideBar />
              </div>
            )}
          </button>
        </header>
        {/* Chat container */}
        <div className="container">
          {/* User messages */}
          <div className="block ml-12 rounded-md  mt-4 p-2 bg-slate-100 w-fit max-w-[350px] h-fit  items-end ">
            <div>
              <p className="text-left text-gray-900">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                sit, odio eos velit placeat eum
              </p>
            </div>
          </div>
          {/* User messages end */}
          {/* Bot messages */}
          <div>
            <div className="block mr-12 rounded-sm  mt-4 p-2  max-w-2/6 items-end w-fit max-w-[350px] h-fit">
              <div className="">
                <p className="text-left text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                  sit, odio eos velit placeat eum quo aut vitae modi amet ad
                  libero facere veritatis alias similique soluta necessitatibus
                  numquam? Accusantium!
                </p>
              </div>
            </div>
          </div>
          {/* Bot messages end */}
        </div>
        {/* Chat container end */}

        {/*  input box container wrapper  */}
        <div className="">
          {/* input box container */}
          <div className="border-neutral-600 mt-36 bg-neutral-600 p-6 rounded-lg ">
            <form action="" method="">
              <input
                placeholder="Ask anything"
                class="resize-none rounded-md w-full p-4 outline-none"
              />
            </form>
            {/* Icons */}
            <div className=" relative flex space-x-4 text-white">
              <PlusIcon className="mt-2 h-6 w-6 border rounded-full hover:cursor-pointer" />
              <div className="hidden absolute font-bold bottom-8 left-[-28px] rounded-sm bg-gray-800 text-white px-4 py-1">
                Upload
              </div>
            </div>
            {/* Icons end */}
          </div>
          {/* input box container end */}
        </div>
      </div>
      {/* Left section end */}
      <div className="relative md:fixed md:left-[420px] md:right-0 w-screen h-screen bg-neutral-100 px-4">
        <div calssName="flex flex-col items-center justify-center h-screen">
          <div className="flex flex-col justify-end  mt-20 max-w-4xl">
          <h2 className="text-center text-orange-700 font-bold  text-4xl md:text-5xl">
            Welcome to Bester Quiz!
            <Upload />
          </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
