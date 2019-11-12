import {CSSProperties} from 'ui/withStyles';
import {Theme} from '@material-ui/core';

export const styles = (theme: Theme): {[style: string]: CSSProperties} => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: theme.spacing.unit * 3,
  },

  mobileRow: {
    zIndex: 1,
  },
});
