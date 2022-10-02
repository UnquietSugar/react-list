import { useCallback, useState } from 'react';
import useStorage from './hooks/useStorage';
import useControlls from './hooks/useControlls';
import { useStoreContext } from './state/state';
import useSetItems from './hooks/useSetItems';

const App = () => {
	const [inputValue, setInputValue] = useState<string>('');
	const { state } = useStoreContext();
	const { setList } = useStorage();
	const { undo, redo, clear, addListItem, addList } = useControlls();
	useSetItems();

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.currentTarget?.value);
	};

	const saveValue = () => {
		if (inputValue !== '') {
			addListItem(inputValue);
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
		clear();
		setInputValue('');
	};

	const onItemClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
		setInputValue(e.currentTarget.innerText);
		const list = state.list.filter((item) => item.id !== e.currentTarget.id);
		addList(list);
		setList(state.list);
	};

	return (
		<div>
			<div className='center'>
				<button onClick={undo}>Undo</button>
				<button onClick={onClear}>Clear</button>
				<button onClick={redo}>Redo</button>
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
