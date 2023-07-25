import React, { useState } from 'react';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    setSelectedImage(URL.createObjectURL(image));
  };

  return (
    <div>
      <label htmlFor="imageUpload">
        {selectedImage ? (
          <div className="profile-picture">
            <img src={selectedImage} alt="Profile" />
          </div>
        ) : (
          <div className="profile-picture-empty">
            <span>Arrastra una imagen aquí</span>
          </div>
        )}
      </label>
      <input
        type="file"
        id="imageUpload"
        accept="image/*"
        onChange={handleImageChange}
      />
      <style jsx>
        {`
          .profile-picture {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            border: 2px solid #ddd;
            margin-bottom: 10px;
          }

          .profile-picture img {
            max-width: 100%;
            max-height: 100%;
            object-fit: cover;
          }

          .profile-picture-empty {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            border: 2px dashed #ddd;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};

export default ImageUpload;
