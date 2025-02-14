// import { useState } from 'react';

// const useProfile = (initialProfile) => {
//   const [profile, setProfile] = useState(initialProfile);
//   const [tempProfile, setTempProfile] = useState(initialProfile);
//   const [isEditing, setIsEditing] = useState(false); // Manage edit mode
//   const [error, setError] = useState('');
//   const [imagePreview, setImagePreview] = useState(initialProfile.profileImage); // Start with initial image if available

//   // Handle input changes (name, sex, etc.)
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTempProfile((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle profile picture upload
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Validate the file type (only jpg, jpeg, png)
//     const validTypes = ['image/jpeg', 'image/png'];
//     if (!validTypes.includes(file.type)) {
//       setError('Invalid file type. Please upload a .jpg, .jpeg, or .png image.');
//       return;
//     }

//     // Validate file size (e.g., 5MB limit)
//     const maxSize = 5 * 1024 * 1024; // 5MB
//     if (file.size > maxSize) {
//       setError('File size exceeds 5MB. Please upload a smaller image.');
//       return;
//     }

//     setError('');
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImagePreview(reader.result); // Set the preview of the uploaded image
//     };
//     reader.readAsDataURL(file);
//   };

//   // Validate the input fields before saving
//   const validateInputs = () => {
//     if (tempProfile.age <= 0 || isNaN(tempProfile.age)) {
//       setError('Age must be a positive number.');
//       return false;
//     }
//     if (tempProfile.height <= 0 || isNaN(tempProfile.height)) {
//       setError('Height must be a valid positive number.');
//       return false;
//     }
//     if (tempProfile.weight <= 0 || isNaN(tempProfile.weight)) {
//       setError('Weight must be a valid positive number.');
//       return false;
//     }
//     if (tempProfile.weightGoal <= 0 || isNaN(tempProfile.weightGoal)) {
//       setError('Weight Goal must be a positive number.');
//       return false;
//     }
//     setError('');
//     return true;
//   };

//   // Save the changes
//   const handleSave = () => {
//     if (validateInputs()) {
//       // Save the changes, including the profile picture, goal, and weight goal
//       setProfile({ ...tempProfile, profileImage: imagePreview });
//       setIsEditing(false); // Exit editing mode
//     }
//   };

//   // Cancel editing and revert to the original data
//   const handleCancel = () => {
//     setTempProfile(profile); // Reset to the original profile
//     setImagePreview(profile.profileImage); // Keep the profile picture as is
//     setIsEditing(false); // Exit editing mode
//     setError('');
//   };

//   return {
//     profile,
//     tempProfile,
//     isEditing,
//     error,
//     imagePreview,
//     setIsEditing,
//     handleChange,
//     handleSave,
//     handleCancel,
//     handleImageUpload,
//   };
// };

// export default useProfile;
