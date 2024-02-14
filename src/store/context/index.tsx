import { createContext, useContext, useState, ReactNode } from 'react';

import { initialGlobalState } from '~/utils/initializeState';
import useGlobalStateHook from './hooks/useGlobalStateHook';

const state = {
  isShowPanel: false,
  setShowPanel: (value) => {
    value;
  },
  globalState: initialGlobalState,
  setGlobalState: (value: typeof initialGlobalState) => {
    value;
  }
};

const GlobalContext = createContext<typeof state>(state);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [isShowPanel, setShowPanel] = useState(false);

  const { globalState, setGlobalState } = useGlobalStateHook();

  return (
    <GlobalContext.Provider
      value={{
        isShowPanel,
        setShowPanel,
        globalState,
        setGlobalState
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

export default ContextProvider;
