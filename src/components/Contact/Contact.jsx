import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import './header.scss';

function MiddleDividers() {
  return (
    <div className="header-contact">
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <Box sx={{ my: 3, mx: 2 }}>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography gutterBottom variant="h4" component="div">
                CONTACT
              </Typography>
            </Grid>
          </Grid>
          <Typography color="text.secondary" variant="body2">
            Pour nous Contacter :
          </Typography>
        </Box>
        <Divider variant="middle" />
        <Box sx={{ m: 2 }}>
          <Stack direction="row" spacing={1}>
            <Chip label="David" />
            <Chip label="Antoine" />
            <Chip label="Olivier" />
            <Chip label="Adrien" />
            <Chip label="Fred" />
          </Stack>
        </Box>
        <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
          <Button>ovolclock@gmail.com</Button>
        </Box>
      </Box>
    </div>
  );
}
export default React.memo(MiddleDividers);
