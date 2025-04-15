import React from 'react';

export default function SideBar() {
  return (
    <div className="fixed top-0 right-[650px] max-w-[400px] min-w-[370px] left-0 bottom-0">
      <div className="absolute z-20 left-0 top-0 bottom-0 right-[100px] h-screen bg-neutral-100 border-r-2  shadow-gray-800 shadow-lg">
        <p>side bar is opened</p>
      </div>
    </div>
  )
}