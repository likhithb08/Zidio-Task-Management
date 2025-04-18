import { Popover, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { getInitials } from "../utils";

const UserInfo = ({ user }) => {
  if (!user) return null;

  return (
    <div className='px-4'>
      <Popover className='relative'>
        {({ open }) => (
          <>
            {/* Trigger Button */}
            <Popover.Button
              className='text-black group inline-flex items-center outline-none'
              aria-label={`Open user info for ${user.name}`}
            >
              <span className='font-semibold bg-blue-100 text-blue-700 px-3 py-2 rounded-full'>
                {getInitials(user.name)}
              </span>
            </Popover.Button>

            {/* Popover Panel */}
            <Transition
              as={Fragment}
              enter='transition ease-out duration-200'
              enterFrom='opacity-0 translate-y-1'
              enterTo='opacity-100 translate-y-0'
              leave='transition ease-in duration-150'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 translate-y-1'
            >
              <Popover.Panel className='absolute left-1/2 z-10 mt-3 w-80 max-w-sm -translate-x-1/2 transform px-4 sm:px-0'>
                <div className='flex items-center gap-4 rounded-xl shadow-lg bg-white p-6 border border-gray-200'>
                  {/* Avatar or Initials */}
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className='w-16 h-16 rounded-full object-cover'
                    />
                  ) : (
                    <div className='w-16 h-16 bg-blue-600 rounded-full text-white flex items-center justify-center text-2xl font-bold'>
                      {getInitials(user.name)}
                    </div>
                  )}

                  {/* User Details */}
                  <div className='flex flex-col gap-y-1'>
                    <p className='text-gray-900 text-xl font-bold'>{user.name}</p>
                    <span className='text-sm text-gray-600'>{user.title}</span>
                    <span className='text-sm text-blue-500'>
                      {user.email ?? "email@example.com"}
                    </span>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default UserInfo;
