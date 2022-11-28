import React, { useCallback } from 'react';

import styles from './TodoItem.module.scss';

import { ITodoItem } from '../interfaces';

interface ITodoItemProps {
	todo: ITodoItem;
	updateTodo: (todo: ITodoItem) => void;
}

export const TodoItem = React.memo<ITodoItemProps>(function TodoListItem({ todo, updateTodo }) {
	const onDoneChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) =>
			updateTodo({
				...todo,
				done: e.target.checked,
			}),
		[todo, updateTodo]
	);

	return (
		<li className={styles.todo}>
			<label className={todo.done ? styles.complete : undefined}>
				<input type='checkbox' onChange={onDoneChange} checked={todo.done} />
				{todo.text}
			</label>
		</li>
	);
});
