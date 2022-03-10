import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import SendIcon from '@mui/icons-material/Send';
import FaceIcon from '@mui/icons-material/Face';
import { ThemeProvider } from '@mui/material';
import customTheme from '../../themes/customTheme';
import itemData from '../../assets/img/itemDataContact/itemDataContact';
import './contact.scss';

function MiddleDividers() {
  return (
    <div className="header-contact">
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <Box sx={{ my: 3, mx: 2 }}>
          <Grid container alignItems="center">
            <Grid item xs>
              <ImageList sx={{ width: '100%', height: '100%' }} cols={2} rowHeight={164}>
                {itemData.map((item) => (
                  <ImageListItem key={item.img}>
                    <img
                      src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>

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
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
            <Chip className="header-contact__chip" icon={<FaceIcon />} label="David" />
            <Chip className="header-contact__chip" icon={<FaceIcon />} label="Antoine" />
            <Chip className="header-contact__chip" icon={<FaceIcon />} label="Olivier" />
            <Chip className="header-contact__chip" icon={<FaceIcon />} label="Adrien" />
            <Chip className="header-contact__chip" icon={<FaceIcon />} label="Fred" />
          </Stack>
        </Box>
        <ThemeProvider theme={customTheme}>
          <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
            <Button
              endIcon={<SendIcon />}
              href="mailto:ovolclock@gmail.com"
            >SEND MESSAGE
            </Button>
          </Box>
        </ThemeProvider>
      </Box>
    </div>
  );
}

export default React.memo(MiddleDividers);
