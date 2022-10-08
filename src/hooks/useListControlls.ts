import guid from '../helpers/guid';
import { ListItem, useStoreContext } from '../state/state';
import useStorage from './useStorage';

const useControlls = () => {
	const { state, dispatch } = useStoreContext();
	const { clearStorage } = useStorage();

	const undo = () => {
		if (state.list.length > 0) {
			dispatch({
				type: 'undo',
			});
		}
	};

	const redo = () => {
		if (state.historyList.length > 0) {
			dispatch({
				type: 'redo',
			});
		}
	};

	const clear = () => {
		dispatch({
			type: 'clear',
		});
		clearStorage();
	};

	const addListItem = (inputValue: string) => {
		dispatch({
			type: 'add',
			payload: { value: { item: inputValue, id: guid() } },
		});
	};

	const addList = (list: ListItem[]) => {
		dispatch({
			type: 'add-list',
			payload: { value: list },
		});
	};

	const addHistoryList = (list: ListItem[]) => {
		dispatch({
			type: 'add-history-list',
			payload: { value: list },
		});
	};

	return {
		list: {
			undo,
			redo,
			clear,
			addListItem,
			addList,
			addHistoryList,
		},
	};
};

export default useControlls;
