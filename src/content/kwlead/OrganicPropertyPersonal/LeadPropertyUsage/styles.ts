import {CSSProperties} from 'ui/withStyles';
import {Theme} from '@material-ui/core';

export const styles = (theme: Theme): {[style: string]: CSSProperties} => ({
  helperImage: {
    height: 60,
    marginBottom: theme.spacing.unit,
  },

  text: {
    marginBottom: theme.spacing.unit * 2,
  },

  title: {
    fontSize: 30,
  },

  helperSubheading: {
    fontWeight: 400,
    lineHeight: '24px',
    color: theme.palette.grey[900],
    marginBottom: theme.spacing.unit * 2,
  },

  dialogContainer: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },

  link: {
    textDecoration: 'none',
  },
  buttonContainer: {
    ['& p']: {
      fontWeight: 600,
    },
    [theme.breakpoints.up(800)]: {
      marginTop: theme.spacing.unit * 1.25,
      justifyContent: 'space-evenly',
      flexDirection: 'row',
      alignItems: 'center',
      textAlign: 'left',
      width: '100%',
      alignContent: 'stretch',
      ['& > button']: {
        width: '47.7%',
        flexWrap: 'wrap',
        margin: theme.spacing.unit,
      },
    },
  },
  icon: {
    position: 'absolute',
    background: 'transparent',
    backgroundRepeat: 'no-repeat',
  },
  clouds: {
    position: 'fixed',
    left: '100%',
    top: '27%',
    width: '100%',
    transform: 'translate(-100%, -30%)',
    zIndex: -5,
  },
});
