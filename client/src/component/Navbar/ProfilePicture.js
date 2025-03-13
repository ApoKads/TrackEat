"use client";

import { useState ,useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Dropdown, Flowbite } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Image } from 'cloudinary-react';
import ProfPict from '../../assets/images/pp.jpg';
import warning from '../../assets/images/warning.png';
import { UserContext } from "../UserProvider";

// Definisikan tema kustom
const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary: "bg-red-500 hover:bg-red-600", // Tema kustom untuk tombol
    },
  },
  avatar: {
    root: {
      size: {
        lg: "h-24 w-24", // Sesuaikan ukuran Avatar besar
        md: "h-12 w-12", // Sesuaikan ukuran Avatar sedang
        sm: "h-10 w-10",  // Sesuaikan ukuran Avatar kecil
      },
    },
  },
  dropdown: {
    floating: {
      style: {
        auto: "bg-white border border-gray-200 rounded-lg shadow-sm", // Sesuaikan gaya Dropdown
      },
    },
  },
};

function Test2({ isOpen, onClose }) {

  // const [user,setUser] = useState([]);
  const [showSignOutConfirmation, setShowSignOutConfirmation] = useState(false);
  const { user, loading ,profileImage} = useContext(UserContext); 
  const navigate = useNavigate();
  const cancelSignOut = () => {
    setShowSignOutConfirmation(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
};

  const handleNavigate = (path) => {
    navigate(path); // Navigasi ke path yang diberikan
  };

  if (loading) {
    return <p>Loading...</p>;
  }

//https://res.cloudinary.com/dl5gaqv9e/image/upload/v1741139165/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-removebg-preview_ggsz5v.png
  return (
    <Dropdown
      arrowIcon={false}
      inline
      isOpen={isOpen} // Kontrol apakah Dropdown terbuka atau tertutup
      onClose={onClose} // Tangani ketika Dropdown ditutup
      label={
        <Avatar alt="User settings" className="w-full object-cover" img={profileImage} size="md" rounded />
      }
    >
      <Dropdown.Header>
        <span className="block text-sm">{user.first_name}</span>
        <span className="block truncate text-sm font-medium">{user.google_email? user.google_email:user.email}</span>
      </Dropdown.Header>
          <Dropdown.Item onMouseDown={(e) => {
                e.preventDefault();
                handleNavigate("/profile");
            }}>
                Profile
            </Dropdown.Item>
            {/* <Dropdown.Item onMouseDown={(e) => {
                e.preventDefault();
                handleNavigate("/account-setting");
            }}>
                Account Settings
            </Dropdown.Item> */}
            <Dropdown.Divider />
            <Dropdown.Item onMouseDown={(e) => {
                e.preventDefault();
                handleSignOut();
            }}>
                Sign out
            </Dropdown.Item>

            

    </Dropdown>
  );
}

export default function ProfilePicture() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State untuk mengontrol Dropdown

  // Fungsi untuk membuka/tutup Dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Fungsi untuk menutup Dropdown
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div
      className='px-3.5 lg:flex py-2 group/Login transition ease-in-out lg:py-4 lg:order-2 lg:px-2 lg:items-center font-semibold lg:w-[30%] lg:justify-center'
      onClick={toggleDropdown} // Buka/tutup Dropdown ketika div diklik
    >
      
      
      <Flowbite theme={{ theme: customTheme }}>
        <Test2 isOpen={isDropdownOpen} onClose={closeDropdown} />
      </Flowbite>
    </div>
  );
}