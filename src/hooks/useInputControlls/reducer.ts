import InputAction from '../../enums/InputAction';
import Action from './action';

const reducer = (state: { values: string[]; index: number }, action: Action) => {
	switch (action.type) {
		case InputAction.add:
			return {
				...state,
				values: [...state.values, action.payload.value],
				index: state.index++,
			};
		case InputAction.undo:
			return {
				...state,
				index: state.index--,
			};
		case InputAction.redo:
			return {
				...state,
				index: state.index++,
			};
		case InputAction.clear:
			return {
				...state,
				values: [],
				index: -1,
			};

		default:
			return state;
	}
};

export default reducer;
