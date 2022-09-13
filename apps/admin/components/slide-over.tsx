import React, { Fragment } from "react";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";

export const SlideOver: React.FC<any> = ({ open, setOpen, members }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="flex items-center text-lg font-medium text-gray-900">
                          {members.team_name}
                          <a target="__blank" href={members.website}>
                            <ArrowTopRightOnSquareIcon className="ml-2 h-5 w-5 text-gray-800 hover:text-gray-500" />
                          </a>
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={setOpen}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-2">
                        <Link href={`/team/${members.slug}/add-member`}>
                          <a
                            href={`/team/${members.slug}/add-member`}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Add New Member
                          </a>
                        </Link>
                        <div className="mt-2 flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {members?.team_members?.length ? (
                              members.team_members.map((member: any) => (
                                <li key={member.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={member.avatar}
                                      alt={member.member_name}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>{member.member_name}</h3>
                                        <div className="flex">
                                          <button
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                      <div className="mt-1 flex justify-between text-base font-medium text-gray-900">
                                        <p className="text-sm text-gray-500">
                                          {member.position}
                                        </p>
                                        <div className="flex">
                                          <Link
                                            href={`/team/${members.slug}/${member.id}`}
                                          >
                                            <a
                                              href={`/team/${members.slug}/${member.id}`}
                                              className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                              Update
                                            </a>
                                          </Link>
                                        </div>
                                      </div>
                                      {/* <p className="mt-1 text-sm text-gray-500">
                                        {member.position}
                                      </p> */}
                                    </div>
                                  </div>
                                </li>
                              ))
                            ) : (
                              <div className=" mt-4 text-center">
                                <p className="text-gray-800">No Team Members</p>
                              </div>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 py-2 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Tatal Team Member</p>
                        <p>{members?.team_members?.length || ""}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        {members.description || ""}
                      </p>
                      <div className="mt-4">
                        <Link href={`/team/${members.slug}`}>
                          <a
                            href={`/team/${members.slug}`}
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            View Full Detail
                          </a>
                        </Link>
                      </div>
                      {/* <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div> */}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
