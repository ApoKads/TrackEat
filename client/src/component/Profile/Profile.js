import React, {useEffect, useState} from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileForm from './ProfileForm';
import { UserContext } from '../UserProvider.js';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const { user,profileImage,setProfileImage} = useContext(UserContext); 
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
    dailyCalories:user.dailycalories,
    profileImage: profileImage,  // Initially set to null or placeholder
  };
  
  const [profile, setProfile] = useState(initialProfile);
  const [tempProfile, setTempProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false); // Manage edit mode
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(initialProfile.profileImage); // Start with initial image if available
  const [dailyCalories,setDailyCalories] = useState(initialProfile.dailyCalories);
  // Handle input changes (name, sex, etc.)

  const handleErrorChange = (e) => {
    setError(e.target.value);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'error') {
      handleErrorChange(e); // Handle perubahan error
    }
    else{
      setTempProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'MyProfileImage'); // Ganti dengan upload preset Anda
    formData.append('folder', '/ProfilePict'); // Folder di Cloudinary

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dl5gaqv9e/image/upload`, // Ganti YOUR_CLOUD_NAME
        formData
      );

      const imageUrl = response.data.secure_url;
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  
  // Handle profile picture upload
  const handleImageUpload = async (e) => {
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
    try {
      const imageUrl = await uploadImage(file); // Unggah gambar ke Cloudinary
      setProfileImage(imageUrl); // Update state profileImage
      setTempProfile((prev) => ({ ...prev, profileImage: imageUrl })); // Update tempProfile
    } catch (error) {
      console.error('Error uploading image:', error);
    }
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

  const calculateDailyCalories = () => {
    let BMR;
    if (tempProfile.sex === "Male") {
      BMR = 66.5 + 13.7 * tempProfile.weight + 5 * tempProfile.height - 6.8 * tempProfile.age;
    } else {
      BMR = 655 + 9.6 * tempProfile.weight + 1.8 * tempProfile.height - 4.7 * tempProfile.age;
    }

    let activityFactor;
    switch (tempProfile.ActivityOption) {
      case "Passive":
        activityFactor = 1.2;
        break;
      case "Lightly Active":
        activityFactor = 1.375;
        break;
      case "Moderately Active":
        activityFactor = 1.55;
        break;
      case "Intensely Active":
        activityFactor = 1.725;
        break;
      default:
        activityFactor = 1.2;
    }
    const TDEE = BMR * activityFactor;

    let calorieAdjustment = 0;
    if (tempProfile.goal !== "Maintain Weight") {
      console.log(tempProfile.ProgressOption)
      switch (tempProfile.ProgressOption) {
        case "0.25":
          calorieAdjustment = tempProfile.goal === "Gain" ? 275 : -275;
          break;
        case "0.5":
          calorieAdjustment = tempProfile.goal === "Gain" ? 550 : -550;
          break;
        default:
          calorieAdjustment = 0;
      }
    }

    const dailyCalories = TDEE + calorieAdjustment;
    return dailyCalories.toFixed(2);
  };

  // Save the changes
  const handleSave = async () => {
    if (validateInputs()) {
      try {
        const calculatedCalories = calculateDailyCalories(); // Hitung kalori
        setDailyCalories(calculatedCalories); // Simpan hasil perhitungan ke state
  
        const newProfile = {
          id: user.id,
          firstName: tempProfile.firstName,
          lastName: tempProfile.lastName,
          selectedSex: tempProfile.sex,
          Age: tempProfile.age,
          height: tempProfile.height,
          weight: tempProfile.weight,
          WeightOption: tempProfile.goal,
          ActivityOption: tempProfile.ActivityOption, // Gunakan nilai dari tempProfile
          ProgressOption: tempProfile.ProgressOption, // Gunakan nilai dari tempProfile
          goal: tempProfile.weightGoal,
          dailyCalories: calculatedCalories, // Gunakan hasil perhitungan
          profileImage: tempProfile.profileImage, // Sertakan URL gambar profil
        };
  
        console.log('Data to be sent:', newProfile);
        const token = localStorage.getItem('token');
        const response = await axios.post('/user/update', newProfile, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.status === 200) {
          console.log('User data updated successfully:', response.data.user);
          // setIsEditing(false);
          window.location.reload()
        } else {
          console.error('Failed to update user data:', response.data.error);
        }
      } catch (error) {
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
    console.log("this is profile",profile)
    console.log(tempProfile.ProgressOption)
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
              className="w-40 h-40 rounded-full flex items-center justify-center cursor-pointer"
              onClick={() => {
                if (isEditing) {
                  document.getElementById("fileInput").click();  // Trigger file input only when editing
                }
              }}
            >
              {tempProfile.profileImage ? (
                  <img
                    src={tempProfile.profileImage}
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
              <div className="hidden sm:block mt-6 w-full text-center ">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-black z-50"
                  onClick={() => setIsEditing(true)} // Toggle editing mode
                >
                  Edit Profile
                </button>
                <div className='mt-4 text-2x flex flex-col text-center justify-center items-center font-pop'>
                  <span className='font-bold'>Your Calories:</span> {dailyCalories}
                </div>
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
                <div className='mb-4 text-2x flex flex-col text-center justify-center items-center font-pop'>
                  <span className='font-bold'>Your Calories:</span> {dailyCalories}
                </div>
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
