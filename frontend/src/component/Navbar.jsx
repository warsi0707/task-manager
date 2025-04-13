import React, { useCallback, useContext, useRef, useState } from "react";
import { Link } from "react-router";
import { IoMdMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import NavbarLink from "./NavbarLink";
import SideBarLink from "./SideBarLink";
import AddTaskInput from "./AddTaskInput";
import toast from "react-hot-toast";
import { BackendUrl } from "../utils/BackendUrl";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const [isMenu, setIsMenu] = useState(false);
  const [addModel, setAddModel] = useState(false);
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const titleRef = useRef()
  const contentRef = useRef()

  const AddTask =async()=>{
    const title= titleRef.current.value;
    const content = contentRef.current.value;
    try{
      const response = await fetch(`${BackendUrl}/task`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, content})
      })
      const result = await response.json()
      if(response.ok){
        setAddModel(false)
        toast.success(result.message)
      }else{
        toast.error(result.mesage)
      }
    }catch(error){
      toast.error(error.message)
    }
  }
  const Logout =useCallback( async () => {
    try {
      const response = await fetch(`${BackendUrl}/user/logout`, {
        method: "POST",
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        setAuthenticated(false);
        toast.success(result.message);
      } else {
        toast.error(result.mesage);
      }
    } catch (error) {
      toast.error(error.mesage);
    }
  },[])

  return (
    <>
      <div className="fixed top-0 flex justify-between w-full px-10 text-xl text-white border-b border-gray-500 py-7 bg-black/80 backdrop-blur-md">
        <Link
          to={"/"}
          className="transition-all duration-300 hover:text-gray-500"
        >
          Home
        </Link>
        <div className="hidden gap-3 sm:flex">
          {authenticated ? (
            <>
              <button
                className="mb-2 transition-all duration-300 hover:text-gray-500"
                onClick={() => setAddModel(!addModel)}
              >
                Add
              </button>
              <button
                onClick={Logout}
                className="mb-2 transition-all duration-300 hover:text-gray-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavbarLink link={"/login"} title={"Login"} />
              <NavbarLink link={"/signup"} title={"Signup"} />
            </>
          )}
        </div>
        <div className="flex text-3xl sm:hidden">
          <button onClick={() => setIsMenu(!isMenu)}>
            {isMenu ? <RxCross1 /> : <IoMdMenu />}
          </button>
        </div>
      </div>
      {/* ---Sidebar--- */}
      {isMenu && (
        <div className="fixed top-20 right-0 bg-black/80 backdrop-blur-md text-white w-[50vw] h-full sm:hidden ">
          <div className="flex flex-col gap-1">
            <SideBarLink link={"/task"} title={"Add"} />
            <SideBarLink link={"/login"} title={"Login"} />
            <SideBarLink link={"/signup"} title={"Signup"} />
            <SideBarLink link={"/"} title={"Logout"} />
          </div>
        </div>
      )}
      {/* ---Add Task Model --- */}
      {addModel && (
        <>
          <div className="fixed top-0 left-0 flex justify-center w-screen h-screen opacity-90 bg-slate-900 backdrop-blur-md"></div>
          <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen mx-auto">
            <div className="p-6 bg-white w-96 h-96">
              <div className="flex justify-end">
                <button
                  onClick={() => setAddModel(!addModel)}
                  className="items-end"
                >
                  <RxCross1 />
                </button>
              </div>
              <div className="flex flex-col gap-5">
                <h1 className="text-3xl text-center">Add Your Task</h1>
                <div className="flex flex-col gap-5">
                  <AddTaskInput refs={titleRef} label={"Title"} placeholder={"Title"} />
                  <AddTaskInput
                  refs={contentRef}
                    label={"Content"}
                    placeholder={"Your content..."}
                  />
                  <button onClick={AddTask} className="w-full p-3 text-white transition-all duration-300 bg-blue-400 hover:bg-blue-500">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
