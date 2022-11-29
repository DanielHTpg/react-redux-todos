import { createDraftSafeSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

const selectTodosState = (rootState: RootState) => rootState.todos;

export const selectItems = createDraftSafeSelector(selectTodosState, (state) => state.items);
export const selectLoaded = createDraftSafeSelector(selectTodosState, (state) => state.loaded);
export const selectNewTodoText = createDraftSafeSelector(selectTodosState, (state) => state.newTodoText);
export const selectUpdating = createDraftSafeSelector(selectTodosState, (state) => state.updating);
