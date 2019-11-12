import {CSSProperties} from 'ui/withStyles';

export const styles = () => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    width: '100%',
    padding: 16,
    borderRadius: 6,
    backgroundColor: '#fff',
    cursor: 'pointer',
    '& p': {
      fontWeight: 400,
      fontSize: 16,
    },
  } as CSSProperties,

  border: {
    border: '2px solid #cacacb',
    borderRadius: 6,
    margin: '8px 0',
    backgroundColor: '#fff',
  } as CSSProperties,

  withoutBorder: {
    width: '100%',
    '& div': {
      padding: 0,
    },
  } as CSSProperties,

  label: {
    width: '100%',
    background: 'transparent',
  } as CSSProperties,

  checkbox: {
    padding: 0,
    fontSize: 16,
  } as CSSProperties,

  helperWrapper: {
    marginTop: 8,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    '& p': {
      fontWeight: 'bold',
      color: '#343342',
      marginLeft: 8,
      fontSize: 13,
    },
    '& span': {
      padding: 0,
    },
  } as CSSProperties,

  checked: {
    border: 'double 2px transparent',
    borderRadius: '6px',
    backgroundImage: 'linear-gradient(white, white), radial-gradient(circle at top left, #68d0cb, #1ca1d4)',
    backgroundOrigin: 'border-box',
    backgroundClip: 'content-box, border-box',
    margin: '8px 0',
  } as CSSProperties,
});
