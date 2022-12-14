import InputAction from '../../enums/InputAction';
import useInputMemo from './useInputMemo';

const useInputControlls = () => {
	const { state, dispatch } = useInputMemo();

	const add = (value: string) => {
		dispatch({
			type: InputAction.add,
			payload: { value: value },
		});
	};

	const undo = () => {
		if (state.index - 1 < -1) return;
		if (state.index > -1) {
			dispatch({
				type: InputAction.undo,
			});
			return state.values[state.index - 1] ?? '';
		}
		return null;
	};

	const redo = () => {
		if (state.index + 1 <= state.values.length - 1) {
			dispatch({
				type: InputAction.redo,
			});
			return state.values[state.index + 1];
		}
		return null;
	};

	const clear = () => {
		dispatch({
			type: InputAction.clear,
		});
	};

	return {
		input: { add, undo, redo, clear },
	};
};

export default useInputControlls;
