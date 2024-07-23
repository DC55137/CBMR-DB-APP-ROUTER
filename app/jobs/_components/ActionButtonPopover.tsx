import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";

const Actions = [
  { name: "true", value: true },
  { name: "false", value: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface ActionButtonPopoverProps {
  handleUpdateRowAction: (action: boolean) => Promise<void>;
}

export default function ActionButtonPopover({
  handleUpdateRowAction,
}: ActionButtonPopoverProps) {
  return (
    <Popover className="relative mr-5">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              "inline-flex items-center rounded-md bg-none text-base font-medium text-main-700 hover:text-gray-800"
            )}
          >
            <Icon icon={"codicon:symbol-boolean"} className="h-6 w-6" />
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
                  {Actions.map((item) => (
                    <button
                      key={item.name}
                      className=" block bg-gray-700 p-2 text-left capitalize text-gray-100 hover:bg-gray-600 hover:text-gray-800"
                      onClick={() => handleUpdateRowAction(item.value)}
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
