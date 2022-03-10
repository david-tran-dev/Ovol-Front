import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Button,
} from '@mui/material';
import './UploadImg.scss';

function UploadImg({
  imgSelect,
  urlSelect,
}) {
  const [imageSelected, setImageSelected] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  // console.log('nom img:', imageSelected.name);

  const uploadImage = (files) => {
    imgSelect(imageSelected.name);
    console.log('result', files[0]);
    const formData = new FormData();
    formData.append('file', imageSelected);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD);
    // on upload l'image
    axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_SERVER}/image/upload`, formData).then((result) => {
      // console.log(result.data.secure_url);
      // on recupere l'url de l'image uploader
      setImgUrl(result.data.secure_url);
      urlSelect(result.data.secure_url);
    });
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
            onChange={(e) => setImageSelected(e.target.files[0])}
          />
          <Button variant="contained" component="span">
            Télécharger votre image
          </Button>{' '}
          <Button variant="contained" onClick={uploadImage}>Envoyer</Button>
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
  imgSelect: PropTypes.func.isRequired,
  urlSelect: PropTypes.func.isRequired,
};

export default React.memo(UploadImg);
