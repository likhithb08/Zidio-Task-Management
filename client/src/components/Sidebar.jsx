import React from "react";
import PropTypes from "prop-types";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";
import clsx from "clsx";

const linkData = [
  { label: "Dashboard", link: "dashboard", icon: <MdDashboard /> },
  { label: "Tasks", link: "tasks", icon: <FaTasks /> },
  { label: "Completed", link: "completed/completed", icon: <MdTaskAlt /> },
  { label: "In Progress", link: "in-progress/in progress", icon: <MdOutlinePendingActions /> },
  { label: "To Do", link: "todo/todo", icon: <MdOutlinePendingActions /> },
  { label: "Team", link: "team", icon: <FaUsers /> },
  { label: "Trash", link: "trashed", icon: <FaTrashAlt /> },
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => (
    <Link
      to={`/${el.link}`}
      onClick={closeSidebar}
      className={clsx(
        "flex items-center gap-3 p-5 rounded-md text-sm font-medium transition-all duration-200 border-l-4",
        path === el.link.split("/")[0]
          ? "bg-blue-100 text-blue-600 border-blue-600"
          : "text-gray-700 hover:bg-gray-100 border-transparent"
      )}
    >
      <span className="text-xl">{el.icon}</span>
      <span>{el.label}</span>
    </Link>
  );

  NavLink.propTypes = {
    el: PropTypes.shape({
      label: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
    }).isRequired,
  };

  return (
    <div className="h-screen w-full flex flex-col justify-between bg-white shadow-md p-2">
      {/* Header */}
      <div>
        <h1 className="flex items-center gap-3 mb-6">
          <span className="bg-blue-200 p-2 rounded">
            <MdOutlineAddTask className="text-3xl text-blue-700" />
          </span>
          <span className="text-2xl font-bold text-blue-700">Zidio Task Management</span>
        </h1>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 space-y-1 p-0.5 rounded-full">
          {sidebarLinks.map((link) => (
            <NavLink el={link} key={link.label} />
          ))}
        </nav>
      </div>

      {/* Settings */}
      <div>
        <button className="flex items-center gap-3 p-2 w-full bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-all">
          <MdSettings className="text-xl" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
