import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import itemDataML from '../../assets/img/itemDataContact/itemDataMentionsLegales';
import './mentionsLegales.scss';

function MiddleDividers() {
  return (
    <div className="header-mentionsLegales">
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <Box sx={{ my: 3, mx: 2 }}>
          <Grid container alignItems="center">
            <Grid item xs>
              <ImageList sx={{ width: '100%', height: '100%' }} cols={2} rowHeight={164}>
                {itemDataML.map((item) => (
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
                MENTIONS LEGALES
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="body2">
            <h2>CONDITIONS D’UTILISATION :</h2>
            <p>L’utilisation du présent site implique l’acceptation pleine et entière des conditions générales d’utilisation décrites ci-après.
              Ces conditions d’utilisation sont susceptibles d’être modifiées ou complétées à tout moment.
            </p>
            <br />
            <h2>INFORMATIONS :</h2>
            <p>Les informations et documents du site sont présentés à titre indicatif, n’ont pas de caractère exhaustif, et ne peuvent engager la responsabilité du propriétaire du site.
              <br />Le propriétaire du site ne peut être tenu responsable des dommages directs et indirects consécutifs à l’accès au site.
            </p>
          </Typography>
        </Box>
        <Divider variant="middle" />
        <Box sx={{ m: 2 }}>
          <Stack direction="column" spacing={1}>
            <Chip label="Droit Auteur" />
            <Chip label="Droit utilisateur" />
            <Chip label="Gestion Cookies" />
            <Chip label="Libertés individuelles" />
            <Chip label="Conditions d'utilisation" />
          </Stack>
        </Box>
      </Box>
    </div>
  );
}

export default React.memo(MiddleDividers);
