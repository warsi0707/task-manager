import React from "react";
import { FaTrashCanArrowUp } from "react-icons/fa6";
import { IoCheckmarkDone } from "react-icons/io5";
export default function Card() {
  return (
    <div className="p-5 bg-yellow-200 rounded-md w-60 min-h-60">
      <p className="flex justify-end gap-5 text-xl">
        <button>
          <IoCheckmarkDone />
        </button>
        <button>
          <FaTrashCanArrowUp />
        </button>
      </p>
      <div className="flex flex-col justify-between gap-8">
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-3xl">Title</h1>
          <p className="text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus,
            magnam!
          </p>
        </div>
        <div className="flex justify-between">
          <p>Date: 12/12/2025</p>
        </div>
      </div>
    </div>
  );
}
