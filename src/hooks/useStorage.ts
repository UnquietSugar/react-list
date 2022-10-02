import { ListItem } from '../state/state';

const useStorage = () => {
	const setList = (arr: ListItem[]) => {
		sessionStorage.setItem('list', JSON.stringify(arr));
	};
	const getList = () => {
		const item = sessionStorage.getItem('list');
		if (item) return JSON.parse(item);
		return undefined;
	};
	const removeList = () => sessionStorage.removeItem('list');

	const setHistory = (arr: ListItem[]) => {
		sessionStorage.setItem('history', JSON.stringify(arr));
	};
	const getHistory = () => {
		const item = sessionStorage.getItem('history');
		if (item) return JSON.parse(item);
		return undefined;
	};
	const removeHistory = () => sessionStorage.removeItem('history');

	return {
		setList,
		getList,
		removeList,
		setHistory,
		getHistory,
		removeHistory,
	};
};

export default useStorage;
