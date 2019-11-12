import {CSSProperties} from 'ui/withStyles';

export const styles = () => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    padding: '22px 24px 24px',
    boxShadow: 'none',
    '@media (max-width: 768px)': {
      padding: '24px 24px 32px',
      paddingBottom: 45,
    },
  } as CSSProperties,

  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as CSSProperties,

  title: {
    fontWeight: 'bold',
    marginTop: 8,
    fontSize: 20,
  } as CSSProperties,

  switch: {
    '& span': {
      color: '#27cfea',
    },
  } as CSSProperties,

  description: {
    margin: '10px 0 21px',
    fontSize: 14,
    color: '#676672',
    '@media (max-width: 768px)': {
      margin: '14px 0 21px',
      marginBottom: 15,
    },
  } as CSSProperties,

  coverageAmountTitle: {
    marginBottom: 24,
    fontSize: 13,
    fontWeight: 'bold',
  } as CSSProperties,

  button: {
    width: 40,
    height: 40,
    backgroundColor: ' #115FCB',
    position: 'relative',
    color: '#fff',
    fontSize: 31,
    cursor: 'pointer',
    borderRadius: 6,
    border: 'none',
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  } as CSSProperties,

  disabledButton: {
    backgroundColor: '#e8e8ea !important',
  } as CSSProperties,

  coverageContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  } as CSSProperties,

  coverage: {
    fontSize: 26,
    fontWeight: 'bold',
  } as CSSProperties,

  expandMoreIcon: {
    fontSize: 18,
    marginBottom: 3,
    color: '#1CA1D4',
  } as CSSProperties,

  expandMoreIconClose: {
    marginBottom: 2,
    fontSize: 18,
    color: '#1CA1D4',
    transform: 'rotate(180deg)',
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

  coverageCloseLink: {
    marginTop: 15,
    '@media (max-width: 768px)': {
      marginTop: 23,
    },
  } as CSSProperties,

  buttonAction: {
    color: '#ffffff',
    fontSize: 37,
    lineHeight: 0,
    fontWeight: 500,
  } as CSSProperties,

  minus: {
    position: 'absolute',
    top: '42%',
    left: '30%',
  } as CSSProperties,

  hideOnMobile: {
    display: 'none',
  } as CSSProperties,
  filterField: {
    width: 'unset',
  } as CSSProperties,
  rootButton: {
    width: 60,
    height: 32,
    padding: 0,
    marginRight: '10px',
  } as CSSProperties,
  switchBase: {
    padding: 1,
    height: 42,
    '& input': {
      width: '80px',
    },
    '&$checked': {
      transform: 'translateX(34px)',
      color: '#fff',
      '& + $track': {
        backgroundColor: '#fff',
        opacity: 1,
        border: 'none',
      },
      '& + $bar': {
        backgroundColor: '#fff',
        border: '2px solid #c7c7c8',
      },
      '& input': {
        transform: 'translateX(-34px)',
      },
      '& > span > span': {
        transform: 'translateX(0px)',
        backgroundImage:
          // tslint:disable-next-line: max-line-length
          'linear-gradient(to right, #68d0cb, #4dc5cf, #32bad2, #1caed4, #1ca1d4), linear-gradient(to right, #68d0cb, #4dc5cf, #32bad2, #1caed4, #1ca1d4)',
      },
    },
  } as CSSProperties,
  bar: {
    top: '40%',
    width: 61,
    height: 30,
    backgroundColor: '#fff',
    border: '2px solid #c7c7c8',
    borderRadius: '50px',
    opacity: 0.7,
  } as CSSProperties,
  checked: {},
  thumb: {},
  track: {},
  icon: {
    width: '26px',
    height: '26px',
    transform: 'translateX(5px)',
    border: '2px solid #fff',
    boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.1)',
  } as CSSProperties,
});
