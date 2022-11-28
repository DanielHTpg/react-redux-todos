import React, { useCallback, useState } from 'react';

import { v4 } from 'uuid';

import { AddTodoForm } from './components/AddTodoForm';

import { TodoList } from './components/TodoList';
import { ITodoItem } from './interfaces';

export const App = React.memo(function App() {
	const [items, setItems] = useState<ITodoItem[]>([{ id: v4(), text: 'Learn redux', done: false }]);
	const [newTodoText, setNewTodoText] = useState('');

	const onAddTodo = useCallback(
		(todo: ITodoItem) => {
			const newItems: ITodoItem[] = [...items, todo];
			setItems(newItems);
			setNewTodoText('');
		},
		[items, setItems]
	);
	const onUpdateTodo = useCallback(
		(todo: ITodoItem) => {
			const newItems: ITodoItem[] = items.map((i) => (i.id === todo.id ? todo : i));
			setItems(newItems);
		},
		[items, setItems]
	);
	const onRemoveTodo = useCallback(
		(todo: ITodoItem) => {
			const newItems: ITodoItem[] = items.filter((i) => i.id !== todo.id);
			setItems(newItems);
		},
		[items, setItems]
	);

	const onUpdateNewTodoText = useCallback((text: string) => setNewTodoText(text), [setNewTodoText]);

	return (
		<>
			<TodoList items={items} removeTodo={onRemoveTodo} addTodo={onAddTodo} updateTodo={onUpdateTodo} />
			<AddTodoForm newTodoText={newTodoText} updateNewTodoText={onUpdateNewTodoText} addTodo={onAddTodo} />
		</>
	);
});
