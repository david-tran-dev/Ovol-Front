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
import Avatar from '@mui/material/Avatar';
import customTheme from '../../themes/customTheme';
import itemData from '../../assets/img/itemDataContact/itemDataContact';
import './contact.scss';
import fred from '../../assets/img/avatarData/fred.jpg';
import olivier from '../../assets/img/avatarData/olivier.jpg';
import adrien from '../../assets/img/avatarData/adrien.jpg';
import antoine from '../../assets/img/avatarData/antoine.jpg';
import david from '../../assets/img/avatarData/david.jpg';

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
            Pour nous Contacter Linkedin et Email :
          </Typography>
        </Box>
        <Divider variant="middle" />
        <Box sx={{ m: 2 }}>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="https://www.linkedin.com/in/david-tran-dev/" target="_blank" rel="noreferrer">
              <Chip
                clickable
                className="header-contact__chip"
                avatar={<Avatar alt="David" src={david} />}
                icon={<FaceIcon />}
                label="David"
              />
            </a>
            <a href="https://www.linkedin.com/in/antoine-chul" target="_blank" rel="noreferrer">
              <Chip
                clickable
                avatar={<Avatar alt="Antoine" src={antoine} />}
                className="header-contact__chip"
                icon={<FaceIcon />}
                label="Antoine"
              />
            </a>

            <a href="https://www.linkedin.com/in/olivier-reboul-052281140/" target="_blank" rel="noreferrer">
              <Chip
                clickable
                className="header-contact__chip"
                icon={<FaceIcon />}
                avatar={<Avatar alt="Olivier" src={olivier} />}
                label="Olivier"
              />
            </a>

            <a href="https://www.linkedin.com/in/aribault35240" target="_blank" rel="noreferrer">
              <Chip
                clickable
                className="header-contact__chip"
                icon={<FaceIcon />}
                avatar={<Avatar alt="Adrien" src={adrien} />}
                label="Adrien"
              />
            </a>

            <a href="http://www.linkedin.com/in/frederick-chenot" target="_blank" rel="noreferrer">
              <Chip
                clickable
                avatar={<Avatar alt="Fred" src={fred} />}
                className="header-contact__chip"
                icon={<FaceIcon />}
                label="Fred"
              />
            </a>
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
