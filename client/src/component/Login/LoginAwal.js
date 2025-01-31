import React , {useState,useEffect} from "react";
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

import FireLoginLogo from '../../assets/images/Logo/Track.png'
import GoogleLogo from '../../assets/svg/GoogleLoginIcon.svg'
const colors = ['ourLime','ourBlue', 'ourPink', 'ourOrange'];

const LoginAwal = () =>
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showError, setShowError] = useState(false);

    const [currentColor, setCurrentColor] = useState(colors[0]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
        console.log(email,password)
          const response = await axios.post('/login', { email, password });
          if (response.status === 200) {
            const token = response.data.token; // Ambil token dari respons
            localStorage.setItem('token', token);
            console.log(token)
            navigate('/about-us');
          }
        } catch (error) {
          if (error.response) {
            setMessage(error.response.data.message || 'Login failed');
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

       return <div class="flex flex-col bg-white md:flex-row md:h-[500px] h-full w-full shadow-lg rounded-lg border-2 border-gray-300 md:w-2/3 overflow-hidden">  
        
            <div className={`bg-${currentColor} text-white flex flex-col items-center justify-center w-full md:w-[45%] md:h-full md:rounded-tr-3xl md:shadow-[6px_0_8px_-1px_rgba(0,0,0,0.1)] md:space-y-10 transition duration-300 ease-in-out`}>
                <img src={FireLoginLogo} alt="TrackEat Logo" class="w-60 h-60 md:w-40 md:h-40 lg:w-60 lg:h-60"/>
                <h1 class="text-xl font-bold text-center font-poppins flex justify-start items-start md:text-2xl">
                    Welcome to TrackEat.
                </h1>
            </div>
        
            <div class="lg:w-4/5 w-full p-6 flex flex-col items-center justify-center">
            
            <div class="space-x-4 flex flex-row w-3/4">
            
                <Link className="w-full">
                    <button class="flex items-center justify-center w-full px-4 py-2 border-2 border-gray-300 bg-white text-black rounded-md shadow hover:shadow-lg transition-shadow">
                    <img src={GoogleLogo} alt="Google Logo" class="h-5 w-5 mr-2"/> Login with Google
                    </button>
                </Link>
            </div>

            <div class="my-6 text-center text-gray-500">- OR -</div>


            <form onSubmit={handleSubmit} className=" w-3/4 flex flex-col">
                <div class="space-y-4">
                <input type="email" id ="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email Address" class={`w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-ourLime`}/>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create Password" class={`w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-ou`} required/>
                </div>
                <p class="text-xs text-gray-500 mt-2">Must be at least 10 characters, no spaces.</p>

                {/* Error Message */}
                <div
                className={`p-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 ${showError ? 'flex sm:flex-row' : 'hidden'} flex-col items-center gap-1`}
                role="alert"
                id="MessageError"
            >
                <span className="font-medium">Login Failed!</span> {message}
            </div>
                
                

                <div class="flex flex-col items-center justify-center">
                <button type="submit" id="LoginButton" class={`w-full bg-white text-black py-2 px-4 mt-4 rounded-lg border-2 border-gray-300 justify-center shadow hover:bg-lime-500 hover:text-white transition ease-in-out delay-100`}>Login</button>
                <Link className="w-full" to='/register'>
                    <button type="button" id="createAccountButton" class={`w-full bg-white text-black py-2 px-4 mt-4 rounded-lg border-2 border-gray-300 justify-center shadow hover:bg-lime-500 hover:text-white transition ease-in-out delay-100`}>Create Account</button>
                </Link>
                </div>
            </form>
            </div>
        </div>
}

export default LoginAwal;