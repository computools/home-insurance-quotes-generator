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
      marginTop: theme.spacing.unit * 9,
      justifyContent: 'center',
      maxWidth: 700,
      alignItems: 'center',
      minHeight: '425px',
    },
  } as CSSProperties,

  wrapper: {
    flex: 1,
    [theme.breakpoints.up(800)]: {
      alignItems: 'center',
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
    marginTop: 'auto',
    paddingTop: theme.spacing.unit * 2,
    [theme.breakpoints.up(800)]: {
      maxWidth: 405,
      width: '100%',
    },
  } as CSSProperties,

  helperRow: {
    color: theme.palette.grey['300'],
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    zIndex: 10,
  } as CSSProperties,

  helperTitle: {
    fontSize: '14px',
    fontWeight: 500,
    color: theme.palette.secondary.light,
  } as CSSProperties,

  link: {
    textDecoration: 'none',
  } as CSSProperties,
});
