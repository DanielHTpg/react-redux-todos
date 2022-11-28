import React, { useCallback } from 'react';

import styles from './AddTodoForm.module.scss';

import { v4 } from 'uuid';

import { ITodoItem } from '../interfaces';

interface IAddTodoFormProps {
	newTodoText: string;
	updateNewTodoText: (newTodoText: string) => void;
	addTodo: (todo: ITodoItem) => void;
}

export const AddTodoForm = React.memo<IAddTodoFormProps>(function AddTodoForm({
	newTodoText,
	updateNewTodoText,
	addTodo,
}) {
	const onNewTodoText = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			updateNewTodoText(e.target.value);
		},
		[updateNewTodoText]
	);

	const handleSubmit = React.useCallback(
		(e: React.FormEvent<HTMLButtonElement>) => {
			if (newTodoText.trim().length === 0) {
				return;
			}
			e.preventDefault();
			addTodo({
				id: v4(),
				text: newTodoText,
				done: false,
			});
		},
		[newTodoText, addTodo]
	);

	return (
		<form className={styles.addForm}>
			<input type='text' value={newTodoText} onChange={onNewTodoText} />
			<button type='submit' onClick={handleSubmit} disabled={newTodoText.trim().length === 0}>
				Add Todo
			</button>
		</form>
	);
});
