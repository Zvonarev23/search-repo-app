/* 
  Возвращает дату в формате дд.мм.гг
  `formatDate('2024-08-15T00:00:00Z')` возвращает `'15.08.2024'`
*/

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};
