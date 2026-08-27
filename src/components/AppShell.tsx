import { Outlet } from 'react-router-dom'
import styles from './AppShell.module.css'

/** Shared page chrome for routed views. */
export default function AppShell() {
  return (
    <div className={styles.shell}>
      <Outlet />
    </div>
  )
}
