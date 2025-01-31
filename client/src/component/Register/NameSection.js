import React,{useState} from "react";

function NameSection(props)
{
    const [showError, setShowError] = useState(false);
    const thisNext = () => {
        
        if(!props.firstName || !props.lastName)
        {
            setShowError(true)
            return;
        }
        setShowError(false)
        props.onNext()
      };

    return <div class="w-full h-[60vh] up-6 rounded-t-3xl sm:w-[400px] text-center shadow-lg relative overflow-hidden bg-[#FAF6EF] flex flex-col  gap-2" id="step1">

    <div class="w-full h-10 bg-lime-400"></div>
    <div className="flex flex-col gap-1">
        <h2 class="text-2xl font-bold text-black">Hi, there! Glad to see you here</h2>
        <p class="text-lg text-gray-600 mb-4">
            We'd like to know you first!
        </p>
    </div>

    <div className="w-full p-4 flex flex-col gap-2 justify-center">
        <div class="text-left font-bold text-black mb-4">What is your name?</div>
        <label class="sr-only" for="height">First Name</label>
        <input 
            id="firstname" 
            type="text" 
            placeholder="First Name" 
            class="border border-gray-300 px-4 py-2 mb-4 block w-full rounded-lg focus:ring focus:ring-lime-400 text-gray-800"
            value={props.firstName}  // Gunakan props.firstName
            onChange={(e) => props.setFirstName(e.target.value)}
            />
        <label class="sr-only" for="weight">Last Name</label>
        <input 
            id="lastname" 
            type="text" 
            placeholder="Last Name" 
            class="border border-gray-300 px-4 py-2 block w-full rounded-lg focus:ring focus:ring-lime-400 text-gray-800"
            value={props.lastName}  // Gunakan props.lastName
            onChange={(e) => props.setLastName(e.target.value)} // Update state di Sections
            />
        <p id="errortext" ></p>
    </div>

    <div class={`p-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400 w-3/4 self-center text-center ${showError ? 'block' : 'hidden'}`} role="alert">
  <span class="font-medium">Attention!</span> All of the area must be filled.
</div>
{/*  */}
    <div class="flex justify-between items-end flex-1 p-4">
        <button 
            id="backButton1" 
            class="h-12 bg-white text-gray-800 px-6 py-2 rounded-2xl border font-bold border-gray-300 shadow-md hover:bg-gray-100"
            onClick={props.onPrev}
            >
            BACK
        </button>
        <button 
            id="nextButton1" 
            class="h-12 bg-[#A8CE3A] text-white px-6 py-2 rounded-2xl font-bold shadow-md hover:bg-[#96b835]"
            onClick={thisNext}
            >
            NEXT
        </button>
    </div>
</div>
}

export default NameSection;