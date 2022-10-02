import React, { FC, createContext, useContext, useReducer, useMemo } from 'react';
import Action from './action';
import reducer from './reducer';

export interface Store {
	state: {
		list: string[];
	};
	dispatch: React.Dispatch<Action>;
}

const StoreContext = createContext<Store>({} as Store);

export const useStoreContext = () => useContext(StoreContext);

export const StoreContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, {
		list: [],
	});

	const stateMemo = useMemo(() => ({ state, dispatch }), [state]);

	return <StoreContext.Provider value={stateMemo}>{children}</StoreContext.Provider>;
};
