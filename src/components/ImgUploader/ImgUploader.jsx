import React, { useState } from 'react';
import Axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './imgUpload.scss';

function ImgUploader() {
  const [imageSelected, setImageSelected] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const uploadImage = (files) => {
    console.log('result', files[0]);
    const formData = new FormData();
    formData.append('file', imageSelected);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD);
    // on upload l'image
    Axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_SERVER}/image/upload`, formData).then((result) => {
      console.log(result.data.secure_url);
      // on recupere l'url de l'image uploader
      setImgUrl(result.data.secure_url);
      // TODO: store {imgUrl} in db here
      // Axios.post('/rando/id');
    });
  };
  return (
    <div className="img__uploader">
      <div>
        <Stack direction="row" alignItems="center" spacing={2}>
          <label htmlFor="contained-button-file">
            <input id="contained-button-file" accept="image/*" multiple type="file" Style="display:none" onChange={(e) => setImageSelected(e.target.files[0])} />
            <Button variant="contained" component="span">
              Upload
            </Button>
            <Button variant="contained" type="submit" onClick={uploadImage}>Envoyer</Button>
          </label>
        </Stack>
      </div>
      <div className="img__container">
        <img src={imgUrl} alt="" />
        <div>URL de l'image = {imgUrl}</div>
      </div>
    </div>
  );
}

export default React.memo(ImgUploader);
