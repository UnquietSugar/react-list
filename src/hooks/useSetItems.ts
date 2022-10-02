import { useEffect, useRef } from 'react';
import { useStoreContext } from '../state/state';
import useControlls from './useControlls';
import useStorage from './useStorage';

const useSetItems = () => {
	const { state } = useStoreContext();
	const { setList, getList, setHistory, getHistory } = useStorage();
	const { addList, addHistoryList } = useControlls();
	const isLoaded = useRef<boolean>(false); // needed because of react 18 strict mode

	useEffect(() => {
		if (!isLoaded.current) {
			if (state.list.length === 0 || state.historyList.length === 0) {
				const list = getList();
				const historyList = getHistory();
				console.log(historyList);
				if (list) {
					addList(list);
				}
				if (historyList) {
					addHistoryList(historyList);
				}
				isLoaded.current = true;
			}
		}
	}, []);

	useEffect(() => {
		setList(state.list);
	}, [state.list]);

	useEffect(() => {
		setHistory(state.historyList);
	}, [state.historyList]);
};

export default useSetItems;
