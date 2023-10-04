import { ChangeEventHandler, Dispatch, PropsWithChildren, SetStateAction } from "react";
import s from './search-input.module.scss';

export default function SearchInput(props: PropsWithChildren<{
  keyword?: string,
  onChange(keyword: string): void;
}>) {
  const { keyword, onChange } = props;

  function clearKeyword() {
    onChange('');
  }

  return (
    <div className={'input-group ' + s['input-container']}>
      <input
        type="text"
        className={"form-control text-2 py-2 " + s['search-input']}
        placeholder="Search products"
        value={keyword}
        onChange={e => onChange(e.target.value)}
      />
      <div className={s['search-icon'] + " input-group-text"}>
        <i className={"fa fa-fw fa-search"}></i>
      </div>
      {
        keyword &&
        <i className={'fa fa-times close-icon ' + s['close-icon']} onClick={clearKeyword}></i>
      }
    </div>
  );

}