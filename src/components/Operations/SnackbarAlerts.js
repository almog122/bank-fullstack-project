import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({onDepositClick , onWithdrawClick}) {
  const [open, setOpen] = React.useState(false);
  const [message , setMessage] = React.useState("")
  const [severity , setSeverity] = React.useState("success")

  const handleClick = (onClickFunc) => {
    onClickFunc().then((respond)=>{
        setMessage(respond.message)
        setSeverity(respond.severity)
    })

    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2}>
        <Button variant="contained" color="success" onClick={() => handleClick(onDepositClick)}> Deposit </Button>
        <Button variant="contained" color="error" onClick={() => handleClick(onWithdrawClick)}> Withdraw </Button>
        
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
            </Alert>
        </Snackbar>
    </Stack>
  );
}