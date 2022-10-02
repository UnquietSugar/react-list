import { useCallback, useEffect, useRef, useState } from 'react';
import guid from './helpers/guid';
import useStorage from './hooks/useStorage';
import { useStoreContext } from './state/state';

const App = () => {
	const [inputValue, setInputValue] = useState<string>('');
	const { state, dispatch } = useStoreContext();
	const { setList, getList, removeList, setHistory, getHistory, removeHistory } =
		useStorage();
	const isLoaded = useRef<boolean>(false); // needed because of react 18 strict mode

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.currentTarget?.value);
	};

	const saveValue = () => {
		if (inputValue !== '') {
			dispatch({
				type: 'add',
				payload: { value: { item: inputValue, id: guid() } },
			});
			setInputValue('');
		}
	};

	const onEnterKey = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter') {
				saveValue();
			}
		},
		[inputValue]
	);

	const onClear = () => {
		dispatch({
			type: 'clear',
		});
		setInputValue('');
		removeList();
	};

	const onItemClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
		setInputValue(e.currentTarget.innerText);
		const list = state.list.filter((item) => item.id !== e.currentTarget.id);
		dispatch({
			type: 'add-list',
			payload: { value: list },
		});
		setList(state.list);
	};

	const onUndo = () => {
		if (state.list.length > 0) {
			dispatch({
				type: 'undo',
			});
		}
	};

	const onRedo = () => {
		if (state.historyList.length > 0) {
			dispatch({
				type: 'redo',
			});
		}
	};

	useEffect(() => {
		setList(state.list);
		setHistory(state.historyList);
	}, [state.list, state.historyList]);

	useEffect(() => {
		if (state.list.length === 0 && !isLoaded.current) {
			const list = getList();
			if (list) {
				dispatch({
					type: 'add-list',
					payload: { value: list },
				});
			}
			isLoaded.current = true;
		}
	}, []);

	return (
		<div>
			<div className='center'>
				<button onClick={onUndo}>Undo</button>
				<button onClick={onClear}>Clear</button>
				<button onClick={onRedo}>Redo</button>
			</div>
			<div className='center'>
				<input
					type='text'
					value={inputValue}
					onChange={onInputChange}
					onKeyDown={onEnterKey}
				/>
			</div>
			<div className='center'>
				<button onClick={saveValue}>Save</button>
			</div>
			<div className='list-container'>
				<ul>
					{state.list.map((item) => (
						<li key={item.id} id={item.id} onClick={onItemClick}>
							{item.item}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default App;
