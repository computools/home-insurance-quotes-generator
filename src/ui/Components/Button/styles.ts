import {CSSProperties} from 'ui/withStyles';
import {Theme} from '@material-ui/core';

export const styles = (theme: Theme) => ({
  default: {
    height: 48,
    width: '100%',
    '& p': {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    outline: 'none',
  } as CSSProperties,

  primary: {
    backgroundImage: 'linear-gradient(to right, #68d0cb 0%, #1ca1d4 100%)',
    height: 56,
  } as CSSProperties,

  grayOutlined: {
    backgroundColor: '#fff',
    backgroundImage: 'none',
    border: '2px solid #CACACB',
    '&:hover': {
      backgroundColor: '#fff',
      backgroundImage: 'none',
    },
    '& p': {
      color: '#93929B !important',
    },
  } as CSSProperties,

  mobileButtonLabel: {
    [theme.breakpoints.down(800)]: {
      display: 'block',
    },
  } as CSSProperties,

  noMobileButtonLabel: {
    [theme.breakpoints.down(800)]: {
      display: 'none',
    },
  } as CSSProperties,

  deskButtonLabel: {
    [theme.breakpoints.up(800)]: {
      display: 'block',
    },
  } as CSSProperties,

  noDeskButtonLabel: {
    [theme.breakpoints.up(800)]: {
      display: 'none',
    },
  } as CSSProperties,

  gray: {
    backgroundColor: '#CACACB',
    backgroundImage: 'none',
    fontSize: 14,
    '& p': {
      color: '#343342',
    },
    '&:hover': {
      backgroundImage: 'none',
      backgroundColor: '#CACACB',
    },
  } as CSSProperties,

  gradientOutlined: {
    backgroundColor: '#fff',
    '&: hover': {
      backgroundImage: 'linear-gradient(to right, #68d0cb 0%, #1ca1d4 100%), radial-gradient(circle at top left, #68d0cb, #1ca1d4)',
      backgroundColor: '#fff',
    },
    '& p': {
      color: '#1FA3D4',
    },
  } as CSSProperties,

  subLabel: {
    '& p': {
      fontSize: 11,
    },
  } as CSSProperties,

  link: {
    textDecoration: 'none',
  } as CSSProperties,

  withSubLabel: {
    padding: 0,
    display: 'block',
  } as CSSProperties,

  icon: {
    width: 55,
    marginRight: 16,
    maxHeight: 49,
  } as CSSProperties,

  answer: {
    background: '#fff',
    marginTop: 8,
    border: '2px solid #cacacb',
    borderRadius: 6,
    height: 56,
    '& span': {
      display: 'flex',
      justifyContent: 'space-between',
    },
    '& p': {
      color: '#343342',
      fontWeight: 400,
    },
    '&:hover': {
      background: '#fff',
    },
  } as CSSProperties,

  buttonLoadingState: {
    display: 'flex',
    justifyContent: 'center',
    ['& i']: {
      animationName: 'blink',
      animationDuration: '1.4s',
      animationIterationCount: 'infinite',
      animationFillMode: 'both',
      background: 'white',
      height: 2,
      width: 2,
      borderRadius: '50%',
      marginRight: 8,
    },
    ['& i:nth-child(2)']: {
      animationDelay: '.2s',
    },
    ['& i:nth-child(3)']: {
      animationDelay: '.4s',
    },
    ['& i:nth-child(4)']: {
      animationDelay: '.6s',
    },
  } as CSSProperties,
  '@keyframes blink': {
    '0%': {
      opacity: 0.2,
      width: 5,
      height: 5,
    },
    '20%': {
      opacity: 1,
      width: 11,
      height: 11,
    },
    '100%': {
      opacity: 0.2,
      width: 5,
      height: 5,
    },
  } as CSSProperties,

  labelWithIconContainer: {
    display: 'flex',
    alignItems: 'center',
  } as CSSProperties,

  withIcon: {
    height: 64,
    padding: '0px 8px',
    textAlign: 'left',
  } as CSSProperties,
});
