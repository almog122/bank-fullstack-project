import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({messageData}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if(messageData.message !== ""){
      setOpen(true);
    }
  } , [messageData])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2}>        
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={messageData.severity} sx={{ width: '100%' }}>
              {messageData.message}
            </Alert>
        </Snackbar>
    </Stack>
  );
}