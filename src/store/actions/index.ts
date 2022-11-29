import { actions as todosActions } from '../slices/TodoSlice';

export const { updateNewTodoText } = todosActions;
export * from '../thunks/TodoThunks';
