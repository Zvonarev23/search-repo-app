import { Link } from 'react-router-dom';

import styles from './NotFound.module.sass';

export const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Упс! Страница не найдена.</p>
      <Link
        to="/"
        className={styles.homeLink}
      >
        Вернуться на главную
      </Link>
    </div>
  );
};
