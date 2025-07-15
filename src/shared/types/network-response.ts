export type DataType1 = {
	id: number;
	name: string;
};

export type DataType2 = {
	id: string;
	description: string;
};

export type ServiceResponseData<T> = {
	success: boolean;
	message?: string;
	data?: T;
};
