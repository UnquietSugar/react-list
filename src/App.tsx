import { useCallback, useState } from 'react';
import useStorage from './hooks/useStorage';
import useListControlls from './hooks/useListControlls';
import { useStoreContext } from './state/state';
import useSetItems from './hooks/useSetItems';
import cx from 'classnames';
import useInputControlls from './hooks/useInputControlls/useInputControlls';

const App = () => {
	const [inputValue, setInputValue] = useState<string>('');
	const { state } = useStoreContext();
	const [isInputFocused, toggle] = useState<boolean>(false);
	const { setList } = useStorage();
	const { list } = useListControlls();
	const { input } = useInputControlls();
	useSetItems();

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.currentTarget?.value);
		input.add(e.currentTarget?.value);
	};

	const saveValue = () => {
		if (inputValue !== '') {
			list.addListItem(inputValue);
			setInputValue('');
		}
	};

	const onEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			saveValue();
		}
	};

	const onUndo = () => {
		if (isInputFocused) {
			list.undo();
		} else {
			const value = input.undo();
			if (!!value || value === '') setInputValue(value);
		}
	};

	const onClear = () => {
		if (isInputFocused) {
			list.clear();
		} else {
			input.clear();
			setInputValue('');
		}
	};

	const onRedo = () => {
		if (isInputFocused) {
			list.redo();
		} else {
			const value = input.redo();
			if (value) setInputValue(value);
		}
	};

	const onToggle = () => {
		toggle(!isInputFocused);
	};

	const onItemClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
		setInputValue(e.currentTarget.innerText);
		const newList = state.list.filter((item) => item.id !== e.currentTarget.id);
		list.addList(newList);
		setList(state.list);
	};

	return (
		<div>
			<div className={cx('center', isInputFocused ? 'focused-list' : 'focused-input')}>
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
					className={cx(!isInputFocused && 'focused-input')}
				/>
				<label className='switch'>
					<input type='checkbox' checked={isInputFocused} onChange={onToggle} />
					<span className='slider'></span>
				</label>
			</div>
			<div className='center'>
				<button onClick={saveValue}>Save</button>
			</div>
			<div className={cx('list-container', isInputFocused && 'focused-list')}>
				<p className='center'>Values:</p>
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
