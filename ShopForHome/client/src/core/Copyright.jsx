import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

export default function Copyright() {
  return (
    <Box mt={8} mb={4}>
      <Typography variant='body2' color='White' align='center'>
        <div style={{backgroundColor:'#5884c4', height:'50px',textAlign:'center'}}>
        <Link color='inherit' href='#'>
          SHOP FOR HOME
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
        </div>
      </Typography>
    </Box>
  );
}
