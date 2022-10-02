import { useEffect, useRef, useState } from 'react';
import useStorage from './hooks/useStorage';
import { useStoreContext } from './state/state';

const App = () => {
	const [inputValue, setInputValue] = useState<string>('');
	const { state, dispatch } = useStoreContext();
	const { setList, getList, removeList } = useStorage();
	const isLoaded = useRef<boolean>(false); // needed because of react 18 strict mode

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.currentTarget?.value);
	};

	const saveValue = () => {
		if (inputValue !== '') {
			dispatch({
				type: 'add',
				payload: { value: inputValue },
			});
			setInputValue('');
		}
	};

	const onClear = () => {
		dispatch({
			type: 'clear',
		});
		setInputValue('');
		removeList();
	};

	useEffect(() => {
		if (state.list.length > 0) {
			setList(state.list);
		}
	}, [state.list]);

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
				<button>Undo</button>
				<button onClick={onClear}>Clear</button>
				<button>Redo</button>
			</div>
			<div className='center'>
				<input type='text' value={inputValue} onChange={onInputChange} />
			</div>
			<div className='center'>
				<button onClick={saveValue}>Save</button>
			</div>
			<div className='list-container'>
				<ul>
					{state.list.map((item, index) => (
						<li key={item + index}>{item}</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default App;
