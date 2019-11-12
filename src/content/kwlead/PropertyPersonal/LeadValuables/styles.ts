import {CSSProperties} from 'ui/withStyles';
import {Theme} from '@material-ui/core';

export const styles = (theme: Theme): {[style: string]: CSSProperties} => ({
  helperImage: {
    height: 103,
    width: 199,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 50%',
    marginBottom: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 2,
  },
  containerDesktop: {
    [theme.breakpoints.up(800)]: {
      justifyContent: 'flex-start',
      marginTop: theme.spacing.unit * 12.75,
      ['& > p']: {
        marginBottom: theme.spacing.unit * 5,
      },
      ['& > h5']: {
        marginBottom: theme.spacing.unit * 1.25,
      },
    },
  },
  desktopForm: {
    ['& button p']: {
      fontWeight: 600,
    },
    [theme.breakpoints.up(800)]: {
      alignItems: 'center',
      ['& > div:nth-child(1)']: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        ['& > button']: {
          marginBottom: theme.spacing.unit * 3,
          marginTop: 0,
          width: '49%',
        },
      },
      ['& > div:nth-child(2)']: {
        width: '49%',
        marginTop: theme.spacing.unit * 5,
      },
    },
  },
  helperHeader: {
    fontWeight: 700,
    fontSize: '18px',
    [theme.breakpoints.up(800)]: {
      minWidth: '360px',
      fontSize: '24px',
    },
  },
  text: {
    marginBottom: theme.spacing.unit,
  },
  helperSubheading: {
    fontWeight: 400,
    lineHeight: '24px',
    fontSize: '16px',
    color: theme.palette.grey[900],
    marginBottom: theme.spacing.unit * 2,
    width: '100%',
  },
  dialogContainer: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(800)]: {
      paddingLeft: theme.spacing.unit * 10,
      paddingRight: theme.spacing.unit * 10,
    },
  },
  helperButton: {
    height: '44px',
    marginBottom: theme.spacing.unit * 2,
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
