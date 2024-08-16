import { Grid, Box } from '@mui/material';

import { RepositoryDetails } from 'components/RepositoryDetails';
import { RepositoryTable } from 'components/RepositoryTable';
import { Preloader } from 'components/Preloader';
import { RepositoryTableRowData } from 'utils/types';
import { useAppSelector } from 'app/store/hooks';

import styles from './Home.module.sass';

export const Home = () => {
  const loading = useAppSelector((state) => state.repositories.loading);
  const error = useAppSelector((state) => state.repositories.error);
  const repositories = useAppSelector(
    (state) => state.repositories.repositories
  );

  // Оптимизация данных для таблицы, оставляем только нужные поля
  // Если в ответе от сервера нет данных о Языке, то отображаем "Не определен"

  const repositoriesTableData: RepositoryTableRowData[] = repositories.map(
    ({ id, name, primaryLanguage, forks, stargazers, updatedAt }) => ({
      id,
      name,
      primaryLanguage: primaryLanguage?.name ?? 'Не определен',
      forks: forks.totalCount,
      stargazers: stargazers.totalCount,
      updatedAt,
    })
  );

  return (
    <Box className={styles.container}>
      {repositories.length === 0 && loading === 'idle' && (
        <h1 className={styles.title}>Добро пожаловать</h1>
      )}
      {repositories.length === 0 && loading === 'succeeded' && (
        <h1 className={styles.title}>Ничего не найдено</h1>
      )}
      {loading === 'pending' && <Preloader />}
      {loading === 'failed' && <h1 className={styles.title}>{error}</h1>}
      {loading === 'succeeded' && repositories.length > 0 && (
        <Grid
          container
          sx={{ height: '100%' }}
        >
          <Grid
            item
            xs={8}
          >
            <RepositoryTable rows={repositoriesTableData} />
          </Grid>
          <Grid
            item
            xs={4}
          >
            <RepositoryDetails />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
