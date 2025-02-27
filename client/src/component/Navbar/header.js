import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate dan Link
import logo from '../../assets/images/LogoPink.png';
import ProfilePicture from './ProfilePicture';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNavbarFixed, setIsNavbarFixed] = useState(false);
    const headerRef = useRef(null);
    const dropdownRef = useRef(null);
    const navigate = useNavigate(); // Inisialisasi useNavigate

    const handleHamburgerClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavigate = (path) => {
        navigate(path); // Navigasi ke path yang diberikan
        setIsMenuOpen(false); // Tutup menu setelah navigasi (opsional)
    };

    const handleDropdownClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (headerRef.current) {
                const fixedNav = headerRef.current.offsetTop;
                setIsNavbarFixed(window.scrollY > fixedNav);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div>
            <header ref={headerRef} className={`w-full navbar-fixed`}>
                <div className="bg-[#f9e1cb] flex justify-between w-full shadow-lg">
                    <div className="flex h-15 items-center py-2 px-3 group/logo hover:cursor-pointer">
                        <img src={logo} alt="LogoPink" className="h-[64px] group-hover/logo:scale-125 transition duration-300 ease-in-out" />
                    </div>
                    <div className="py-2 px-4 flex items-center relative lg:p-0 lg:w-1/2 z-50 justify-between gap-4 lg:gap-0">
                        <ProfilePicture />
                        <button id="hamburger" className={`block lg:hidden ${isMenuOpen ? 'hamburger-activate' : ''} order-2`} onClick={handleHamburgerClick}>
                            <span className="hamburger-line transition ease-in-out origin-top-left"></span>
                            <span className="hamburger-line transition ease-in-out"></span>
                            <span className="hamburger-line transition ease-in-out origin-top-left"></span>
                        </button>
                        <div className={`absolute right-4 top-full w-[200px] rounded-lg shadow-lg bg-orange-100 lg:flex lg:static lg:w-full lg:h-full lg:bg-transparent lg:shadow-none lg:rounded-none ${isMenuOpen ? '' : 'hidden'}`} id="nav-menu">
                            <ul className="w-full h-full cursor-pointer lg:flex">
                                <li className="hover:bg-ourPink px-3.5 flex py-2 group/home transition ease-in-out lg:py-4 lg:px-2 lg:items-center font-semibold lg:w-1/3 lg:justify-center" onClick={() => handleNavigate('/home')}>
                                    <div className="group-hover/home:text-slate-50">Home</div>
                                </li>
                                <li className="hover:bg-ourBlue px-3.5 flex py-2 group/about transition ease-in-out lg:py-4 lg:px-2 lg:items-center font-semibold lg:w-1/3 lg:justify-center" onClick={() => handleNavigate('/about-us')}>
                                    <div className="group-hover/about:text-slate-50">About Us</div>
                                </li>
                                <li className={`flex flex-col px-3.5 hover:bg-ourLime py-2 group/features transition ease-in-out lg:py-4 lg:px-2 lg:items-center font-semibold lg:w-1/3 lg:justify-center lg:relative ${isDropdownOpen ? 'dropdown-activate' : ''}`} id="dropdown-nav" ref={dropdownRef} onClick={handleDropdownClick}>
                                    <p className="group-hover/features:text-slate-50 flex">Features<svg className="w-5 h-5 self-end -rotate-90 group-hover/features:fill-slate-50 group-hover/features:rotate-0 transition duration-300 ease-in-out lg:self-center" fill="#000000" width="800px" height="800px" viewBox="-6.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z"></path>
                                    </svg></p>
                                    <div className={`hidden w-full lg:absolute lg:top-full lg:bg-ourLime lg:rounded-b-lg ${isDropdownOpen ? 'navOpt-activate' : ''}`} id="dropdown-opt">
                                        <Link to="/bmi-calculator" className="px-2 py-3 rounded-sm hover:text-slate-50 block">Health Calculator</Link>
                                        <Link to="/meal-schedule" className="px-2 py-3 rounded-lg hover:text-slate-50 block">Meal Schedule</Link>
                                        <Link to="/calorie-tracker" className="px-2 py-3 rounded-lg hover:text-slate-50 block">Calorie Tracker</Link>
                                        <Link to="/meal-finder" className="px-2 py-3 rounded-lg hover:text-slate-50 block">Meal Finder</Link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
            <div className='h-20'>placeholder</div>
        </div>
    );
}

export default Header;