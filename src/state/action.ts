type Action =
	| {
			type: 'add';
			payload: { value: string };
	  }
	| {
			type: 'clear';
	  }
	| {
			type: 'addList';
			payload: { value: string[] };
	  };

export default Action;
