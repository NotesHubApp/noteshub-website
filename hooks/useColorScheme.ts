import { useEffect, useState } from 'react';

const colorSchemeAttrName = 'data-color-scheme';

type ColorScheme = 'light' | 'dark'

export function useColorScheme() {
  const [colorScheme, setColorScheme] = useState<ColorScheme | null>();

  useEffect(() => {
    const targetNode = document.documentElement;
    const config = { attributes: true };

    // Callback function to execute when mutations are observed
    const callback: MutationCallback = (mutationList, observer) => {
      for (const mutation of mutationList) {
        if (mutation.type === 'attributes' && mutation.attributeName === colorSchemeAttrName) {
          setColorScheme(document.documentElement.getAttribute(colorSchemeAttrName) as ColorScheme);
        }
      }
    };

    setColorScheme(document.documentElement.getAttribute(colorSchemeAttrName) as ColorScheme);

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);

    return () => observer.disconnect();
  }, []);

  return colorScheme;
}
