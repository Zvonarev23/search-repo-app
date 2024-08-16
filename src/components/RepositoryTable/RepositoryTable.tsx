import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
} from '@mui/material';

import { useAppDispatch } from 'app/store/hooks';
import { selectRepository } from 'app/store/reducers/repositoriesSlice';
import { RepositoryTableRowData } from 'utils/types';
import { formatDate } from 'utils/formatDate';
import { getTimestamp } from 'utils/getTimestamp';

import styles from './RepositoryTable.module.sass';

// Тип описывающий структуру столбцов таблицы

type Columns = {
  id: keyof RepositoryTableRowData;
  label: string;
  isSorting?: boolean;
};

// Массив столбцов для таблицы репозиториев

const columns: Columns[] = [
  { id: 'name', label: 'Название' },
  { id: 'primaryLanguage', label: 'Язык' },
  { id: 'forks', label: 'Число форков', isSorting: true },
  { id: 'stargazers', label: 'Число звезд', isSorting: true },
  { id: 'updatedAt', label: 'Дата обновления', isSorting: true },
];

// Пропсы для компонента RepositoryTable

type RepositoryTableProps = {
  rows: RepositoryTableRowData[];
};

/* 
  Функция сортировки данных на основе выбранных критериев
  Вынес за пределы компонента, чтобы она не создавалась при каждом рендере
*/

const sortRepositories = (
  rows: RepositoryTableRowData[],
  sortBy: keyof RepositoryTableRowData,
  sortDirection: 'asc' | 'desc'
): RepositoryTableRowData[] => {
  return [...rows].sort((a, b) => {
    // Если происходит сортировка по дате
    if (sortBy === 'updatedAt') {
      const aTime = getTimestamp(a.updatedAt);
      const bTime = getTimestamp(b.updatedAt);
      return sortDirection === 'asc' ? aTime - bTime : bTime - aTime;
    }

    // сортировка по количеству форков и звезд
    const aValue = a[sortBy] as number;
    const bValue = b[sortBy] as number;
    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
  });
};

export const RepositoryTable = ({ rows }: RepositoryTableProps) => {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortBy, setSortBy] = useState<keyof RepositoryTableRowData>('forks');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortedRows, setSortedRows] = useState<RepositoryTableRowData[]>(rows);

  const dispatch = useAppDispatch();

  // Обработчик клика по строке таблицы для выбора репозитория

  const handleRowClick = (id: string) => {
    dispatch(selectRepository(id));
  };

  // Обработчик запуска сортировки столбца

  const handleRequestSort = (property: keyof RepositoryTableRowData) => {
    const isAsc = sortBy === property && sortDirection === 'asc';
    const newDirection = isAsc ? 'desc' : 'asc';
    setSortDirection(newDirection);
    setSortBy(property);
    const sorted = sortRepositories(rows, property, newDirection);
    setSortedRows(sorted);
  };

  // Обработчик изменения страницы при пагинации.

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Обработчик изменения количества строк на странице

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Отображаемые строки на текущей странице после сортировки

  const displayedRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper
      sx={{ boxShadow: 'none' }}
      className={styles.paper}
    >
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  sortDirection={sortBy === column.id ? sortDirection : false}
                  className={styles.cell}
                >
                  {column.isSorting ? (
                    <TableSortLabel
                      active={sortBy === column.id}
                      direction={sortBy === column.id ? sortDirection : 'asc'}
                      onClick={() =>
                        handleRequestSort(
                          column.id as keyof RepositoryTableRowData
                        )
                      }
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row) => (
              <TableRow
                hover
                key={row.id}
                onClick={() => handleRowClick(row.id)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell className={styles.cell}>{row.name}</TableCell>
                <TableCell className={styles.cell}>
                  {row.primaryLanguage}
                </TableCell>
                <TableCell className={styles.cell}>{row.forks}</TableCell>
                <TableCell className={styles.cell}>{row.stargazers}</TableCell>
                <TableCell className={styles.cell}>
                  {formatDate(row.updatedAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
