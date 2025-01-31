

  import React,{useState} from "react";
  
  function MeasurementSection(props)
  {
      const [showError, setShowError] = useState(false);
          const thisNext = () => {
              
              if(!props.weight || !props.height)
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
              <h2 class="text-2xl font-bold text-black">Please Fill in the Form Below</h2>
              <p class="text-lg text-gray-600 px-2">
                  These data will be used to calculate how much calories you need!
              </p>
          </div>
      
          <div className="w-full p-4 flex flex-col gap-2 justify-center">
              <div class="text-left font-bold text-black mb-2">Body Measurement</div>
              <label class="sr-only" for="height">Height (in cm)</label>
              <input 
                  id="height" 
                  type="number" 
                  placeholder="Height (in cm)" 
                  class="border border-gray-300 px-4 py-2 mb-2 block w-full rounded-lg focus:ring focus:ring-lime-400 text-gray-800"
                  value={props.firstName}  // Gunakan props.firstName
                  onChange={(e) => props.setHeight(e.target.value)}
                  />
              <label class="sr-only" for="weight">Weight (in kg)</label>
              <input 
                  id="weight" 
                  type="number" 
                  placeholder="Weight (in kg)" 
                  class="border border-gray-300 px-4 py-2 block w-full rounded-lg focus:ring focus:ring-lime-400 text-gray-800"
                  value={props.lastName}  // Gunakan props.lastName
                  onChange={(e) => props.setWeight(e.target.value)} // Update state di Sections
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
  
  export default MeasurementSection;