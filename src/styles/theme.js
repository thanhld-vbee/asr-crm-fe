import { createTheme } from '@mui/material/styles';
import {
  COLOR,
  GRADIENT_COLOR,
  CONTAINED_BUTTON_COLOR,
  OUTLINED_BUTTON_COLOR,
  TEXT_BUTTON_COLOR,
  GRADIENT_BUTTON_COLOR,
} from './color';

const defaultTheme = createTheme({});

const theme = createTheme({
  palette: {
    primary: {
      main: COLOR.primary,
    },
    secondary: {
      main: COLOR.secondary,
    },
    error: {
      main: COLOR.error,
    },
    warning: {
      main: COLOR.warning,
    },
    info: {
      main: COLOR.info,
    },
    success: {
      main: COLOR.success,
    },
    text: {
      primary: COLOR.text,
    },
    divider: COLOR.divider,
    background: {
      default: COLOR.background,
    },
  },
  shape: {
    borderRadius: 5,
  },
  typography: {
    fontFamily: '"SF Pro Display", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          padding: '10px 22px',
        },
        containedPrimary: {
          color: COLOR.white,
          '&:hover': {
            backgroundColor: CONTAINED_BUTTON_COLOR.primary.hover,
          },
          '&:active': {
            backgroundColor: CONTAINED_BUTTON_COLOR.primary.active,
          },
          '&:focus': {
            backgroundColor: CONTAINED_BUTTON_COLOR.primary.focus,
          },
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: CONTAINED_BUTTON_COLOR.secondary.hover,
          },
          '&:active': {
            backgroundColor: CONTAINED_BUTTON_COLOR.secondary.active,
          },
          '&:focus': {
            backgroundColor: CONTAINED_BUTTON_COLOR.secondary.focus,
          },
        },
        outlinedPrimary: {
          '&:hover': {
            backgroundColor: OUTLINED_BUTTON_COLOR.primary.hover,
          },
          '&:active': {
            backgroundColor: OUTLINED_BUTTON_COLOR.primary.active,
          },
          '&:focus': {
            backgroundColor: OUTLINED_BUTTON_COLOR.primary.focus,
          },
        },
        outlinedSecondary: {
          '&:hover': {
            backgroundColor: OUTLINED_BUTTON_COLOR.secondary.hover,
          },
          '&:active': {
            backgroundColor: OUTLINED_BUTTON_COLOR.secondary.active,
          },
          '&:focus': {
            backgroundColor: OUTLINED_BUTTON_COLOR.secondary.focus,
          },
        },
        textPrimary: {
          '&:hover': {
            backgroundColor: TEXT_BUTTON_COLOR.primary.hover,
          },
          '&:active': {
            backgroundColor: TEXT_BUTTON_COLOR.primary.active,
          },
          '&:focus': {
            backgroundColor: TEXT_BUTTON_COLOR.primary.focus,
          },
        },
        textSecondary: {
          '&:hover': {
            backgroundColor: TEXT_BUTTON_COLOR.secondary.hover,
          },
          '&:active': {
            backgroundColor: TEXT_BUTTON_COLOR.secondary.active,
          },
          '&:focus': {
            backgroundColor: TEXT_BUTTON_COLOR.secondary.focus,
          },
        },
      },
      variants: [
        {
          props: { variant: 'contained', color: 'success' },
          style: {
            '&:hover': {
              background: CONTAINED_BUTTON_COLOR.success.hover,
            },
            '&:active': {
              background: CONTAINED_BUTTON_COLOR.success.active,
            },
            '&:focus': {
              background: CONTAINED_BUTTON_COLOR.success.focus,
            },
          },
        },
        {
          props: { variant: 'contained', color: 'error' },
          style: {
            color: COLOR.white,
            '&:hover': {
              background: CONTAINED_BUTTON_COLOR.error.hover,
            },
            '&:active': {
              background: CONTAINED_BUTTON_COLOR.error.active,
            },
            '&:focus': {
              background: CONTAINED_BUTTON_COLOR.error.focus,
            },
          },
        },
        {
          props: { variant: 'contained', color: 'warning' },
          style: {
            '&:hover': {
              background: CONTAINED_BUTTON_COLOR.warning.hover,
            },
            '&:active': {
              background: CONTAINED_BUTTON_COLOR.warning.active,
            },
            '&:focus': {
              background: CONTAINED_BUTTON_COLOR.warning.focus,
            },
          },
        },
        {
          props: { variant: 'contained', color: 'info' },
          style: {
            '&:hover': {
              background: CONTAINED_BUTTON_COLOR.info.hover,
            },
            '&:active': {
              background: CONTAINED_BUTTON_COLOR.info.active,
            },
            '&:focus': {
              background: CONTAINED_BUTTON_COLOR.info.focus,
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'success' },
          style: {
            '&:hover': {
              background: OUTLINED_BUTTON_COLOR.success.hover,
            },
            '&:active': {
              background: OUTLINED_BUTTON_COLOR.success.active,
            },
            '&:focus': {
              background: OUTLINED_BUTTON_COLOR.success.focus,
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'error' },
          style: {
            '&:hover': {
              background: OUTLINED_BUTTON_COLOR.error.hover,
            },
            '&:active': {
              background: OUTLINED_BUTTON_COLOR.error.active,
            },
            '&:focus': {
              background: OUTLINED_BUTTON_COLOR.error.focus,
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'warning' },
          style: {
            '&:hover': {
              background: OUTLINED_BUTTON_COLOR.warning.hover,
            },
            '&:active': {
              background: OUTLINED_BUTTON_COLOR.warning.active,
            },
            '&:focus': {
              background: OUTLINED_BUTTON_COLOR.warning.focus,
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'info' },
          style: {
            '&:hover': {
              background: OUTLINED_BUTTON_COLOR.info.hover,
            },
            '&:active': {
              background: OUTLINED_BUTTON_COLOR.info.active,
            },
            '&:focus': {
              background: OUTLINED_BUTTON_COLOR.info.focus,
            },
          },
        },
        {
          props: { variant: 'text', color: 'success' },
          style: {
            '&:hover': {
              background: TEXT_BUTTON_COLOR.success.hover,
            },
            '&:active': {
              background: TEXT_BUTTON_COLOR.success.active,
            },
            '&:focus': {
              background: TEXT_BUTTON_COLOR.success.focus,
            },
          },
        },
        {
          props: { variant: 'text', color: 'error' },
          style: {
            '&:hover': {
              background: TEXT_BUTTON_COLOR.error.hover,
            },
            '&:active': {
              background: TEXT_BUTTON_COLOR.error.active,
            },
            '&:focus': {
              background: TEXT_BUTTON_COLOR.error.focus,
            },
          },
        },
        {
          props: { variant: 'text', color: 'warning' },
          style: {
            '&:hover': {
              background: TEXT_BUTTON_COLOR.warning.hover,
            },
            '&:active': {
              background: TEXT_BUTTON_COLOR.warning.active,
            },
            '&:focus': {
              background: TEXT_BUTTON_COLOR.warning.focus,
            },
          },
        },
        {
          props: { variant: 'text', color: 'info' },
          style: {
            '&:hover': {
              background: TEXT_BUTTON_COLOR.info.hover,
            },
            '&:active': {
              background: TEXT_BUTTON_COLOR.info.active,
            },
            '&:focus': {
              background: TEXT_BUTTON_COLOR.info.focus,
            },
          },
        },
        {
          props: { variant: 'gradient' },
          style: {
            '&:hover': {
              boxShadow: defaultTheme.shadows[4],
            },
          },
        },
        {
          props: { variant: 'gradient', color: 'primary' },
          style: {
            color: COLOR.white,
            background: GRADIENT_COLOR.primary,
            '&:hover': {
              background: GRADIENT_BUTTON_COLOR.primary.hover,
            },
            '&:active': {
              background: GRADIENT_BUTTON_COLOR.primary.active,
            },
            '&:focus': {
              background: GRADIENT_BUTTON_COLOR.primary.focus,
            },
          },
        },
        {
          props: { variant: 'gradient', color: 'secondary' },
          style: {
            color: COLOR.white,
            background: GRADIENT_COLOR.secondary,
            '&:hover': {
              background: GRADIENT_BUTTON_COLOR.secondary.hover,
            },
            '&:active': {
              background: GRADIENT_BUTTON_COLOR.secondary.active,
            },
            '&:focus': {
              background: GRADIENT_BUTTON_COLOR.secondary.focus,
            },
          },
        },
        {
          props: { variant: 'gradient', color: 'success' },
          style: {
            background: GRADIENT_COLOR.success,
            '&:hover': {
              background: GRADIENT_BUTTON_COLOR.success.hover,
            },
            '&:active': {
              background: GRADIENT_BUTTON_COLOR.success.active,
            },
            '&:focus': {
              background: GRADIENT_BUTTON_COLOR.success.focus,
            },
          },
        },
        {
          props: { variant: 'gradient', color: 'error' },
          style: {
            color: COLOR.white,
            background: GRADIENT_COLOR.error,
            '&:hover': {
              background: GRADIENT_BUTTON_COLOR.error.hover,
            },
            '&:active': {
              background: GRADIENT_BUTTON_COLOR.error.active,
            },
            '&:focus': {
              background: GRADIENT_BUTTON_COLOR.error.focus,
            },
          },
        },
        {
          props: { variant: 'gradient', color: 'warning' },
          style: {
            background: GRADIENT_COLOR.warning,
            '&:hover': {
              background: GRADIENT_BUTTON_COLOR.warning.hover,
            },
            '&:active': {
              background: GRADIENT_BUTTON_COLOR.warning.active,
            },
            '&:focus': {
              background: GRADIENT_BUTTON_COLOR.warning.focus,
            },
          },
        },
        {
          props: { variant: 'gradient', color: 'info' },
          style: {
            background: GRADIENT_COLOR.info,
            '&:hover': {
              background: GRADIENT_BUTTON_COLOR.info.hover,
            },
            '&:active': {
              background: GRADIENT_BUTTON_COLOR.info.active,
            },
            '&:focus': {
              background: GRADIENT_BUTTON_COLOR.info.focus,
            },
          },
        },
      ],
    },
  },
});

export default theme;
