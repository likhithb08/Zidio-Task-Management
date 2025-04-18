import React from "react";
import { MdOutlineSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../redux/slices/authSlice";
import UserAvatar from "./UserAvatar";
import NotificationPanel from "./NotificationPanel";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="flex justify-between items-center bg-white  sticky z-10 top-0 ">
      {/* Left Side: Menu Button + Search */}
      <div className="flex gap-4">
        <button
          onClick={() => dispatch(setOpenSidebar(true))}
          className=" text-grey-500 block md:hidden "
          aria-label="Open Sidebar"
        >
          ☰
        </button>

        {/* Search Bar */}
        <div className="w-64 2xl:w-[400px] flex items-center gap-2 border border-gray-400 rounded-lg p-2 shadow-md bg-white">
          <MdOutlineSearch className="text-gray-600 text-xl" />
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 outline-none bg-transparent text-black placeholder:text-gray-400 "
          />
        </div>
      </div>

      {/* Right Side: Notifications & User Avatar */}
      <div className="flex gap-4 items-center bg-white  p-0.5">
        <div className="relative flex items-center justify-center rounded-full p-2">
          {/* Notification Panel with Glow Effect */}
          <div className="p-2 bg-white border-gray-300 flex items-center justify-center ">
            <NotificationPanel />
          </div>
        </div>

        <div className="relative flex items-center justify-center rounded-full p-2 bg-blue-400"> 
          <UserAvatar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
