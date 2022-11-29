import { configureStore } from '@reduxjs/toolkit';

import * as todosSlice from './slices/TodoSlice';

export const store = configureStore({
	devTools: {
		name: 'React-Redux-Todos',
	},
	reducer: {
		todos: todosSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
