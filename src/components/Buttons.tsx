import React, { FC } from 'react';
import cx from 'classnames';

interface ButtonsInterface {
	children: React.ReactNode;
	isInputFocused: boolean;
	onUndo: () => void;
	onRedo: () => void;
	onClear: () => void;
	saveValue: () => void;
}

const Buttons: FC<ButtonsInterface> = ({
	children,
	isInputFocused,
	onClear,
	onRedo,
	onUndo,
	saveValue,
}) => {
	return (
		<div>
			<div className={cx('center', isInputFocused ? 'focused-list' : 'focused-input')}>
				<button onClick={onUndo}>Undo</button>
				<button onClick={onClear}>Clear</button>
				<button onClick={onRedo}>Redo</button>
			</div>
			{children}
			<div className='center'>
				<button onClick={saveValue}>Save</button>
			</div>
		</div>
	);
};

export default Buttons;
