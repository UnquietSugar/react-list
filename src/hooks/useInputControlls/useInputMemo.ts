import { useReducer, useMemo } from 'react';
import reducer from './reducer';

const useInputMemo = () => {
	const [state, dispatch] = useReducer(reducer, { values: [], index: -1 });
	const stateMemo = useMemo(() => ({ state, dispatch }), [state]);

	return {
		state: stateMemo.state,
		dispatch: stateMemo.dispatch,
	};
};

export default useInputMemo;
