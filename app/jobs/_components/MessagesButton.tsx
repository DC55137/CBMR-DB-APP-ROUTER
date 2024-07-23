import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { Job } from "@prisma/client";

import {
  leadMessage,
  cancelJob,
  onlineMeasureUpQuote,
  drawingMeasureUpQuote,
} from "@/data/messages";

import { emailMessage } from "@/data/emailMessage";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface MessagesButtonProps {
  selected: Job;
}

export default function MessagesButton({ selected }: MessagesButtonProps) {
  const lead = leadMessage(selected);
  const cancel = cancelJob(selected);
  const onlineQuote = onlineMeasureUpQuote(selected);
  const drawingQuote = drawingMeasureUpQuote(selected);
  const emailMessageHTML = emailMessage(selected);

  const solutions = [
    { name: "Hipages Lead", value: lead },
    { name: "Cancel Job", value: cancel },
    { name: "Quoted Using QueenslandGlobe", value: onlineQuote },
    { name: "Quoted Using Plans", value: drawingQuote },
    { name: "Email for sending quotes.", value: emailMessageHTML },
  ];

  const handleCopyValue = (item: { name: string; value: string }) => {
    navigator.clipboard.writeText(item.value);
    toast(`${item.name} copied`);
  };

  return (
    <Popover className="relative mr-5">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              "group inline-flex items-center rounded-md text-base font-medium text-main-700 hover:text-gray-800"
            )}
          >
            <Icon icon={"typcn:messages"} className="h-6 w-6" />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute -top-4 -left-4 z-20 mt-3 w-52 -translate-x-full transform  px-2 sm:px-0">
              <div className=" rounded-lg  shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="bg-gray relative grid text-left">
                  {solutions.map((item) => (
                    <button
                      key={item.name}
                      className=" block bg-gray-700 p-2 text-left capitalize text-gray-400 hover:bg-gray-600 hover:text-gray-800"
                      onClick={() => handleCopyValue(item)}
                    >
                      <Icon
                        icon={"ic:round-send"}
                        className="mx-2 inline"
                        width={20}
                        height={20}
                      />
                      <p className="inline text-base font-medium ">
                        {item.name}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
