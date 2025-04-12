import React, { useState } from "react";
import { Link } from "react-router";
import { IoMdMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import NavbarLink from "./NavbarLink";
import SideBarLink from "./SideBarLink";

export default function Navbar() {
  const [isMenu, setIsMenu] = useState(false);

  return (
    <>
      <div className="flex justify-between w-full px-10 py-5 text-xl text-black border bg-slate-200 border-b-gray-300">
        <Link to={"/"} className="transition-all duration-300 hover:text-gray-500">
          Home
        </Link>
        <div className="hidden gap-3 sm:flex">
          <NavbarLink link={"/task"} title={"Add"} />
          <NavbarLink link={"/login"} title={"Login"} />
          <NavbarLink link={"/signup"} title={"Signup"} />

          <button className="px-2 py-1 transition-all duration-300 rounded-md hover:bg-slate-400">
            Logout
          </button>
        </div>
        <div className="flex text-3xl sm:hidden">
          <button onClick={() => setIsMenu(!isMenu)}>
            {isMenu ? <RxCross1 /> : <IoMdMenu />}
          </button>
        </div>
      </div>
      {isMenu && (
        <div className="fixed right-0 bg-gray-600 w-[50vw] h-full sm:hidden">
          <div className="flex flex-col gap-1">
            <SideBarLink link={"/task"} title={"Add"} />
            <SideBarLink link={"/login"} title={"Login"} />
            <SideBarLink link={"/signup"} title={"Signup"} />
            <SideBarLink link={"/"} title={"Logout"} />
          </div>
        </div>
      )}
    </>
  );
}
