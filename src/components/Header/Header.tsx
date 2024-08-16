import { AppBar, Toolbar, TextField, Box, Button } from '@mui/material';
import { useState } from 'react';

import { fetchRepositoriesByQuery } from 'app/store/reducers/repositoriesSlice';
import { useAppDispatch } from 'app/store/hooks';

import styles from './Header.module.sass';

export const Header = () => {
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();

  // Обработчик поиска, который отправляет action для получения репозиториев

  const handleSearch = () => {
    dispatch(fetchRepositoriesByQuery(query));
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: '#00838F', boxShadow: 'none' }}
    >
      <Toolbar sx={{ height: 80 }}>
        <Box
          component="form"
          display="flex"
          gap={1}
          alignItems="center"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <TextField
            className={styles.input}
            variant="outlined"
            size="small"
            placeholder="Введите поисковый запрос"
            onChange={(e) => setQuery(e.target.value)}
          />

          <Button
            className={styles.button}
            sx={{ backgroundColor: '#2196F3', fontSize: 16 }}
            variant="contained"
            type="submit"
          >
            Искать
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
