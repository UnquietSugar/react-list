type Action =
	| {
			type: 'add';
			payload: { value: string };
	  }
	| {
			type: 'clear';
	  }
	| {
			type: 'add-list';
			payload: { value: string[] };
	  };

export default Action;
