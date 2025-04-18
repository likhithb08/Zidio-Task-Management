import clsx from "clsx";
import React, { useState } from "react";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { BGS, PRIORITY_STYLES, TASK_TYPE, formatDate } from "../utils";
import TaskDialog from "./task/TaskDialog";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import UserInfo from "./UserInfo";
import { IoMdAdd } from "react-icons/io";
import AddSubTask from "./task/AddSubTask";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const TaskCard = ({ task }) => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Task Card with Neon Glow */}
      <div className="relative w-full h-fit  shadow-lg text-gray-600 p-5 rounded-xl border transition-all overflow-hidden group hover:scale-[1.02] hover:shadow-cyan-400/70">
        {/* Animated Glow Border (On Hover) */}
        <div className="absolute inset-0 border-2 border-transparent rounded-xl group-hover:border-cyan-500 animate-pulse"></div>

        {/* Priority & Task Edit */}
        <div className="w-full flex justify-between">
          <div className={clsx("flex flex-1 gap-1 items-center text-sm font-medium", PRIORITY_STYLES[task?.priority])}>
            <span className="text-lg">{ICONS[task?.priority]}</span>
            <span className="uppercase">{task?.priority} Priority</span>
          </div>
          {user?.isAdmin && <TaskDialog task={task} />}
        </div>

        {/* Task Title & Stage */}
        <div className="mt-3">
          <label className=" font-semibold uppercase tracking-wide hover:text-cyan-400 transition-all mb-1 block text-gray-600">
            Task Title
          </label>
          <div className="flex items-center gap-2">
            <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])} />
            <h4 className="line-clamp-1 text-white font-semibold text-lg">{task?.title}</h4>
          </div>
        </div>
        <span className="text-sm text-gray-400">{formatDate(new Date(task?.date))}</span>

        <div className="w-full border-t  my-3" />

        {/* Task Details */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3 text-gray-500">
            <div className="flex gap-1 items-center text-sm">
              <BiMessageAltDetail />
              <span>{task?.activities?.length}</span>
            </div>
            <div className="flex gap-1 items-center text-sm">
              <MdAttachFile />
              <span>{task?.assets?.length}</span>
            </div>
            <div className="flex gap-1 items-center text-sm">
              <FaList />
              <span>0/{task?.subTasks?.length}</span>
            </div>
          </div>

          {/* Team Avatars */}
          <div className="flex flex-row-reverse">
            {task?.team?.map((m, index) => (
              <div
                key={index}
                className={clsx(
                  "w-8 h-8 rounded-full text-black flex items-center justify-center text-sm -mr-1 border  shadow-md shadow-cyan-400/50 transition-transform hover:scale-110",
                  BGS[index % BGS?.length]
                )}
              >
                <UserInfo user={m} />
              </div>
            ))}
          </div>
        </div>

        {/* Subtasks Section */}
        {task?.subTasks?.length > 0 ? (
          <div className="py-4 border-t  animate-fade-in">
            <label className="text-gray-500 font-semibold uppercase tracking-wide hover:text-cyan-400 transition-all mb-1 block">
              Sub Task
            </label>
            <h5 className="text-base line-clamp-1 text-gray-500 font-medium">{task?.subTasks[0].title}</h5>

            <div className="p-4 space-x-6 flex items-center">
              <span className="text-sm text-gray-400">{formatDate(new Date(task?.subTasks[0]?.date))}</span>
              <span className="bg-cyan-600/10 px-3 py-1 rounded-full text-cyan-400 font-medium">
                {task?.subTasks[0].tag}
              </span>
            </div>
          </div>
        ) : (
          <div className="py-4 border-t ">
            <span className="text-gray-400">No Sub Task</span>
          </div>
        )}

        {/* Add Subtask Button */}
        <div className="w-full pb-2">
          <button
            onClick={() => setOpen(true)}
            disabled={!user.isAdmin}
            className="w-full flex gap-4 items-center text-sm text-gray-400 font-semibold disabled:cursor-not-allowed disabled:text-gray-500 hover:text-white hover:shadow-md  transition-all"
          >
            <IoMdAdd className="text-lg" />
            <span>ADD SUBTASK</span>
          </button>
        </div>
      </div>

      <AddSubTask open={open} setOpen={setOpen} id={task._id} />
    </>
  );
};

export default TaskCard;
