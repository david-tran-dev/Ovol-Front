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
  // imgSelectLift,
  // urlSelectLift,
  // imgSelectHick,
  // urlSelectHick,

}) {
  console.log('name', name);
  const [imageSelectedLanding, setImageSelectedLanding] = useState('');
  const [imageSelectedLiftOff, setImageSelectedLiftOff] = useState('');
  const [imageSelectedHiking, setImageSelectedHiking] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  // console.log('nom img:', imageSelected.name);

  const uploadImage = async (files) => {
    // imgSelectLift(imageSelected.name);
    // imgSelectHick(imageSelected.name);
    console.log('result', files[0]);
    // console.log('dans upload - imageselected:', imageSelected);
    const formData = new FormData();
    if (name === 'landing') {
      onImgSelect(name, imageSelectedLanding.name);
      formData.append('file', imageSelectedLanding);
    } if (name === 'lift') {
      onImgSelect(name, imageSelectedLiftOff.name);
      formData.append('file', imageSelectedLiftOff);
    } if (name === 'hiking') {
      onImgSelect(name, imageSelectedHiking.name);
      formData.append('file', imageSelectedHiking);
    }

    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD);
    // on upload l'image
    axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_SERVER}/image/upload`, formData)
      .then((result) => {
        console.log('result de la requete', result);
        // console.log(result.data.secure_url);
        // on recupere l'url de l'image uploader
        // onImgSelect(name, imageSelected.name);
        setImgUrl(result.data.secure_url);
        onUrlSelect(name, result.data.secure_url);
      // urlSelectLift(result.data.secure_url);
      // urlSelectHick(result.data.secure_url);
      });
  };
  const handleChange = (e) => {
    console.log('Event target files', e.target.files[0]);
    // console.log('state imageSelected', imageSelected);

    if (name === 'landing') {
      setImageSelectedLanding(e.target.files[0]);
    } if (name === 'lift') {
      setImageSelectedLiftOff(e.target.files[0]);
    } if (name === 'hiking') {
      setImageSelectedHiking(e.target.files[0]);
    }
  };
  return (
    <div className="img__uploader">
      <div>
        <label htmlFor="upload-photo">
          <input
            style={{ display: 'none' }}
            id="upload-photo"
            name="upload-photo"
            type="file"
            onChange={handleChange}
          />
          <Button variant="contained" component="span">
            Selectionner votre image
          </Button>{' '}
          <Button variant="contained" onClick={uploadImage}>Uploader</Button>
        </label>
      </div>
      <div className="img__container">
        {/* <img src={imgUrl} alt="" /> */}
        <div>URL de l'image = {imgUrl}</div>
      </div>
    </div>
  );
}
UploadImg.propTypes = {
  onImgSelect: PropTypes.func.isRequired,
  onUrlSelect: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  // imgSelectLift: PropTypes.func.isRequired,
  // urlSelectLift: PropTypes.func.isRequired,
  // imgSelectHick: PropTypes.func.isRequired,
  // urlSelectHick: PropTypes.func.isRequired,
};

export default React.memo(UploadImg);
