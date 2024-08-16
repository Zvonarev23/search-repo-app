import styles from './Preloader.module.sass'

export const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <div className={styles.spinner}></div>
    </div>
  );
};
