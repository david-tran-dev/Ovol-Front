import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Button,
} from '@mui/material';
import './UploadImg.scss';

function UploadImg({
  onImgSelect,
  onUrlSelect,
  name,

}) {
  console.log('name', name);
  const [imageSelectedLanding, setImageSelectedLanding] = useState('');
  const [imageSelectedLift, setImageSelectedLift] = useState('');
  const [imageSelectedHiking, setImageSelectedHiking] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const uploadImage = async (files) => {
    console.log('result', files[0]);
    const formData = new FormData();
    if (name === 'landing') {
      onImgSelect(name, imageSelectedLanding.name);
      formData.append('file', imageSelectedLanding);
    } if (name === 'lift') {
      onImgSelect(name, imageSelectedLift.name);
      formData.append('file', imageSelectedLift);
    } if (name === 'hiking') {
      onImgSelect(name, imageSelectedHiking.name);
      formData.append('file', imageSelectedHiking);
    }

    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD);
    // on upload l'image
    axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_SERVER}/image/upload`, formData)
      .then((result) => {
        console.log('result de la requete', result);
        // on recupere l'url de l'image uploader
        setImgUrl(result.data.secure_url);
        onUrlSelect(name, result.data.secure_url);
      });
  };
  const handleChange = (e) => {
    console.log('Event target files', e.target.files[0]);

    if (name === 'landing') {
      setImageSelectedLanding(e.target.files[0]);
    } if (name === 'lift') {
      setImageSelectedLift(e.target.files[0]);
    } if (name === 'hiking') {
      setImageSelectedHiking(e.target.files[0]);
    }
    console.log('target', e.target.files[0]);
  };
  console.log(`imageSelected${name.charAt(0).toUpperCase() + name.slice(1)}`);
  console.log('imageselectLanding:::', imageSelectedLanding.name);

  return (
    <div className="img__uploader">
      <div>
        <label htmlFor={`upload-${name}`}>
          <input
            style={{ display: 'none' }}
            id={`upload-${name}`}
            name="upload-photo"
            type="file"
            onChange={handleChange}
          />
          <Button variant="contained" component="span">
            Selectionner votre image
          </Button>{' '}
          <Button
            id={`uploadButton-${name}`}
            variant="contained"
            onClick={uploadImage}
            sx={{
              backgroundColor: `imageSelected${name.charAt(0).toUpperCase() + name.slice(1)}` !== '' ? 'green' : 'orange',
            }}
          >Uploader
          </Button>
        </label>
      </div>
      <div className="img__container">
        <div>URL de l'image = {imgUrl}</div>
      </div>
    </div>
  );
}
UploadImg.propTypes = {
  onImgSelect: PropTypes.func.isRequired,
  onUrlSelect: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default React.memo(UploadImg);
