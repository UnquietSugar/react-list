import React, { FC } from 'react';
import cx from 'classnames';
import { ListItem } from '../state/state';

interface ListOfValuesProps {
	isInputFocused: boolean;
	list: ListItem[];
	onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

const ListOfValues: FC<ListOfValuesProps> = ({ isInputFocused, list, onClick }) => {
	return (
		<div className={cx('list-container', isInputFocused && 'focused-list')}>
			<p className='center'>Values:</p>
			<ul>
				{list.map((item) => (
					<li key={item.id} id={item.id} onClick={onClick}>
						{item.item}
					</li>
				))}
			</ul>
		</div>
	);
};

export default ListOfValues;
