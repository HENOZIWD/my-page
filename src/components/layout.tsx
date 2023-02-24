import { createContext, useContext, useEffect, useState } from 'react';
import styles from '@/styles/Layout.module.css'

const ThemeContext = createContext<boolean>(false);

export default function Layout({ children }: { children: React.ReactNode }) {

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    localStorage.setItem("theme", isDarkMode ? "white" : "dark");
    setIsDarkMode(!isDarkMode);
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDarkMode(savedTheme === "dark" ? true : false);
  }, [])

  return (
    <ThemeContext.Provider value={isDarkMode}>
      <div className={isDarkMode ? styles.layoutDark : styles.layoutWhite}>
        <button type="button" onClick={toggleDarkMode}>
          Dark Mode (Test)
        </button>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useThemeContext() {

  return useContext(ThemeContext);
}