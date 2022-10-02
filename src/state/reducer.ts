import Action from './action';

const reducer = (state: { list: string[] }, action: Action) => {
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
