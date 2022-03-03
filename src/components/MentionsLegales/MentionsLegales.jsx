import * as React from 'react';
import PropTypes from 'prop-types';
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
import itemDataML from '../../assets/img/itemDataContact/itemDataMentionsLegales';
import './mentionsLegales.scss';

function MiddleDividers({
  isActiveBar,
}) {
  isActiveBar(true);
  return (
    <div className="header-mentionsLegales">
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <Box sx={{ my: 3, mx: 2 }}>
          <Grid container alignItems="center">
            <Grid item xs>
              <ImageList sx={{ width: 330, height: 450 }} cols={2} rowHeight={164}>
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
          <Typography color="text.secondary" variant="body2">
            Règlementation :
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
        <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
          <Button
            endIcon={<SendIcon />}
            href="mailto:ovolclock@gmail.com"
          >SEND MESSAGE
          </Button>
        </Box>
      </Box>
    </div>
  );
}
MiddleDividers.propTypes = {
  isActiveBar: PropTypes.func.isRequired,
};

export default React.memo(MiddleDividers);
