import { useState } from 'react';
import useStorage from './hooks/useStorage';
import useListControlls from './hooks/useListControlls';
import { useStoreContext } from './state/state';
import useSetItems from './hooks/useSetItems';
import cx from 'classnames';
import useInputControlls from './hooks/useInputControlls/useInputControlls';
import ListOfValues from './components/ListOfValues';
import Buttons from './components/Buttons';

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
		<main>
			<Buttons
				isInputFocused
				onClear={onClear}
				onRedo={onRedo}
				onUndo={onUndo}
				saveValue={saveValue}>
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
			</Buttons>
			<ListOfValues isInputFocused list={state.list} onClick={onItemClick} />
		</main>
	);
};

export default App;
