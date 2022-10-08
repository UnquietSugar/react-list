import InputAction from '../../enums/InputAction';

type Action =
	| {
			type: InputAction.add;
			payload: { value: string };
	  }
	| {
			type: InputAction.clear;
	  }
	| {
			type: InputAction.undo;
	  }
	| {
			type: InputAction.redo;
	  };

export default Action;
