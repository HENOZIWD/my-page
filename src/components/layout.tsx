import { createContext, useContext, useEffect, useState } from 'react';
import styles from '@/styles/Layout.module.css'
import Image from 'next/image';
import Link from 'next/link';

const ThemeContext = createContext<boolean>(false);

export default function Layout({ children }: { children: React.ReactNode }) {

  const [isNightMode, setIsDarkMode] = useState<boolean>(false);

  const toggleNightMode = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();

    localStorage.setItem("theme", isNightMode ? "day" : "night");
    setIsDarkMode(!isNightMode);
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDarkMode(savedTheme === "night" ? true : false);
  }, [])

  return (
    <ThemeContext.Provider value={isNightMode}>
      <div className={isNightMode ? styles.layoutNight : styles.layoutDay}>
        <div className={styles.layoutHeader}>
          <Link
            className={styles.layoutTitle}
            style={{ color: isNightMode ? "white" : "black" }}
            href='/'
          >
            Like a Diamond
          </Link>
          <Image
            role="button" // ARIA role
            className={styles.toggleButton}
            src={isNightMode ? "/night.png" : "/day.png"}
            alt="day"
            width={50}
            height={50}
            onClick={toggleNightMode}
          />
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useThemeContext() {

  return useContext(ThemeContext);
}