import React, {useEffect, useState} from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileForm from './ProfileForm';
import { UserContext } from '../UserProvider.js';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const { user} = useContext(UserContext); 
  const initialProfile = {
    firstName: user.first_name,
    lastName: user.last_name,
    sex: user.selected_sex,
    age: user.age,
    height: user.height,
    weight: user.weight,
    goal: user.weight_option,
    weightGoal: user.goal,
    ActivityOption:user.activity_option,
    ProgressOption:user.progress_option,
    profileImage: null,  // Initially set to null or placeholder
  };
  
  const [profile, setProfile] = useState(initialProfile);
  const [tempProfile, setTempProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false); // Manage edit mode
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(initialProfile.profileImage); // Start with initial image if available

  // Handle input changes (name, sex, etc.)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle profile picture upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate the file type (only jpg, jpeg, png)
    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Please upload a .jpg, .jpeg, or .png image.');
      return;
    }

    // Validate file size (e.g., 5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError('File size exceeds 5MB. Please upload a smaller image.');
      return;
    }

    setError('');
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // Set the preview of the uploaded image
    };
    reader.readAsDataURL(file);
  };

  // Validate the input fields before saving
  const validateInputs = () => {
    if (tempProfile.age <= 0 || isNaN(tempProfile.age)) {
      setError('Age must be a positive number.');
      return false;
    }
    if (tempProfile.height <= 0 || isNaN(tempProfile.height)) {
      setError('Height must be a valid positive number.');
      return false;
    }
    if (tempProfile.weight <= 0 || isNaN(tempProfile.weight)) {
      setError('Weight must be a valid positive number.');
      return false;
    }
    if (tempProfile.weightGoal <= 0 || isNaN(tempProfile.weightGoal)) {
      setError('Weight Goal must be a positive number.');
      return false;
    }
    setError('');
    return true;
  };

  // Save the changes
  const handleSave = async() => {
    if (validateInputs()) {
      try{
      setProfile({ ...tempProfile, profileImage: imagePreview });

      const newProfile = {
        id : user.id,
        firstName: tempProfile.firstName,
        lastName: tempProfile.lastName,
        selectedSex: tempProfile.sex,
        Age: tempProfile.age,
        height: tempProfile.height,
        weight: tempProfile.weight,
        WeightOption:tempProfile.goal,
        ActivityOption: user.activity_option,
        ProgressOption:user.progress_option,
        goal:tempProfile.weightGoal,
      };
      // console.log('p',newProfile);
      console.log('Data to be sent:', newProfile);
      // const result = await 
      const token = localStorage.getItem('token'); // Ambil token dari localStorage
      const response = await axios.post('/user/update', newProfile, {
        headers: {
          Authorization: `Bearer ${token}`, // Sertakan token di header
        },
      });
      if (response.status === 200) {
        console.log('User data updated successfully:', response.data.user);
        setIsEditing(false); // Keluar dari mode edit
      } else {
        console.error('Failed to update user data:', response.data.error);
      }
    }catch(error){
      console.log(error);
    }
    }
  };

  // Cancel editing and revert to the original data
  const handleCancel = () => {
    setTempProfile(profile); // Reset to the original profile
    setImagePreview(profile.profileImage); // Keep the profile picture as is
    setIsEditing(false); // Exit editing mode
    setError('');
  };

  useEffect(()=>{
    console.log(profile)
  })


  return (
    <div className='w-full flex flex-col justify-center items-center gap-4 p-4 sm:p-8'>
      <div className='w-full'>
        <button 
        onClick={()=>{
          navigate(-1);
        }}
        className='w-20 bg-gray-200 px-4 py-2 rounded-lg shadow-md text-lg font-semibold hover:bg-gray-300 transition-transform transform hover:scale-105 active:scale-95'>Back</button>
      </div>
      <div className='w-full flex items-center justify-center sm:mt-12 '>
      <div className="max-w-4xl w-full items-center flex flex-col rounded-lg bg-white drop-shadow-md shadow-inner">
        <div className="w-full  p-8 flex flex-col sm:flex-row items-start sm:space-between sm:space-x-10 gap-3 sm:gap-0">
          <div className="w-full justify-items-center sm:w-1/4 h-full sm:items-start sm:mb-20">
            {/* Profile Picture Section */}
            <div
              className="w-40 h-40 rounded-full bg-[#5567AF] flex items-center justify-center mb-10 cursor-pointer"
              onClick={() => {
                if (isEditing) {
                  document.getElementById("fileInput").click();  // Trigger file input only when editing
                }
              }}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-40 h-40 rounded-full object-cover"
                />
              ) : (
                <span className="text-white font-extrabold text-[100px] font-poppins">ND</span>
              )}
            </div>

            {/* Hidden File Input */}
            <input
              id="fileInput"
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleImageUpload}  // Handle image upload on file selection
              style={{ display: 'none' }} // Hide the file input
            />

            {/* Edit Profile Button for Larger Screens (below profile picture) */}
            {!isEditing && (
              <div className="hidden sm:block mt-6 w-full text-center">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-black z-50"
                  onClick={() => setIsEditing(true)} // Toggle editing mode
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>

          {/* Profile Form */}
          <ProfileForm
            profile={profile}
            tempProfile={tempProfile}
            isEditing={isEditing}
            error={error}
            imagePreview={imagePreview}
            handleChange={handleChange}
            handleSave={handleSave}
            handleCancel={handleCancel}
            handleImageUpload={handleImageUpload}
          />
        </div>


        {/* Edit Profile Button for Mobile (below the entire form) */}
        {!isEditing && (
          <div className="sm:hidden mb-6 w-full text-center sm:text-left sm:mt-auto">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-black z-50"
              onClick={() => setIsEditing(true)} // Toggle editing mode
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Profile;
