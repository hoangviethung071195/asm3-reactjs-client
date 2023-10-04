import { PropsWithChildren } from "react";

export default function NumberInput(props: PropsWithChildren<{
  value: number,
  onChange(value: number): void;
}>) {
  const { value, onChange } = props;

  return (
    <input
      className="form-control rounded-0 px-0 text-center border-0 outline-0 shadow-none"
      value={value}
      onChange={(e) => {
        const value = +e.target.value;
        if (!value) {
          return;
        }
        console.log('value ', value);
        onChange(value);
      }}
    />
  );
}