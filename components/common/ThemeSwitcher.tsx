import { PropsWithChildren, useEffect, useState } from 'react';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    border: '1px solid #d6d6d6',
    borderRadius: '9999px',
    width: 'fit-content',
    padding: '3px',
    margin: '0 auto',
    marginBottom: '20px',
    gap: '6px',

    '& button': {
      width: '28px',
      height: '28px',
      border: 0,
      borderRadius: 'inherit',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      margin: 0,
      padding: 0,
      filter: 'contrast(0.2)',

      '&[data-active=true]': {
        backgroundColor: '#7c7c7c4d'
      },

      '&:hover': {
        filter: 'none'
      },

      '& svg': {
        fill: 'currentcolor',
        height: '16px'
      }
    }
  }
})

const AppThemeStorageKey = 'appTheme';

type ThemeButtonProps = {
  isActive: boolean
  onClick: () => void
}

function ThemeButton(props: PropsWithChildren<ThemeButtonProps>) {
  return (
    <button type="button" role="radio" data-active={ props.isActive } onClick={ props.onClick }>
      { props.children }
    </button>
  )
}

type ThemeName = 'system' | 'light' | 'dark';

export function ThemeSwitcher() {
  const styles = useStyles();
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('system');

  useEffect(() => {
    setCurrentTheme(localStorage.getItem(AppThemeStorageKey) as ThemeName ?? 'system');
  }, []);

  const changeTheme=(name: ThemeName) => {
    localStorage.setItem(AppThemeStorageKey, name);
    setCurrentTheme(name);

    const prefersDark = matchMedia('(prefers-color-scheme: dark)');
    const systemTheme: ThemeName = prefersDark.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-color-scheme', name === 'system' ? systemTheme : name);
  }

  return (
    <div role="radiogroup" className={ styles.container }>
      <ThemeButton isActive={ currentTheme === 'light' } onClick={ () => changeTheme('light') }>
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M12 9c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3m0-2c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"></path>
        </svg>
      </ThemeButton>

      <ThemeButton isActive={ currentTheme === 'system' } onClick={ () => changeTheme('system') }>
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"></path>
        </svg>
      </ThemeButton>

      <ThemeButton isActive={ currentTheme === 'dark' } onClick={ () => changeTheme('dark') }>
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M9.37 5.51c-.18.64-.27 1.31-.27 1.99 0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27C17.45 17.19 14.93 19 12 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49zM12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"></path>
        </svg>
      </ThemeButton>
    </div>
  );
}
