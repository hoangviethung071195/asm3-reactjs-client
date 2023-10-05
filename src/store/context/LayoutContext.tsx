import { ForwardRefExoticComponent, PropsWithChildren, ReactElement, ReactNode, RefAttributes, RefObject, createContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

const LayoutContext = createContext<{
  layoutEl?: HTMLDivElement;
  layoutClassName: string;
  isAdd: boolean;
  toggleLayoutClassName(layoutClassName: string, isAdd?: boolean): void;
  scrollToTop(): void;
}>({
  layoutEl: undefined,
  layoutClassName: '',
  isAdd: false,
  toggleLayoutClassName() { },
  scrollToTop() { }
});

export function StyleContextProvider(props: PropsWithChildren) {
  const [layoutClassName, setLayoutClassName] = useState('');
  const [isAdd, setIsAdd] = useState(false);
  const [layoutEl, setLayoutEl] = useState<HTMLDivElement>();

  function toggleLayoutClassName(className: string, isAdd = false) {
    setLayoutClassName(className);
    setIsAdd(isAdd);
  }

  useEffect(() => {
    const children = Array.from(props.children as Iterable<ReactNode>);
    for (let index = 0; index < children.length; index++) {
      const child = children[index] as RefAttributes<HTMLDivElement>;
      const ref = child.ref as RefObject<HTMLDivElement>;
      if (ref?.current) {
        setLayoutEl(ref.current);
      }
    };
  }, [props.children]);

  function scrollToTop() {
    layoutEl?.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }

  return (
    <LayoutContext.Provider
      value={{
        layoutEl,
        layoutClassName,
        isAdd,
        toggleLayoutClassName,
        scrollToTop,
      }}
    >
      {props.children}
      <ToastContainer />
    </LayoutContext.Provider>
  );
}

export default LayoutContext;
