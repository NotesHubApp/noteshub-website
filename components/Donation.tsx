import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  donationContainer: {
    textAlign: 'center',
    margin: '50px 0',

    '& p': {
      fontSize: '1.5rem'
    }
  },
  coffeeIcon: {
    fontSize: '1.5em'
  },
  donateButtonLink: {
    border: 'solid 1px gray',
    padding: '10px 20px !important',
    marginLeft: '10px',
    borderRadius: '100px 100px 100px 100px',
    whiteSpace: 'nowrap',

    '&:hover': {
      color: 'white',
      borderColor: 'var(--theme-color)',
      background: 'var(--theme-color)'
    }
  },
  '@media only screen and (max-width: 800px)': {
    donateButtonLink: {
      display: 'block',
      margin: '10px 0'
    }
  },
});

export default function Donation() {
  const classes = useStyles();

  return (
    <div className={ classes.donationContainer }>
      <h1><span className={ classes.coffeeIcon }>☕</span> Buy a Coffee</h1>
      <p>
        Like the application? Support development
        <a
          className={ classes.donateButtonLink }
          target="_blank"
          href={ process.env.NEXT_PUBLIC_DONATION_URL }>
            buy a coffee
        </a>
      </p>
    </div>
  );
}
