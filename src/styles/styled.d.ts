import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      text: {
        primary: string;
        secondary: string;
        tertiary: string;
        inverse: string;
      };
      surface: {
        base: string;
        muted: string;
        raised: string;
      };
      border: {
        default: string;
      };
      accent: {
        default: string;
        hover: string;
      };
    };
    fonts: {
      primary: string;
      secondary: string;
      mono: string;
    };
    space: {
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
      6: string;
      7: string;
      8: string;
    };
    radius: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
    };
    motion: {
      instant: string;
      fast: string;
      normal: string;
      slow: string;
    };
    shadows: {
      1: string;
      2: string;
      3: string;
      4: string;
    };
  }
}
