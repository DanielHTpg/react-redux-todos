import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ITodoItem } from '../../interfaces';
import * as fromThunks from '../thunks/TodoThunks';

export interface ITodosState {
	loaded: boolean;
	items: ITodoItem[];
	updating: boolean;
	newTodoText: string;
}

const initialState: ITodosState = {
	loaded: false,
	items: [],
	updating: false,
	newTodoText: '',
};

export const todosSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		updateNewTodoText: (state, action: PayloadAction<{ newTodoText: string }>) => {
			const { newTodoText } = action.payload;
			state.newTodoText = newTodoText;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fromThunks.readTodos.fulfilled, (state, action) => {
			const { items } = action.payload;
			state.items = items;
			state.loaded = true;
		});
		builder.addCase(fromThunks.createTodo.pending, (state, action) => {
			state.updating = true;
		});
		builder.addCase(fromThunks.createTodo.fulfilled, (state, action) => {
			const { created } = action.payload;
			state.items.push(created);
			state.updating = false;
		});
		builder.addCase(fromThunks.createTodo.rejected, (state, action) => {
			state.updating = false;
		});
		builder.addCase(fromThunks.updateTodo.pending, (state, action) => {
			state.updating = true;
		});
		builder.addCase(fromThunks.updateTodo.fulfilled, (state, action) => {
			const { updated } = action.payload;
			state.items[state.items.findIndex((i) => i.id === updated.id)] = updated;
			state.updating = false;
		});
		builder.addCase(fromThunks.updateTodo.rejected, (state, action) => {
			state.updating = false;
		});
		builder.addCase(fromThunks.deletedTodo.pending, (state, action) => {
			state.updating = true;
		});
		builder.addCase(fromThunks.deletedTodo.fulfilled, (state, action) => {
			const { deleted } = action.payload;
			state.items = state.items.filter((i) => i.id !== deleted.id);
			state.updating = false;
		});
		builder.addCase(fromThunks.deletedTodo.rejected, (state, action) => {
			state.updating = false;
		});
	},
});

export const { reducer, actions } = todosSlice;
