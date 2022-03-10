/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-no-useless-fragment */
import PropTypes from 'prop-types';
import './adminCreate.scss';
import {
  Container, Icon, Box,
} from '@mui/material';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { createTheme } from '@mui/system';

const customTheme = createTheme({
  sx: {
    p: '2px 4px',
    width: '500px',
    color: 'red',
  },
});

function AdminCreate({ className, ...rest }) {
  const [value, setValue] = React.useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <>

      <div
        className={`track ${className}`}
        {...rest}
      >

        <Container className="track-container" sx={{ my: 1 }}>
          <TextField
            id="outlined-textarea"
            label="Infos"
            placeholder="Vos infos"
            value={value}
            onChange={handleChange}
            multiline
          />

          <h1 className="track-title"> <TextField
            id="outlined-textarea"
            label="Infos"
            placeholder="Vos infos"
            value={value}
            onChange={handleChange}
            multiline
          />
          </h1>
          <Box sx={{ display: 'flex', textAlign: 'left', my: 1 }}>
            <Box sx={{ pr: 2, width: '50%' }}>
              <p className="track-info">
                Infos techniques:
              </p>
              <p className="track-info__key">
                <span className="track-info__value"> <TextField
                  sx={customTheme}
                  id="outlined-textarea"
                  label="Dénivelé positif en mètres:"
                  placeholder="Dénivelé positif en mètres:"
                  value={value}
                  onChange={handleChange}
                  multiline
                />
                </span>
              </p>
              <p className="track-info__key">
                <span className="track-info__value"> <TextField
                  sx={customTheme}
                  id="outlined-textarea"
                  label="Dénivelé négatif:"
                  placeholder="Dénivelé négatif:"
                  value={value}
                  onChange={handleChange}
                  multiline
                />m
                </span>
              </p>
              <p className="track-info__key">Point haut:
                <span className="track-info__value"> <TextField
                  id="outlined-textarea"
                  label="Infos"
                  placeholder="Vos infos"
                  value={value}
                  onChange={handleChange}
                  multiline
                />m
                </span>
              </p>
              <p className="track-info__key">Point bas:
                <span className="track-info__value"> <TextField
                  id="outlined-textarea"
                  label="Infos"
                  placeholder="Vos infos"
                  value={value}
                  onChange={handleChange}
                  multiline
                />m
                </span>
              </p>
              <p className="track-info__key">Carte IGN:
                <span className="track-info__value"> <TextField
                  id="outlined-textarea"
                  label="Infos"
                  placeholder="Vos infos"
                  value={value}
                  onChange={handleChange}
                  multiline
                />
                </span>
              </p>
              <p className="track-info__key">Terrain:
                <span className="track-info__value"> <TextField
                  id="outlined-textarea"
                  label="Infos"
                  placeholder="Vos infos"
                  value={value}
                  onChange={handleChange}
                  multiline
                />
                </span>
              </p>

            </Box>
            <Box sx={{ width: '50%', mb: 2 }}>
              <Box sx={{
                display: 'flex', justifyContent: 'flex-end', alignItems: 'baseline', mb: 2,
              }}
              >
                <Icon className="fa-solid fa-flag" sx={{ width: 24, height: 24, mx: 1 }} />
                <Icon className="fa-solid fa-map-location-dot" sx={{ width: 24, height: 24, mx: 1 }} />
              </Box>
              <p className="track-info__key">Massif:
                <span className="track-info__value"> <TextField
                  id="outlined-textarea"
                  label="Infos"
                  placeholder="Vos infos"
                  value={value}
                  onChange={handleChange}
                  multiline
                />
                </span>
              </p>
              <p className="track-info__key">Distance:
                <span className="track-info__value"> <TextField
                  id="outlined-textarea"
                  label="Infos"
                  placeholder="Vos infos"
                  value={value}
                  onChange={handleChange}
                  multiline
                />km
                </span>
              </p>
              <p className="track-info__key">Difficulté:
                <span className="track-info__value"> <TextField
                  id="outlined-textarea"
                  label="Infos"
                  placeholder="Vos infos"
                  value={value}
                  onChange={handleChange}
                  multiline
                />
                </span>
              </p>
              <p className="track-info__key">Point de départ:
                <span className="track-info__value">
                  <TextField
                    id="outlined-textarea"
                    label="Infos"
                    placeholder="Vos infos"
                    value={value}
                    onChange={handleChange}
                    multiline
                  />
                </span>
              </p>
            </Box>
          </Box>
          <p className="track-resume">Résumé</p>
          <p className="track-resume__content"> <TextField
            id="outlined-textarea"
            label="Infos"
            placeholder="Vos infos"
            value={value}
            onChange={handleChange}
            multiline
          />
          </p>

          <p className="track-steps">Etapes de la randonnée</p>
          <TextField
            id="outlined-textarea"
            label="Infos"
            placeholder="Vos infos"
            value={value}
            onChange={handleChange}
            multiline
          />
          <p>Photo import</p>
          <TextField
            id="outlined-textarea"
            label="Infos"
            placeholder="Vos infos"
            value={value}
            onChange={handleChange}
            multiline
          />
          <p>Carte import</p>
          <TextField
            id="outlined-textarea"
            label="Infos"
            placeholder="Vos infos"
            value={value}
            onChange={handleChange}
            multiline
          />

        </Container>
      </div>
    </>
  );
}
AdminCreate.propTypes = {
  className: PropTypes.string,
};
AdminCreate.defaultProps = {
  className: '',
};

export default React.memo(AdminCreate);
