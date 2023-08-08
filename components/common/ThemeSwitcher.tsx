import { DesktopIcon, MoonIcon, SunIcon } from 'components/icons';
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
        fill: 'var(--text-primary)',
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
        <SunIcon />
      </ThemeButton>
      <ThemeButton isActive={ currentTheme === 'system' } onClick={ () => changeTheme('system') }>
        <DesktopIcon />
      </ThemeButton>
      <ThemeButton isActive={ currentTheme === 'dark' } onClick={ () => changeTheme('dark') }>
        <MoonIcon />
      </ThemeButton>
    </div>
  );
}
