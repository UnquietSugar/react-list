import { useState } from 'react';
import { useStoreContext } from './state/state';

const App = () => {
	const [inputValue, setInputValue] = useState<string>('');
	const { state, dispatch } = useStoreContext();

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

	return (
		<div>
			<div className='center'>
				<button>Undo</button>
				<button>Clear</button>
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
