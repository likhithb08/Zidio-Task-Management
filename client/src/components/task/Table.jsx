import React, { useState } from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import { MdAttachFile, MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from "react-icons/md";
import { FaList } from "react-icons/fa";
import { BGS, PRIORITY_STYLES, TASK_TYPE, formatDate } from "../../utils";
import clsx from "clsx";
import UserInfo from "../UserInfo";
import Button from "../Button";
import ConfirmatioDialog from "../Dialogs";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Table = ({ tasks }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);

  const deleteClicks = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const deleteHandler = () => {
    // Handle delete action here
  };

  const TableHeader = () => (
    <div className="grid grid-cols-5 gap-4 text-cyan-400 font-semibold py-2">
      <span>Task Title</span>
      <span>Priority</span>
      <span>Created At</span>
      <span>Assets</span>
      <span>Team</span>
    </div>
  );

  const TableRow = ({ task }) => (
    <div className="grid grid-cols-5 gap-4 py-4 border-b border-gray-700 text-gray-300 hover:bg-cyan-900/20 hover:shadow-md transition">
      {/* Task Title */}
      <div className="flex items-center gap-2">
        <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])} />
        <p className="w-full line-clamp-2 text-base text-white">{task?.title}</p>
      </div>

      {/* Priority */}
      <div className="flex gap-1 items-center">
        <span className={clsx("text-lg", PRIORITY_STYLES[task?.priority])}>
          {ICONS[task?.priority]}
        </span>
        <span className="capitalize line-clamp-1">{task?.priority} Priority</span>
      </div>

      {/* Created At */}
      <span className="text-sm text-gray-400">{formatDate(new Date(task?.date))}</span>

      {/* Assets */}
      <div className="flex gap-3">
        <div className="flex gap-1 items-center text-sm text-gray-400">
          <BiMessageAltDetail />
          <span>{task?.activities?.length}</span>
        </div>
        <div className="flex gap-1 items-center text-sm text-gray-400">
          <MdAttachFile />
          <span>{task?.assets?.length}</span>
        </div>
        <div className="flex gap-1 items-center text-sm text-gray-400">
          <FaList />
          <span>0/{task?.subTasks?.length}</span>
        </div>
      </div>

      {/* Team */}
      <div className="flex gap-2 justify-end">
        {task?.team?.map((m, index) => (
          <div
            key={m._id}
            className={clsx(
              "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
              BGS[index % BGS?.length]
            )}
          >
            <UserInfo user={m} />
          </div>
        ))}
      </div>

      {/* Actions (Edit and Delete) */}
      <div className="flex gap-4 justify-end items-center">
        <Button
          className="bg-cyan-600 text-black hover:bg-cyan-400 rounded-lg px-3 py-1 shadow-md hover:shadow-cyan-400/50 transition"
          label="Edit"
          type="button"
        />
        <Button
          className="bg-red-600 text-black hover:bg-red-500 rounded-lg px-3 py-1 shadow-md hover:shadow-red-400/40 transition"
          label="Delete"
          type="button"
          onClick={() => deleteClicks(task._id)}
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-[#0A192F] text-white px-6 py-6 rounded-lg">
        {/* Table Container */}
        <div className="overflow-x-auto">
          <TableHeader />
          <div className="w-full">
            {tasks.map((task, index) => (
              <TableRow key={index} task={task} />
            ))}
          </div>
        </div>

        {/* Bottom Gradient Line */}
        <div className="w-full h-1 bg-gradient-to-t from-cyan-400 to-transparent mt-4"></div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  );
};

export default Table;
