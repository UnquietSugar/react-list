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
	const clearStorage = () => {
		sessionStorage.removeItem('list');
		sessionStorage.removeItem('history');
	};

	const setHistory = (arr: ListItem[]) => {
		sessionStorage.setItem('history', JSON.stringify(arr));
	};
	const getHistory = () => {
		const item = sessionStorage.getItem('history');
		if (item) return JSON.parse(item);
		return undefined;
	};

	return {
		setList,
		getList,
		clearStorage,
		setHistory,
		getHistory,
	};
};

export default useStorage;
