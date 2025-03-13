import React from 'react';

const ProfileForm = ({
  profile,
  tempProfile,
  isEditing,
  error,
  handleChange,
  handleSave,
  handleCancel,
}) => {
  // Validasi Weight Goal saat menyimpan
  const validateWeightGoal = () => {
    if (tempProfile.goal === "Gain" && tempProfile.weightGoal <= tempProfile.weight) {
      return "Weight Goal must be greater than current weight for Gain.";
    }
    if (tempProfile.goal === "Lose" && tempProfile.weightGoal >= tempProfile.weight) {
      return "Weight Goal must be less than current weight for Lose.";
    }
    return null;
  };

  // Handle perubahan pada goal
  const handleGoalChange = (e) => {
    const { value } = e.target;
    handleChange(e); // Panggil handleChange untuk mengupdate state

    // Jika goal adalah Maintain, set weightGoal ke weight dan ProgressOption ke 0.0
    if (value === "Maintain") {
      handleChange({ target: { name: "weightGoal", value: tempProfile.weight } });
      handleChange({ target: { name: "ProgressOption", value: "0.0" } });
    }
  };

  const validateNameLength = (name) => {
    return name.length <= 32; // Maksimal 32 karakter
  };

  const validateName = (name) => {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(name);
  };

  // Handle perubahan input untuk firstName dan lastName
  const handleNameChange = (e) => {
    const { name, value } = e.target;

    if (!validateNameLength(value)) {
      handleChange({
        target: {
          name: 'error',
          value: `${name === 'firstName' ? 'First Name' : 'Last Name'} must be 32 characters or less.`,
        },
      });
      return; // Hentikan proses jika validasi gagal
    }

    // Validasi nama
    if (!validateName(value)) {
      handleChange({
        target: {
          name: 'error',
          value: `${name === 'firstName' ? 'First Name' : 'Last Name'} must contain only alphabets and spaces.`,
        },
      });
    } else {
      handleChange({
        target: {
          name: 'error',
          value: '',
        },
      });
    }

    // Update state tempProfile
    handleChange(e);
  };

  // Handle save dengan validasi tambahan
  const handleSaveWithValidation = () => {

    if (!validateNameLength(tempProfile.firstName)) {
      handleChange({
        target: {
          name: 'error',
          value: 'First Name must be 32 characters or less.',
        },
      });
      return;
    }
    if (!validateNameLength(tempProfile.lastName)) {
      handleChange({
        target: {
          name: 'error',
          value: 'Last Name must be 32 characters or less.',
        },
      });
      return;
    }

    if (!validateName(tempProfile.firstName)) {
      handleChange({
        target: {
          name: 'error',
          value: 'First Name must contain only alphabets and spaces.',
        },
      });
      return;
    }
    if (!validateName(tempProfile.lastName)) {
      handleChange({
        target: {
          name: 'error',
          value: 'Last Name must contain only alphabets and spaces.',
        },
      });
      return;
    }

    const weightGoalError = validateWeightGoal();
    if (weightGoalError) {
      handleChange({
        target: {
          name: 'error',
          value: weightGoalError,
        },
      });
      return;
    }

    handleSave(); // Lanjutkan penyimpanan jika validasi berhasil
  };

  return (
    <div className="w-full flex flex-col space-y-3 gap-4">
      <div className="flex flex-row space-x-20 sm:space-x-10">
        {/* First Name */}
        <div className="flex flex-col justify-between w-full sm:w-1/2">
          <div className="font-bold text-gray-800 text-lg">First Name</div>
          {isEditing ? (
            <input
              type="text"
              name="firstName"
              value={tempProfile.firstName}
              onChange={handleNameChange}
              className="text-gray-600 text-lg border-b-2 border-gray-300 w-full"
            />
          ) : (
            <div className="text-gray-600 text-lg">{profile.firstName}</div>
          )}
          <hr className="border-t border-gray-200 w-full" />
        </div>

        {/* Last Name */}
        <div className="flex flex-col justify-between w-full sm:w-1/2">
          <div className="font-bold text-gray-800 text-lg">Last Name</div>
          {isEditing ? (
            <input
              type="text"
              name="lastName"
              value={tempProfile.lastName}
              onChange={handleNameChange}
              className="text-gray-600 text-lg border-b-2 border-gray-300 w-full"
            />
          ) : (
            <div className="text-gray-600 text-lg">{profile.lastName}</div>
          )}
          <hr className="border-t border-gray-200 w-full" />
        </div>
      </div>

      {/* Sex */}
      <div className="flex flex-col justify-between">
        <div className="font-bold text-gray-800 text-lg">Sex</div>
        {isEditing ? (
          <select
            name="sex"
            value={tempProfile.sex}
            onChange={handleChange}
            className="text-gray-600 text-lg border-b-2 border-gray-300 w-32"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        ) : (
          <div className="text-gray-600 text-lg">{profile.sex}</div>
        )}
        <hr className="border-t border-gray-200 w-24" />
      </div>

      {/* Age */}
      <div className="flex flex-col justify-between">
        <div className="font-bold text-gray-800 text-lg">Age</div>
        {isEditing ? (
          <input
            type="number"
            name="age"
            value={tempProfile.age}
            onChange={handleChange}
            className="text-gray-600 text-lg border-b-2 border-gray-300 w-20"
          />
        ) : (
          <div className="text-gray-600 text-lg">{profile.age}</div>
        )}
        <hr className="border-t border-gray-200 w-20" />
      </div>

      <div className="flex flex-row justify-start space-x-10">
        {/* Height */}
        <div className="flex flex-col justify-between w-full sm:w-1/2">
          <div className="font-bold text-gray-800 text-lg">Height</div>
          {isEditing ? (
            <input
              type="number"
              name="height"
              value={tempProfile.height}
              onChange={handleChange}
              className="text-gray-600 text-lg border-b-2 border-gray-300 w-full"
            />
          ) : (
            <div className="text-gray-600 text-lg">{profile.height} cm</div>
          )}
          <hr className="border-t border-gray-200 w-full" />
        </div>

        {/* Weight */}
        <div className="flex flex-col justify-between w-full sm:w-1/2">
          <div className="font-bold text-gray-800 text-lg">Weight</div>
          {isEditing ? (
            <input
              type="number"
              name="weight"
              value={tempProfile.weight}
              onChange={handleChange}
              className="text-gray-600 text-lg border-b-2 border-gray-300 w-full"
            />
          ) : (
            <div className="text-gray-600 text-lg">{profile.weight} kg</div>
          )}
          <hr className="border-t border-gray-200 w-full" />
        </div>
      </div>

      <div className="flex flex-row justify-start space-x-10">
        {/* Goal */}
        <div className="flex flex-col justify-between w-full sm:w-1/2">
          <div className="font-bold text-gray-800 text-lg">Goal</div>
          {isEditing ? (
            <select
              name="goal"
              value={tempProfile.goal}
              onChange={handleGoalChange} // Gunakan handleGoalChange untuk perubahan goal
              className="text-gray-600 text-lg border-b-2 border-gray-300 w-full"
            >
              <option value="Lose">Lose Weight</option>
              <option value="Maintain">Maintain Weight</option>
              <option value="Gain">Gain Weight</option>
            </select>
          ) : (
            <div className="text-gray-600 text-lg">{profile.goal}</div>
          )}
          <hr className="border-t border-gray-200 w-full" />
        </div>

        {/* Weight Goal */}
        <div className="flex flex-col justify-between w-full sm:w-1/2">
          <div className="font-bold text-gray-800 text-lg">Weight Goal (kg)</div>
          {isEditing ? (
            <input
              type="number"
              name="weightGoal"
              value={tempProfile.weightGoal}
              onChange={handleChange}
              min="0.1"
              disabled={tempProfile.goal === "Maintain"} // Disable jika goal adalah Maintain
              className={`text-gray-600 text-lg border-b-2 border-gray-300 w-full ${
                tempProfile.goal === "Maintain" ? "bg-gray-100" : ""
              }`}
            />
          ) : (
            <div className="text-gray-600 text-lg">{profile.weightGoal} kg</div>
          )}
          <hr className="border-t border-gray-200 w-full" />
        </div>
      </div>

      <div className="flex flex-row justify-start space-x-10">
        {/* Activity Level */}
        <div className="flex flex-col justify-between w-full sm:w-1/2">
          <div className="font-bold text-gray-800 text-lg">Activity Level</div>
          {isEditing ? (
            <select
              name="ActivityOption"
              value={tempProfile.ActivityOption}
              onChange={handleChange}
              className="text-gray-600 text-lg border-b-2 border-gray-300 w-full"
            >
              <option value="Passive">Passive</option>
              <option value="Lightly Active">Lightly Active</option>
              <option value="Moderately Active">Moderately Active</option>
              <option value="Intensely Active">Intensely Active</option>
            </select>
          ) : (
            <div className="text-gray-600 text-lg">{profile.ActivityOption}</div>
          )}
          <hr className="border-t border-gray-200 w-full" />
        </div>

        {/* Progress per Week */}
        <div className="flex flex-col justify-between w-full sm:w-1/2">
          <div className="font-bold text-gray-800 text-lg">Progress per Week</div>
          {isEditing ? (
            <select
              name="ProgressOption"
              value={tempProfile.ProgressOption}
              onChange={handleChange}
              disabled={tempProfile.goal === "Maintain"}
              className="text-gray-600 text-lg border-b-2 border-gray-300 w-full"
            >
              {tempProfile.goal === "Maintain" && (
                <option value="0.0">0.0 kg / week</option>
              )}
              <option value="0.25">0.25 kg / week</option>
              <option value="0.5">0.5 kg / week</option>
              
            </select>
          ) : (
            <div className="text-gray-600 text-lg">{profile.ProgressOption} kg</div>
          )}
          <hr className="border-t border-gray-200 w-full" />
        </div>
      </div>

      {/* Save/Cancel Buttons */}
      <div className="mt-6 w-full text-center sm:text-left sm:mt-auto">
        {isEditing ? (
          <>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              onClick={handleSaveWithValidation} // Gunakan handleSaveWithValidation
            >
              Save
            </button>
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 ml-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </>
        ) : (
          <div></div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400 w-full text-center mt-4">
          <span className="font-medium">Error!</span> {error}
        </div>
      )}
    </div>
  );
};

export default ProfileForm;