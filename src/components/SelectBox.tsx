import { Dispatch, FC, Fragment, SetStateAction } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

export type Props = {
  label?: string;
  value: string;
  select: Dispatch<SetStateAction<string>>;
  options: Array<{ id: string; name: string }>; // 選択肢
};

export const SelectBox: FC<Props> = (props) => {
  const { label, value, select, options } = props;

  return (
    <div>
      {/* labelが渡ってきたら、ラベルを表示 */}
      {label && <label className="text-gray-500 text-sm">{label}</label>}
      <Listbox value={value} onChange={select}>
        <div className="relative">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-200 rounded-lg shadow-md focus:outline-none sm:text-sm">
            <span className="block truncate">{value}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 z-20 text-base bg-white rounded-md shadow-lg max-h-60 focus:outline-none sm:text-sm">
              {options.map((option) => (
                <Listbox.Option
                  key={option.id}
                  className={({ active }) =>
                    `${active ? "text-text-brown bg-bgc" : "text-gray-900"}
                           select-none relative py-2 pl-10 pr-4`
                  }
                  value={option.name}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? "font-medium" : "font-normal"
                        } block truncate`}
                      >
                        {option.name}
                      </span>
                      {selected ? (
                        <span
                          className={`${active ? "text-basic" : "text-basic"}
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
