import { PropsWithChildren } from "react";
import s from './select-input.module.scss';
import { OptionModel } from 'models/Option.model';
import { BaseType } from 'models/General';

export default function SelectInput(props: PropsWithChildren<{
  onChange(sortBy: string): void;
  items: OptionModel<BaseType>[];
}>) {
  const { onChange, items } = props;

  return (
    <select className={"form-control " + s['select']} onChange={(e) => onChange(e.target.value)}>
      <option value={undefined}>Default sorting</option>
      {
        items.map(item => (
          <option key={item.value.toString()} value={(item.value).toString()}>{item.label}</option>
        ))
      }
    </select>
  );

}