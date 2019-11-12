import {CSSProperties} from 'ui/withStyles';
import {Theme} from '@material-ui/core';

export const styles = (theme: Theme): {[style: string]: CSSProperties} => ({
  containerFix: {
    flex: 1,
    [theme.breakpoints.up(800)]: {
      flex: 0,
      justifyContent: 'space-evenly',
      maxWidth: 680,
      alignItems: 'center',
      minHeight: '385px',
    },
  },

  formFix: {
    ['& > div:nth-child(1) p']: {
      fontWeight: 600,
    },
    [theme.breakpoints.up(800)]: {
      alignItems: 'center',
      ['& > div:nth-child(1)']: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        ['& > div']: {
          width: '49%',
        },
      },
      ['& > div:nth-child(2)']: {
        width: '49%',
        marginTop: theme.spacing.unit * 4,
      },
    },
  },

  formFixWithUnit: {
    [theme.breakpoints.up(800)]: {
      ['& > div:nth-child(1)']: {
        ['& > div:first-of-type']: {
          marginRight: '2%',
        },
      },
    },
  },

  formFixWithoutUnit: {
    [theme.breakpoints.up(800)]: {
      ['& > div:nth-child(1)']: {
        ['& > div:first-of-type']: {
          marginLeft: '2%',
        },
      },
    },
  },

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
    maxWidth: '440px',
    lineHeight: '28px',
    color: theme.palette.grey[900],
    marginBottom: theme.spacing.unit * 2,
    '@media (max-width: 900px)': {
      lineHeight: '24px',
    },
  },

  dialogContainer: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },

  link: {
    textDecoration: 'none',
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
  errorForm: {
    width: '100%',
  },
  disabledAlertButton: {
    opacity: 0.25,
  },
  renterTitle: {
    fontSize: 24,
    width: '400px',
    fontWeight: 700,
    '@media (max-width: 900px)': {
      marginBottom: theme.spacing.unit * 1.5,
      textAlign: 'left',
      width: '232px',
      lineHeight: 'inherit',
    },
  },
  dialogRenterContainer: {
    padding: '0 50px',
    '@media (max-width: 900px)': {
      padding: '0 34px',
    },
  },
  helperRenterButton: {
    marginTop: theme.spacing.unit * 2,
    minWidth: '400px',
    '@media (max-width: 768px)': {
      minWidth: '290px',
    },
  },
  helperRenterForm: {
    width: '100%',
    maxWidth: '388px',
  },
  closeIcon: {
    cursor: 'pointer',
  },
  closeIconContainer: {
    width: '94%',
  },
  renterImage: {
    [theme.breakpoints.up(1280)]: {
      width: '4vw',
      height: '6vh',
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 3,
      marginRight: 0,
    },
    width: '5.5vh',
    height: '8vh',
    marginRight: theme.spacing.unit * 2.2,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },
  helperRenterButtonDecline: {
    marginTop: theme.spacing.unit * 2,
  },
  renterTitleContainer: {
    flexDirection: 'column',
    '@media (max-width: 900px)': {
      flexDirection: 'row',
    },
  },
  renterImageContainer: {
    justifyContent: 'center',
  },
  helperRenterSubheading: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '28px',
    color: theme.palette.grey[900],
    marginBottom: theme.spacing.unit * 2,
    '@media (max-width: 900px)': {
      textAlign: 'left',
      lineHeight: '24px',
    },
  },

  propertyContainer: {
    [theme.breakpoints.up(800)]: {
      width: '49%',
      ['& > div:first-of-type']: {
        width: '100%',
        marginRight: theme.spacing.unit * 1.35,
      },
    },
    ['& input[type="string"]']: {
      fontWeight: 600,
      height: 52,
    },
  },

  propertyContainerWithUnit: {
    ['& input']: {
      fontWeight: 600,
    },
    [theme.breakpoints.up(800)]: {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-start',
      ['& > div:first-of-type']: {
        width: '49%',
        marginRight: theme.spacing.unit * 1.35,
      },
      ['& > div:last-of-type']: {
        width: '31%',
      },
    },
  },
});
