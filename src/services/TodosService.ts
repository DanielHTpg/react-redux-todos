import { ITodoItem } from '../interfaces';

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(() => resolve(), ms));

export class TodosService {
	async readTodos(): Promise<ITodoItem[]> {
		const response = await fetch('http://localhost:3200/todos', {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const json = await response.json();

		await delay(500);

		return json as ITodoItem[];
	}

	async updateTodo(todo: ITodoItem): Promise<ITodoItem> {
		const response = await fetch(`http://localhost:3200/todos/${todo.id}`, {
			method: 'PUT',
			body: JSON.stringify(todo),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const json = await response.json();

		await delay(100);

		return json as ITodoItem;
	}

	async createTodo(todo: ITodoItem): Promise<ITodoItem> {
		const response = await fetch(`http://localhost:3200/todos`, {
			method: 'POST',
			body: JSON.stringify(todo),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const json = await response.json();

		await delay(100);

		return json as ITodoItem;
	}

	async deleteTodo(todo: ITodoItem): Promise<ITodoItem> {
		await fetch(`http://localhost:3200/todos/${todo.id}`, {
			method: 'DELETE',
		});

		await delay(100);

		return todo;
	}
}
