import React from "react";
import {
  MdAdminPanelSettings,
  MdKeyboardDoubleArrowUp,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";
import { FaNewspaper } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import clsx from "clsx";
import { summary } from "../assets/data";
import { Chart } from "../components/Chart";
import moment from "moment";
import { TASK_TYPE } from "../utils";

// TaskTable Component
const TaskTable = ({ tasks }) => {
  const ICONS = {
    high: <MdKeyboardDoubleArrowUp className="text-red-500" />,
    medium: <MdKeyboardArrowUp className="text-yellow-400" />,
    low: <MdKeyboardArrowDown className="text-green-500" />,
  };

  const TableHeader = () => (
    <thead className="border-b-2 border-gray-300">
      <tr className="text-black text-left">
        <th className="py-3">Task Title</th>
        <th className="py-3">Priority</th>
        <th className="py-3">Team</th>
        <th className="py-3 hidden md:table-cell">Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className="text-black border-b border-gray-200">
      <td className="py-3 flex items-center gap-2">
        <span className={clsx("w-3 h-3 rounded-full", TASK_TYPE[task.stage])}></span>
        {task.title}
      </td>
      <td className="py-3 flex items-center gap-2">
        {ICONS[task.priority]} <span className="capitalize">{task.priority}</span>
      </td>
      <td className="py-3">
        <div className="flex gap-1">
          {task.team.map((member, index) => (
            <span
              key={index}
              className={clsx("w-4 h-4 rounded-full border-2 shadow-md", TASK_TYPE[member.role])}
            ></span>
          ))}
        </div>
      </td>
      <td className="py-3 text-gray-400 hidden md:table-cell">{moment(task.date).fromNow()}</td>
    </tr>
  );

  return (
    <div className="w-full md:w-2/3 p-3 rounded-lg shadow-lg text-black bg-white">
      <table className="w-full table-auto">
        <TableHeader />
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task, index) => <TableRow key={index} task={task} />)
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-3">
                No tasks available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// UserTable Component
const UserTable = ({ users }) => {
  const TableHeader = () => (
    <thead>
      <tr className="text-black text-left">
        <th className="py-3">Full Name</th>
        <th className="py-3">Status</th>
        <th className="py-3">Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className="text-black border-b border-gray-200">
      <td className="py-3">{user.name}</td>
      <td className="py-3">
        <p
          className={clsx(
            "w-fit px-3 py-1 rounded-full text-sm",
            user?.isActive ? "bg-green-500 text-white" : "bg-red-500 text-white"
          )}
        >
          {user?.isActive ? "Active" : "Disabled"}
        </p>
      </td>
      <td className="py-3 text-gray-400">{moment(user?.createdAt).fromNow()}</td>
    </tr>
  );

  return (
    <div className="w-full md:w-1/3 p-3 rounded-lg shadow-lg text-black bg-white">
      <table className="w-full table-auto">
        <TableHeader />
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => <TableRow key={index} user={user} />)
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-3 text-gray-400">
                No users available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Cards Summary
const totals = summary?.tasks || {};
const stats = [
  {
    label: "TOTAL TASK",
    total: summary?.totalTasks || 0,
    icon: <FaNewspaper />,
    bg: "bg-gradient-to-r from-pink-600 to-purple-600",
  },
  {
    label: "COMPLETED TASK",
    total: totals["completed"] || 0,
    icon: <MdAdminPanelSettings />,
    bg: "bg-gradient-to-r from-green-600 to-teal-600",
  },
  {
    label: "TASK IN PROGRESS",
    total: totals["in progress"] || 0,
    icon: <LuClipboardList />,
    bg: "bg-gradient-to-r from-yellow-600 to-orange-600",
  },
  {
    label: "TODOS",
    total: totals["todo"] || 0,
    icon: <FaArrowsToDot />,
    bg: "bg-gradient-to-r from-blue-600 to-indigo-600",
  },
];

// Card Component
const Card = ({ label, count, bg, icon }) => (
  <div className="w-full h-32 p-5 shadow-lg rounded-lg flex items-center justify-between bg-white">
    <div className="flex flex-col">
      <p className="text-black text-sm font-medium">{label}</p>
      <span className="text-3xl font-semibold text-black">{count}</span>
    </div>
    <div className={clsx("w-14 h-14 rounded-full flex items-center justify-center text-white text-xl", bg)}>
      {icon}
    </div>
  </div>
);

// Dashboard Component
const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col py-6 px-6 text-black bg-gray-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {stats.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>

      <div className="w-full mt-8 p-6 rounded-lg shadow-lg bg-white">
        <h4 className="text-lg font-semibold text-black mb-4">Chart by Progress or Priority</h4>
        <Chart />
      </div>

      <div className="w-full flex flex-col md:flex-row gap-4 py-8 2xl:gap-10">
        <TaskTable tasks={summary?.last10Task || []} />
        <UserTable users={summary?.users || []} />
      </div>
    </div>
  );
};

export default Dashboard;
