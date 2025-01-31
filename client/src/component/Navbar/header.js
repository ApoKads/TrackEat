import React, { useState, useEffect ,useRef} from 'react';
import logo from '../../assets/images/LogoPink.png';
import ProfilePicture from './ProfilePicture';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNavbarFixed, setIsNavbarFixed] = useState(false);
    const dropdownRef = useRef(null);

    const handleHamburgerClick = () => {
        setIsMenuOpen(!isMenuOpen);
      };

    const handleDropdownClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
        // console.log(isDropdownOpen);
        };

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        useEffect(() => {
            // Tambahkan event listener untuk mendeteksi klik di luar dropdown
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                // Hapus event listener saat komponen di-unmount
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, []);

        useEffect(() => {
            const handleScroll = () => {
              const header = document.querySelector('header');
              if (header) { // Check if the header element exists
                const fixedNav = header.offsetTop;
                setIsNavbarFixed(window.scrollY > fixedNav);
              }
            };
        
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
          }, []); 

    return (
      <div >
        <header className={`w-full ${isNavbarFixed ? 'navbar-fixed' : ''}`}>
        <div className="bg-orange-100 flex justify-between w-full shadow-lg">
            <div className="flex h-15 items-center py-2 px-3 group/logo hover:cursor-pointer">
                <img src={logo} alt="LogoPink" className="h-[64px] group-hover/logo:scale-125 transition duration-300 ease-in-out"/>
            </div>
            <div className="py-2 px-4 flex items-center relative lg:p-0 lg:w-1/2 z-50 justify-between gap-4 lg:gap-0">
                <ProfilePicture></ProfilePicture>
                <button id="hamburger" className={`block lg:hidden ${isMenuOpen ? 'hamburger-activate' : ''} order-2`}  onClick={handleHamburgerClick}>
                    <span className="hamburger-line transition ease-in-out origin-top-left"></span>
                    <span className="hamburger-line transition ease-in-out"></span>
                    <span className="hamburger-line transition ease-in-out origin-top-left"></span>
                </button>
                <div className={`absolute right-4 top-full  w-[200px] rounded-lg shadow-lg bg-orange-100 lg:flex lg:static lg:w-full lg:h-full lg:bg-transparent lg:shadow-none lg:rounded-none ${isMenuOpen ? '' : 'hidden'}`}
                id="nav-menu">
                    <ul className="w-full h-full cursor-pointer lg:flex">
                        <li className="hover:bg-ourPink px-3.5 flex py-2 group/home transition ease-in-out lg:py-4 lg:px-2 lg:items-center font-semibold lg:w-1/3 lg:justify-center">
                            <a href="/" className="group-hover/home:text-slate-50">Home</a>
                        </li>
                        <li className="hover:bg-ourBlue px-3.5 flex py-2 group/about transition ease-in-out lg:py-4 lg:px-2 lg:items-center font-semibold lg:w-1/3 lg:justify-center">
                            <a href="/about"  className="group-hover/about:text-slate-50">About Us</a>
                        </li>
                        <li className={`flex flex-col px-3.5 hover:bg-ourLime py-2 group/features transition ease-in-out lg:py-4 lg:px-2 lg:items-center font-semibold lg:w-1/3 lg:justify-center lg:relative ${isDropdownOpen ? 'dropdown-activate': ''}`}
                        id="dropdown-nav" ref={dropdownRef} onClick={handleDropdownClick}>
                            <p className="group-hover/features:text-slate-50 flex">Features<svg className="w-5 h-5 self-end -rotate-90 group-hover/features:fill-slate-50 group-hover/features:rotate-0 transition duration-300 ease-in-out lg:self-center" fill="#000000" width="800px" height="800px" viewBox="-6.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z"></path>
                            </svg></p>
                            <div className={`hidden w-full lg:absolute lg:top-full lg:bg-ourLime lg:rounded-b-lg ${isDropdownOpen ? 'navOpt-activate': ''}`} id="dropdown-opt">
                                <a href="/health-calculator" className="px-2 py-3 rounded-sm hover:text-slate-50">Health Calculator</a>
                                <a href="/meal-schedule" className="px-2 py-3 rounded-lg hover:text-slate-50">Meal Schedule</a>
                                <a href="/calorie-tracker" className="px-2 py-3 rounded-lg hover:text-slate-50">Calorie Tracker</a>
                                <a href="/recipe-finder" className="px-2 py-3 rounded-lg hover:text-slate-50">Recipe Finder</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
      </div>
    );
  }
  
  export default Header;