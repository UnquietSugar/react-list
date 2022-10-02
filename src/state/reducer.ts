import Action from './action';
import { ListItem } from './state';

const reducer = (state: { list: ListItem[] }, action: Action) => {
	switch (action.type) {
		case 'add':
			return { ...state, list: [...state.list, action.payload.value] };
		case 'clear':
			return { ...state, list: [] };
		case 'add-list':
			return { ...state, list: action.payload.value };
		default:
			return state;
	}
};

export default reducer;
