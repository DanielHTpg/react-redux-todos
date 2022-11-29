import React, { useCallback, useEffect, useRef, useState } from 'react';

import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';
import { ITodoItem } from './interfaces';
import { TodosService } from './services';

const service = new TodosService();

export const App = React.memo(function App() {
	const [items, setItems] = useState<ITodoItem[]>([]);
	const [loaded, setLoaded] = useState(false);
	const [newTodoText, setNewTodoText] = useState('');
	const inited = useRef(false);

	const onAddTodo = useCallback(
		async (todo: ITodoItem) => {
			const newTodo = await service.createTodo(todo);

			const newItems: ITodoItem[] = [...items, newTodo];
			setItems(newItems);
			setNewTodoText('');
		},
		[items, setItems]
	);
	const onUpdateTodo = useCallback(
		async (todo: ITodoItem) => {
			const updatedTodo = await service.updateTodo(todo);

			const newItems: ITodoItem[] = items.map((i) => (i.id === todo.id ? updatedTodo : i));
			setItems(newItems);
		},
		[items, setItems]
	);
	const onRemoveTodo = useCallback(
		async (todo: ITodoItem) => {
			await service.deleteTodo(todo);

			const newItems: ITodoItem[] = items.filter((i) => i.id !== todo.id);
			setItems(newItems);
		},
		[items, setItems]
	);

	useEffect(() => {
		(async () => {
			// Prevent double reading due to new react 18 useEffect behaviour
			if (inited.current) {
				return;
			}
			inited.current = true;
			const todos = await service.readTodos();
			setItems(todos);
			setLoaded(true);
		})().catch((e) => console.error(e));
	}, [setItems]);

	const onUpdateNewTodoText = useCallback((text: string) => setNewTodoText(text), [setNewTodoText]);

	return (
		<div className='app'>
			{!loaded && <div>Loading...</div>}
			{loaded && (
				<>
					<TodoList items={items} removeTodo={onRemoveTodo} addTodo={onAddTodo} updateTodo={onUpdateTodo} />
					<AddTodoForm
						newTodoText={newTodoText}
						updateNewTodoText={onUpdateNewTodoText}
						addTodo={onAddTodo}
					/>
				</>
			)}
		</div>
	);
});
