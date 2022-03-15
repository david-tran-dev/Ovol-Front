import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { NavLink } from 'react-router-dom';
import itemDataApropos from '../../assets/img/itemDataContact/itemDataApropos';
import './about.scss';

function About() {
  return (
    <div className="header-apropos">
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <Box sx={{ my: 3, mx: 2 }}>
          <Grid container alignItems="center">
            <Grid item xs>
              <ImageList sx={{ width: '100%', height: '100%' }} cols={2} rowHeight={164}>
                {itemDataApropos.map((item) => (
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
                A PROPOS
              </Typography>
            </Grid>
          </Grid>
          <Typography color="text.secondary" variant="body2">
            Biographie :
            <p>
              O'vol a pour objectif de répertorier des randonnées pédestres en montagne ou la descente s'effectue en parapente.
            </p>
          </Typography>
        </Box>
        <Divider variant="middle" />
        <Box sx={{ m: 2 }}>
          <Stack direction="column" spacing={1}>
            <NavLink
              to="/contact"
            >
              <Chip clickable label="Qui sommes nous ?" />
            </NavLink>
            { /* <Chip label="Histoire" /> */ }
          </Stack>
        </Box>
      </Box>
    </div>
  );
}

export default React.memo(About);
