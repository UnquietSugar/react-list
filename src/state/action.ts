import { ListItem } from './state';

type Action =
	| {
			type: 'add';
			payload: { value: ListItem };
	  }
	| {
			type: 'clear';
	  }
	| {
			type: 'add-list';
			payload: { value: ListItem[] };
	  }
	| {
			type: 'undo';
	  }
	| {
			type: 'redo';
	  };

export default Action;
