import React from 'react'
import RootStore from './store/RootStore'
import {useLocalObservable} from "mobx-react";

const StoreContext = React.createContext(null);

export const StoreProvider = ({children}) => {
    const store = useLocalObservable(() => new RootStore())
    return <StoreContext.Provider value={store}>
        {children}
    </StoreContext.Provider>
}


export const useStores = () => React.useContext(StoreContext);
