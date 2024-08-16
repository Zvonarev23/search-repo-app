// Преобразует строку даты в временную метку (timestamp) в миллисекундах.

export const getTimestamp = (dateString: string) => new Date(dateString).getTime();

