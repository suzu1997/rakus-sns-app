import { ChangeEventHandler, FC } from "react";

export type Props = {
  label: string;
  value: string;
  type: string;
  fullWidth: boolean; // trueなら親要素のwidthの長さ
  placeholder?: string;
  required: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const TextInput: FC<Props> = (props) => {
  const {
    label,
    value,
    type,
    fullWidth = true,
    placeholder,
    required,
    onChange,
  } = props;

  return (
    <div>
      <div className="flex items-center mb-1">
        <label htmlFor={label}>{label}</label>
        {/* requiredがtrueの場合は必須のバッジ表示 */}
        {required && (
          <span className="bg-basic text-white text-xs font-medium ml-3 px-2 py-1.5 rounded-lg dark:bg-red-200 dark:text-red-900">
            必須
          </span>
        )}
      </div>
      <input
        id={label}
        value={value}
        type={type}
        placeholder={placeholder}
        required
        className={`${
          fullWidth && "w-full"
        } relative py-2 pl-3 pr-10 text-left bg-white border border-gray-300 shadow-md outline-none rounded-lg focus:outline-none focus:border-basic focus-visible:ring-white sm:text-sm`}
        onChange={onChange}
      />
    </div>
  );
};
