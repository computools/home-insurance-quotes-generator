import {CSSProperties} from 'ui/withStyles';
import {Theme} from '@material-ui/core';

export const styles = (theme: Theme) => ({
  container: {
    marginTop: 21,
    zIndex: 1,
    flex: 1,
    [theme.breakpoints.up(800)]: {
      textAlign: 'center',
      flex: 0,
      marginTop: theme.spacing.unit * 14.125,
      justifyContent: 'space-evenly',
      maxWidth: 700,
      alignItems: 'center',
      minHeight: '385px',
    },
    '& > div': {
      [theme.breakpoints.up(800)]: {
        width: '100%',
      },
    },
  } as CSSProperties,

  wrapper: {
    flex: 1,
    '& form': {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      [theme.breakpoints.up(800)]: {
        width: '100%',
      },
    },
    [theme.breakpoints.up(800)]: {
      alignItems: 'center',
      ['& form']: {
        ['& > div:nth-child(2) > button']: {
          maxWidth: '327px',
          height: '40px',
        },
      },
    },
  } as CSSProperties,

  title: {
    fontSize: 32,
    lineHeight: '30px',
    marginBottom: theme.spacing.unit * 2,
    '@media (max-width: 900px)': {
      fontSize: 24,
    },
  } as CSSProperties,

  description: {
    fontSize: 20,
    color: theme.palette.grey['900'],
    marginBottom: theme.spacing.unit * 1.5,
    '@media (max-width: 900px)': {
      fontSize: 16,
    },
  } as CSSProperties,

  buttonContainer: {
    paddingTop: theme.spacing.unit * 2,
    [theme.breakpoints.up(800)]: {
      maxWidth: 405,
      width: '100%',
    },
  } as CSSProperties,

  helperDesk: {
    display: 'block',
    justifyContent: 'center',
    '@media (max-width: 768px)': {
      display: 'none',
    },
  } as CSSProperties,

  helperMobile: {
    display: 'none',
    '@media (max-width: 768px)': {
      display: 'block',
    },
  } as CSSProperties,

  sublink: {
    fontSize: 20,
    '@media (max-width: 900px)': {
      fontSize: 16,
    },
  } as CSSProperties,

  sublinkDescr: {
    fontWeight: 600,
    display: 'inline',
  } as CSSProperties,

  helperRow: {
    color: theme.palette.grey['300'],
    justifyContent: 'center',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    zIndex: 10,
    '& p': {
      cursor: 'pointer',
    },
    '@media (max-width: 768px)': {
      justifyContent: 'flex-start',
    },
  } as CSSProperties,

  helperTitle: {
    fontSize: '14px',
    fontWeight: 500,
    color: theme.palette.secondary.light,
  } as CSSProperties,

  link: {
    textDecoration: 'none',
  } as CSSProperties,
  disabledButton: {
    opacity: 0.4,
  } as CSSProperties,
});
