import ListAction from '../enums/ListAction';
import { ListItem } from './state';

type Action =
	| {
			type: ListAction.add;
			payload: { value: ListItem };
	  }
	| {
			type: ListAction.clear;
	  }
	| {
			type: ListAction.addList;
			payload: { value: ListItem[] };
	  }
	| {
			type: ListAction.addHistoryList;
			payload: { value: ListItem[] };
	  }
	| {
			type: ListAction.undo;
	  }
	| {
			type: ListAction.redo;
	  };

export default Action;
