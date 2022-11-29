import React, { useCallback, useEffect, useRef } from 'react';

import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';
import { useAppDispatch, useAppSelector } from './hooks';
import { ITodoItem } from './interfaces';
import { TodosService } from './services';

import * as fromActions from './store/actions';
import * as fromSelectors from './store/selectors/TodoSelectors';

const service = new TodosService();

export const App = React.memo(function App() {
	const dispatch = useAppDispatch();

	const items = useAppSelector(fromSelectors.selectItems);
	const loaded = useAppSelector(fromSelectors.selectLoaded);
	const newTodoText = useAppSelector(fromSelectors.selectNewTodoText);
	const inited = useRef(false);

	const onAddTodo = useCallback(
		(todo: ITodoItem) => dispatch(fromActions.createTodo({ todo, fn: service.createTodo })),
		[dispatch]
	);
	const onUpdateTodo = useCallback(
		(todo: ITodoItem) => dispatch(fromActions.updateTodo({ todo, fn: service.updateTodo })),
		[dispatch]
	);
	const onRemoveTodo = useCallback(
		(todo: ITodoItem) => dispatch(fromActions.deletedTodo({ todo, fn: service.deleteTodo })),
		[dispatch]
	);

	useEffect(() => {
		(async () => {
			// Prevent double reading due to new react 18 useEffect behaviour
			if (inited.current) {
				return;
			}
			inited.current = true;
			dispatch(fromActions.readTodos({ readFn: service.readTodos }));
		})().catch((e) => console.error(e));
	}, [dispatch]);

	const onUpdateNewTodoText = useCallback(
		(text: string) => dispatch(fromActions.updateNewTodoText({ newTodoText: text })),
		[dispatch]
	);

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
