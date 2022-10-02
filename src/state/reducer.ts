import Action from './action';
import { ListItem } from './state';

const reducer = (
	state: { list: ListItem[]; historyList: ListItem[] },
	action: Action
) => {
	switch (action.type) {
		case 'add':
			return { ...state, list: [action.payload.value, ...state.list] };
		case 'clear':
			return { ...state, list: [] };
		case 'add-list':
			return { ...state, list: action.payload.value };
		case 'undo':
			return {
				...state,
				historyList: [state.list[0], ...state.historyList],
				list: state.list.slice(1),
			};
		case 'redo':
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
