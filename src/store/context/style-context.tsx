import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyleContext = createContext<{
  layoutClassName: string;
  setLayoutClassName(layoutClassName: string): void;
}>({
  layoutClassName: '',
  setLayoutClassName() { }
});

export function StyleContextProvider(props: PropsWithChildren) {
  const [layoutClassName, setLayoutClassName] = useState('');

  useEffect(() => {

  }, []);

  return (
    <StyleContext.Provider
      value={{
        layoutClassName,
        setLayoutClassName
      }}
    >
      {props.children}
      <ToastContainer />
    </StyleContext.Provider>
  );
}

export default StyleContext;
