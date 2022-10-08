import ListAction from '../enums/ListAction';
import Action from './action';
import { ListItem } from './state';

const reducer = (
	state: { list: ListItem[]; historyList: ListItem[] },
	action: Action
) => {
	switch (action.type) {
		case ListAction.add:
			return { ...state, list: [action.payload.value, ...state.list] };
		case ListAction.clear:
			return { ...state, list: [], historyList: [] };
		case ListAction.addList:
			return { ...state, list: action.payload.value };
		case ListAction.addHistoryList:
			return { ...state, historyList: action.payload.value };
		case ListAction.undo:
			return {
				...state,
				historyList: [state.list[0], ...state.historyList],
				list: state.list.slice(1),
			};
		case ListAction.redo:
			return {
				...state,
				list: [state.historyList[0], ...state.list],
				historyList: state.historyList.slice(1),
			};
		default:
			return state;
	}
};

export default reducer;
