import { ChangeEventHandler, FC, memo } from "react";

type Props = {
  label?: string; // 必要ならラベル名を渡せる
  value: string; // 入力値
  rows: number; // 列数
  cols: number; // 行数
  placeholder?: string; // 必要ならplaceholderを渡せる
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
};

/**
 * テキストエリアのコンポーネント.
 */
export const TextArea: FC<Props> = memo((props) => {
  const { label, value, rows, cols, placeholder, onChange } = props;
  
  return (
    <div className="flex flex-col">
      {label && <label htmlFor={label}>{label}</label>}
      <textarea
        id={label}
        value={value}
        onChange={onChange}
        rows={rows}
        cols={cols}
        placeholder={placeholder}
        className="p-5 focus:outline-none focus:border-basic border border-gray-300 shadow-md outline-none"
      ></textarea>
    </div>
  );
});
