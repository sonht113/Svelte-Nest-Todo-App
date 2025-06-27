export type TaskType = {
	_id: string;
	title: string;
	description: string;
	completed: boolean;
	createdAt: string;
	updatedAt: string;
};

export type CreateTaskDto = {
	title: string;
	description: string;
};
