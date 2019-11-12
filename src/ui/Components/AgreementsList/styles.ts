import {CSSProperties} from 'ui/withStyles';
import {Theme} from '@material-ui/core';

export const styles = (theme: Theme) => ({
  agreementDialogContainer: {
    background: '#f5f5f5',
    '& a': {
      textDecoration: 'none',
    },
  } as CSSProperties,
  title: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 4,
  } as CSSProperties,
  agreementsHeader: {
    background: '#fff',
    padding: '0 24px',
    marginBottom: theme.spacing.unit,
  } as CSSProperties,
  agreementsTitle: {
    paddingBottom: theme.spacing.unit * 2,
  } as CSSProperties,
  agreementCardItem: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 24px 32px',
    marginBottom: 8,
    boxShadow: 'none',
    '@media (max-width: 768px)': {
      paddingBottom: 16,
    },
  } as CSSProperties,
  agreementButtonsContainer: {
    width: '100%',
    maxWidth: 812,
    background: '#fff',
    paddingTop: theme.spacing.unit * 3.5,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 2,
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
  agreeButton: {
    marginBottom: theme.spacing.unit * 2,
    width: '100%',
  } as CSSProperties,
  closeIcon: {
    cursor: 'pointer',
  } as CSSProperties,
});
