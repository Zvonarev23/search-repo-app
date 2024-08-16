import { Outlet } from 'react-router-dom'
import { Header } from 'components/Header' 

import styles from './Layout.module.sass'

export const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet/>
      </main>
      <footer className={styles.footer}></footer>
    </>
  )
}
