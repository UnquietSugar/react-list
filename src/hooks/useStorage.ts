const useStorage = () => {
	const setList = (arr: string[]) => {
		sessionStorage.setItem('list', JSON.stringify(arr));
	};
	const getList = () => {
		const item = sessionStorage.getItem('list');
		if (item) return JSON.parse(item);
		return undefined;
	};
	const removeList = () => sessionStorage.removeItem('list');

	return {
		setList,
		getList,
		removeList,
	};
};

export default useStorage;
