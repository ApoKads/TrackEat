import React , {useState,useEffect} from "react";
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import FireLoginLogo from '../../assets/images/Logo/Track.png'
import GoogleLogo from '../../assets/svg/GoogleLoginIcon.svg'

const colors = ['ourLime','ourBlue', 'ourPink', 'ourOrange'];


const RegisterAwal = ()=>
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showError, setShowError] = useState(false);
    const [currentColor, setCurrentColor] = useState(colors[0]);
    
    const navigate = useNavigate();

    

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        
        if (password.length < 10) {
            setMessage('Password must be at least 10 characters long.');
            setShowError(true);
            return;
        }

        try {
            console.log(email, password); // Log email dan password untuk debugging
            const response = await axios.post('/user/register', { email, password });
            if (response.status === 200 || response.status === 201) {
                const token = response.data.token; // Ambil token dari respons
                localStorage.setItem('token', token); // Simpan token di localStorage
                console.log(token); // Log token untuk debugging
                navigate('/Section'); // Arahkan pengguna ke halaman login setelah registrasi berhasil
            }
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.error || 'Registration failed');
            } else {
                setMessage('Something went wrong. Please try again.');
            }
            setShowError(true);
        }
    };

    useEffect(() => {
            const intervalId = setInterval(() => {
              const currentIndex = colors.indexOf(currentColor);
              const nextIndex = (currentIndex + 1) % colors.length;
              setCurrentColor(colors[nextIndex]);
            }, 2000);
        
            return () => clearInterval(intervalId);
          }, [currentColor]);

       return <div className="flex flex-col bg-white md:flex-row md:h-[500px] h-full w-full shadow-lg rounded-lg border-2 border-gray-300 md:w-2/3 overflow-hidden">  
        
            <div className={`bg-${currentColor} text-white flex flex-col items-center justify-center w-full md:w-[45%] md:h-full md:rounded-tr-3xl md:shadow-[6px_0_8px_-1px_rgba(0,0,0,0.1)] md:space-y-10 transition duration-300 ease-in-out`}>
                <img src={FireLoginLogo} alt="TrackEat Logo" className="w-60 h-60 md:w-40 md:h-40 lg:w-60 lg:h-60"/>
                <h1 className="text-xl md:text-2xl font-bold text-center font-poppins flex justify-start items-start">
                    Welcome to TrackEat.
                </h1>
            </div>
        
            <div className="lg:w-4/5 w-full p-6 flex flex-col items-center justify-center">
            
            <div className="space-x-4 flex flex-row w-3/4">
            
            <button
                    onClick={() => window.location.href = 'http://localhost:3000/user/auth/google'}
                    className="flex items-center justify-center w-full px-4 py-2 border-2 border-gray-300 bg-white text-black rounded-md shadow hover:shadow-lg transition-shadow"
                >
                    <img src={GoogleLogo} alt="Google Logo" className="h-5 w-5 mr-2" /> Create Account with Google
            </button>

            </div>

            <div className="my-6 text-center text-gray-500">- OR -</div>


            <form onSubmit={handleRegisterSubmit} id="createAccountForm" className=" w-3/4 flex flex-col">
                <div className="space-y-4">
                <input type="email" id ="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-lime-400" required/>
                <input type="password" id="password" name="password" placeholder="Create Password" value={password} onChange={(e) => setPassword(e.target.value)}  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-lime-400" required/>
                </div>
                <p className="text-xs text-gray-500 mt-2">Must be at least 10 characters, no spaces.</p>

                {/* Error Message */}
                {showError && (
                        <div className="p-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span className="font-medium">Error!</span> {message}
                        </div>
                )}
                

                <div className="flex flex-col items-center justify-center">
                <button type="submit" id="createAccountButton" className="w-full bg-white text-black py-2 px-4 mt-4 rounded-lg border-2 border-gray-300 justify-center shadow hover:bg-lime-500 hover:text-white transition ease-in-out delay-100">Create Account</button>
                </div>
            </form>
            </div>
        </div>
}

export default RegisterAwal;