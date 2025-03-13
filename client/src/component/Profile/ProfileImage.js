import React, { useContext,useEffect } from 'react';
import { UserContext } from '../UserProvider';
import { Image } from 'cloudinary-react';

const ProfileImage = () => {
  const { profileImage, uploadImage } = useContext(UserContext);

  // Handle perubahan file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImage(file); // Unggah gambar ke Cloudinary
    }
  };

  useEffect(()=>{
    console.log('this is profile',profileImage)
  })

  return (
    <div className="flex flex-col items-center">
      <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
        {profileImage ? (
          <Image
            cloudName="dl5gaqv9e" // Ganti YOUR_CLOUD_NAME
            publicId="eb25a92354533f4e1431faa106a3239c"
            alt="Profile"
          />
        ) : (
          <span className="text-gray-600 text-4xl">👤</span> // Gambar default
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mt-2"
      />
      <p className="mt-2 text-sm text-gray-600">Unggah foto profil</p>
    </div>
  );
};

export default ProfileImage;