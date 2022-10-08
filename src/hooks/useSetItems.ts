import { useEffect, useRef } from 'react';
import { useStoreContext } from '../state/state';
import useListControlls from './useListControlls';
import useStorage from './useStorage';

const useSetItems = () => {
	const { state } = useStoreContext();
	const { setList, getList, setHistory, getHistory } = useStorage();
	const { list } = useListControlls();
	const isLoaded = useRef<boolean>(false); // needed because of react 18 strict mode

	useEffect(() => {
		if (!isLoaded.current) {
			if (state.list.length === 0 || state.historyList.length === 0) {
				const sessionList = getList();
				const sessionHistoryList = getHistory();
				if (sessionList) {
					list.addList(sessionList);
				}
				if (sessionHistoryList) {
					list.addHistoryList(sessionHistoryList);
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
