import ListAction from '../enums/ListAction';
import guid from '../helpers/guid';
import { ListItem, useStoreContext } from '../state/state';
import useStorage from './useStorage';

const useControlls = () => {
	const { state, dispatch } = useStoreContext();
	const { clearStorage } = useStorage();

	const undo = () => {
		if (state.list.length > 0) {
			dispatch({
				type: ListAction.undo,
			});
		}
	};

	const redo = () => {
		if (state.historyList.length > 0) {
			dispatch({
				type: ListAction.redo,
			});
		}
	};

	const clear = () => {
		dispatch({
			type: ListAction.clear,
		});
		clearStorage();
	};

	const addListItem = (inputValue: string) => {
		dispatch({
			type: ListAction.add,
			payload: { value: { item: inputValue, id: guid() } },
		});
	};

	const addList = (list: ListItem[]) => {
		dispatch({
			type: ListAction.addList,
			payload: { value: list },
		});
	};

	const addHistoryList = (list: ListItem[]) => {
		dispatch({
			type: ListAction.addHistoryList,
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
