import StarIcon from '@mui/icons-material/Star';
import { Box, Chip, Typography } from '@mui/material';

import { useAppSelector } from 'app/store/hooks';

import styles from './RepositoryDetails.module.sass';

export const RepositoryDetails = () => {
  const selectedRepository = useAppSelector(
    (state) => state.repositories.selectedRepository
  );

  if (!selectedRepository) {
    return (
      <Box
        className={styles.container}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Typography sx={{ color: '#4F4F4F' }}>Выберите репозиторий</Typography>
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      <h2 className={styles.title}>{selectedRepository.name}</h2>

      <Box className={styles.stats}>
        <Chip
          label={selectedRepository.primaryLanguage?.name ?? 'Не определен'}
          color="primary"
          sx={{ backgroundColor: '#2196F3' }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <StarIcon sx={{ color: '#FFB400', marginRight: 0.5 }} />
          <span>
            {selectedRepository.stargazers.totalCount.toLocaleString()}
          </span>
        </Box>
      </Box>
      {selectedRepository.description && (
        <p className={styles.description}>{selectedRepository.description}</p>
      )}
      <p>{selectedRepository.licenseInfo?.name ?? 'Нет лицензии'}</p>
    </Box>
  );
};
