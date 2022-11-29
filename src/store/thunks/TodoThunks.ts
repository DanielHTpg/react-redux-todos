import { createAsyncThunk } from '@reduxjs/toolkit';

import { ITodoItem } from '../../interfaces';

interface IReadItemPayload {
	readFn: () => Promise<ITodoItem[]>;
}
export const readTodos = createAsyncThunk('todos/readTodos', async (payload: IReadItemPayload, { rejectWithValue }) => {
	try {
		const { readFn } = payload;
		const items = await readFn();
		return { items };
	} catch (e) {
		const message = `Failed read todos`;
		console.error(message, e);
		return rejectWithValue({
			message,
		});
	}
});

interface ICreateUpdatreDeleteItemPayload {
	fn: (todo: ITodoItem) => Promise<ITodoItem>;
	todo: ITodoItem;
}
export const createTodo = createAsyncThunk(
	'todos/createTodo',
	async (payload: ICreateUpdatreDeleteItemPayload, { rejectWithValue }) => {
		try {
			const { fn, todo } = payload;
			const created = await fn(todo);
			return { created };
		} catch (e) {
			const message = `Failed create todo`;
			console.error(message, e);
			return rejectWithValue({
				message,
			});
		}
	}
);

export const updateTodo = createAsyncThunk(
	'todos/updateTodo',
	async (payload: ICreateUpdatreDeleteItemPayload, { rejectWithValue }) => {
		try {
			const { fn, todo } = payload;
			const updated = await fn(todo);
			return { updated };
		} catch (e) {
			const message = `Failed create todo`;
			console.error(message, e);
			return rejectWithValue({
				message,
			});
		}
	}
);

export const deletedTodo = createAsyncThunk(
	'todos/deleteTodo',
	async (payload: ICreateUpdatreDeleteItemPayload, { rejectWithValue }) => {
		try {
			const { fn, todo } = payload;
			const deleted = await fn(todo);
			return { deleted };
		} catch (e) {
			const message = `Failed delete todo`;
			console.error(message, e);
			return rejectWithValue({
				message,
			});
		}
	}
);
