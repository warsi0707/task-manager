import React, { memo } from "react";
import { FaTrashCanArrowUp } from "react-icons/fa6";
import { IoCheckmarkDone } from "react-icons/io5";

 function Card({title, content, ondelete, done,onMarkAsdone}) {
  return (
    <div className={`${done === false &&'bg-green-500'} ${done == true && 'bg-yellow-200'} p-5  rounded-md w-60 min-h-60`}>
      <p className="flex justify-end gap-5 text-xl">
        <button onClick={onMarkAsdone}>
          <IoCheckmarkDone />
        </button>
        <button onClick={ondelete}>
          <FaTrashCanArrowUp />
        </button>
      </p>
      <div className="flex flex-col justify-between gap-8">
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-3xl">{title}</h1>
          <p className="text-center">
            {content}
          </p>
        </div>
        <div className="flex justify-between">
          {/* <p>Date: {cretedAt }</p> */}
        </div>
      </div>
    </div>
  );
}
export default memo(Card)