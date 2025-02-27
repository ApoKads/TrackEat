"use client";

import { useState ,useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Dropdown, Flowbite } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import ProfPict from '../../assets/images/pp.jpg';
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
  const { user, loading } = useContext(UserContext); 
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path); // Navigasi ke path yang diberikan
  };

  if (loading) {
    return <p>Loading...</p>;
  }


  return (
    <Dropdown
      arrowIcon={false}
      inline
      isOpen={isOpen} // Kontrol apakah Dropdown terbuka atau tertutup
      onClose={onClose} // Tangani ketika Dropdown ditutup
      label={
        <Avatar alt="User settings" className=" w-full" img={ProfPict} size="md" rounded />
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
            <Dropdown.Item onMouseDown={(e) => {
                e.preventDefault();
                handleNavigate("/goal");
            }}>
                Account Settings
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onMouseDown={(e) => {
                e.preventDefault();
                handleNavigate("/login");
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