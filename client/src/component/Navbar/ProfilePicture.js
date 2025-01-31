import React, { useState, useEffect ,useRef} from 'react';
import pp from '../../assets/images/pp.jpg'

function ProfilePicture() {
    const HandleClick =()=>{
        document.getElementById("dropdownUserAvatarButton").click();
    }

    return (
                <div className='lg:hover:bg-orange-400 px-3.5 lg:flex py-2 group/Login transition ease-in-out lg:py-4 lg:order-2 lg:px-2 lg:items-center font-semibold lg:w-[30%] lg:justify-center '
                onClick={HandleClick}>
                        
                        <button onClick={HandleClick}id="dropdownUserAvatarButton" data-dropdown-toggle="dropdownAvatar" class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" type="button">
                        <span class="sr-only">Open user menu</span>
                        <img class="w-12 h-12 rounded-full" src={pp} alt="user photo"/>
                        </button>
                
                        <div id="dropdownAvatar" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-42 dark:bg-gray-700 dark:divide-gray-600">
                            <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            <div>Bonnie Green</div>
                            <div class="font-medium truncate">name@flowbite.com</div>
                            </div>
                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                            <li>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                            </li>
                            <li>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                            </li>
                            <li>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                            </li>
                            </ul>
                            <div class="py-2">
                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                            </div>
                        </div>
                
                    </div>
    );
  }
  
  export default ProfilePicture;