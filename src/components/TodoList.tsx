import React from 'react';

import styles from './TodoList.module.scss';

import { ITodoItem } from '../interfaces';
import { TodoItem } from './TodoItem';

interface ITodoListProps {
	items: ITodoItem[];
	removeTodo: (todo: ITodoItem) => void;
	updateTodo: (todo: ITodoItem) => void;
}

export const TodoList = React.memo<ITodoListProps>(function TodoList({ items, removeTodo, updateTodo }) {
	return (
		<ul className={styles.todoList}>
			{items.map((todo) => (
				<TodoItem key={todo.id} todo={todo} removeTodo={removeTodo} updateTodo={updateTodo} />
			))}
		</ul>
	);
});
