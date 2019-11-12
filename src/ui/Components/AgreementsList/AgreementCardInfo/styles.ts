import {CSSProperties} from 'ui/withStyles';
import {Theme} from '@material-ui/core';

export const styles = (theme: Theme) => ({
  title: {
    marginBottom: theme.spacing.unit * 1.25,
    fontWeight: 500,
  } as CSSProperties,
  agreementCardItem: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 24px 32px',
    marginBottom: 8,
    boxShadow: 'none',
    '& a': {
      color: '#1CA1D4',
    },
    '@media (max-width: 768px)': {
      paddingBottom: 16,
    },
  } as CSSProperties,
  coverageCollapseLink: {
    display: 'flex',
    alignItems: 'center',
    width: 'max-content',
    textAlign: 'left',
    border: 'none',
    backgroundColor: '#fff',
    padding: 0,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1CA1D4',
    cursor: 'pointer',
  } as CSSProperties,
  expandMoreIcon: {
    fontSize: 18,
    marginTop: 1,
    color: '#1CA1D4',
  } as CSSProperties,
  expandMoreIconClose: {
    marginTop: 2,
    fontSize: 18,
    color: '#1CA1D4',
    transform: 'rotate(180deg)',
  } as CSSProperties,
  coverageCloseLink: {
    marginTop: 15,
    '@media (max-width: 768px)': {
      marginTop: 23,
    },
  } as CSSProperties,
});
