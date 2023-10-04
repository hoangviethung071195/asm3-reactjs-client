import { PropsWithChildren, createContext, useState } from 'react';
import { ToastContainer } from 'react-toastify';

const LayoutContext = createContext<{
  layoutClassName: string;
  isAdd: boolean;
  toggleLayoutClassName(layoutClassName: string, isAdd?: boolean): void;
}>({
  layoutClassName: '',
  isAdd: false,
  toggleLayoutClassName() { }
});

export function StyleContextProvider(props: PropsWithChildren) {
  const [layoutClassName, setLayoutClassName] = useState('');
  const [isAdd, setIsAdd] = useState(false);

  function toggleLayoutClassName(className: string, isAdd = false) {
    setLayoutClassName(className);
    setIsAdd(isAdd);
  }

  return (
    <LayoutContext.Provider
      value={{
        layoutClassName,
        isAdd,
        toggleLayoutClassName
      }}
    >
      {props.children}
      <ToastContainer />
    </LayoutContext.Provider>
  );
}

export default LayoutContext;
