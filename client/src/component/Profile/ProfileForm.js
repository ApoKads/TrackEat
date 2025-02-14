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
  return (
    <div className="w-full flex flex-col space-y-3  gap-4">
            <div className="flex flex-row space-x-20 sm:space-x-10">
        {/* First Name */}
        <div className="flex flex-col justify-between w-full sm:w-1/2">
          <div className="font-bold text-gray-800 text-lg">First Name</div>
          {isEditing ? (
            <input
              type="text"
              name="firstName"
              value={tempProfile.firstName}
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
              className="text-gray-600 text-lg border-b-2 border-gray-300 w-full"
            >
              <option value="Loss Weight">Loss Weight</option>
              <option value="Maintain Weight">Maintain Weight</option>
              <option value="Gain Weight">Gain Weight</option>
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
              className="text-gray-600 text-lg border-b-2 border-gray-300 w-full"
            />
          ) : (
            <div className="text-gray-600 text-lg">{profile.weightGoal} kg</div>
          )}
          <hr className="border-t border-gray-200 w-full" />
        </div>
      </div>


      <div className="flex flex-row justify-start space-x-10">
        {/* Goal */}
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

        {/* Weight Goal */}
        <div className="flex flex-col justify-between w-full sm:w-1/2">
          <div className="font-bold text-gray-800 text-lg">Progress per Week</div>
          {isEditing ? (
            <select
            name="ProgressOption"
            value={tempProfile.ProgressOption}
            onChange={handleChange}
            className="text-gray-600 text-lg border-b-2 border-gray-300 w-full"
          >
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
              onClick={handleSave}
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
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}
    </div>
  );
};

export default ProfileForm;
