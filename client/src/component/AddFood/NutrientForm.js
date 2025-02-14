import React, { useState,useEffect } from "react";

function NutrientForm({
  foodName, setFoodName,
  servingSize, setServingSize,
  description, setDescription,
  calories, setCalories,
  fat, setFat,
  protein, setProtein,
  carbs, setCarbs,
  tempCarbs, setTempCarbs,
  tempProtein, setTempProtein,
  tempFat, setTempFat,
  percentFat, setPercentFat,
  percentCarbs, setPercentCarbs,
  percentProtein, setPercentProtein,
  tempPercentFat, setTempPercentFat,
  tempPercentCarbs, setTempPercentCarbs,
  tempPercentProtein, setTempPercentProtein,
  isEditingPercentage, setIsEditingPercentage,
  isEditingMacro, setIsEditingMacro,isEditingCalories,setIsEditingCalories
})
{


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.target.blur(); // Menghilangkan fokus dari input
    }
  };

  const CalculateMacro = () => {
    const Fat = tempFat === "" ? 0 : tempFat;
    const Protein = tempProtein === "" ? 0 : tempProtein;
    const Carbs = tempCarbs === "" ? 0 : tempCarbs;
    const Calories = Fat * 9 + Protein * 4 + Carbs * 4;
  
    if (Calories === 0) return;    
  
    const FatP = ((Fat * 9) * 100) / Calories;
    const CarbsP = ((Carbs * 4) * 100) / Calories;
    const ProteinP = ((Protein * 4) * 100) / Calories;
    setPercentFat(FatP.toFixed(2));
    setPercentCarbs(CarbsP.toFixed(2));
    setPercentProtein(ProteinP.toFixed(2));
    console.log('finish 2');
  };

    
    const updateTempMacro = (type, value) => {

      if (/^\d*$/.test(value)) {
          if (type === "fat") {
            setTempFat(value);
          } else if (type === "carbs") {
            setTempCarbs(value);
          } else if (type === "protein") {
            setTempProtein(value);
          }
      }
    };
    
   
    const increaseCalories = () => {
      setCalories((prev) => {
          // Jika prev kosong atau bukan angka, atur ke 0 terlebih dahulu
          const currentCalories = prev === "" ? 0 : prev;
          return currentCalories + 100;
      });
      setCarbs((prev)=>{
        const Prev = prev === "" ? 0 : prev;
        return Prev + (percentCarbs)/4;
      })
      setProtein((prev)=>{
        const Prev = prev === ""?0:prev;
        return Prev + (percentProtein)/4;
      })
      setFat((prev)=>{
        const Prev = prev === ""?0:prev; 
        return Prev+ (percentFat)/9;
      })
  };
 
    
      // Fungsi untuk mengurangi kalori
      const decreaseCalories = () => {
        if (calories >= 100) {
          setCalories((prev) => {
            const currentCalories = prev === "" ? 0 : prev;
            return currentCalories - 100;
          });
      
          setCarbs((prev) => {
            const currentCarbs = prev === "" ? 0 : prev;
            const nowCarbs = currentCarbs - (percentCarbs / 4) 
            if(nowCarbs<=0)return 0
            return nowCarbs;
          });
      
          setProtein((prev) => {
            const currentProtein = prev === "" ? 0 : prev;
            const nowProtein = currentProtein - (percentProtein / 4); 
            if(nowProtein<=0)return 0;
            return nowProtein;
          });
      
          setFat((prev) => {
            const currentFat = prev === "" ? 0 : prev;
            const nowFat = currentFat - (percentFat / 9);
            if(nowFat<=0)return 0; 
            return nowFat;
          });
        }else{
          setCalories(0)
          setProtein(0)
          setCarbs(0)
          setFat(0)
        }
      };

      const confirmMacroChange = async() => {
        setFat(tempFat);
        setCarbs(tempCarbs);
        setProtein(tempProtein);
        setIsEditingMacro(false);
        setCalories(tempCarbs*4 + tempProtein * 4 + tempFat*9);
        CalculateMacro(false)
      };
    
      // Fungsi untuk cancel perubahan persentase
      const cancelMacroChange = () => {
        setTempFat(fat);
        setTempCarbs(carbs);
        setTempProtein(protein);
        setIsEditingMacro();
      };

      

      const handleCaloriesChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
          const newCalories = Number(e.target.value); // Ambil nilai baru dari input
          setCalories(newCalories); // Update state calories
        }
      };
  
      const handleCaloriesClick = () => {
        setIsEditingCalories(true); // Masuk mode edit
      };
      
      const handleCaloriesKeyDown = (e) => {
        if (e.key === "Enter") {
          setIsEditingCalories(false); // Keluar mode edit saat Enter ditekan
           // Hitung nilai fat, carbs, dan protein berdasarkan persentase
            const newFat = ((calories * percentFat) / 100) / 9;
            const newCarbs = ((calories * percentCarbs) / 100) / 4;
            const newProtein = ((calories * percentProtein) / 100) / 4;
        
            // Update state fat, carbs, dan protein
            setFat(Number(newFat.toFixed(2))); // Bulatkan ke 2 angka di belakang koma
            setCarbs(Number(newCarbs.toFixed(2)));
            setProtein(Number(newProtein.toFixed(2)));
        }
      };

    return <div className="flex flex-col gap-6">

      {/* Input Kalori */}
      <div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Total Calories</label>
          {isEditingCalories ? (
            <input
              type="number"
              value={calories}
              onChange={handleCaloriesChange} // Handle perubahan nilai
              onKeyDown={handleCaloriesKeyDown} // Handle tombol Enter
              onBlur={() => setIsEditingCalories(false)} // Keluar mode edit saat kehilangan fokus
              autoFocus // Fokus otomatis ke input saat muncul
              className="w-full p-2 border rounded no-spinner"
              // min="0"
            />
          ) : (
            <div
              onClick={handleCaloriesClick} // Masuk mode edit saat diklik
              className="bg-white p-2 min-h-11 cursor-pointer" // Tambahkan cursor-pointer untuk indikasi bisa diklik
              style={{
                boxShadow: "inset 2px 2px 2px rgba(0, 0, 0, 0.15)",
                filter: "drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.1))",
              }}
            >
              {calories}
            </div>
          )}
        </div>


        {/* Tombol Naik/Turun */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={decreaseCalories}
            className="bg-red-500 text-white px-4 py-2 rounded"
            >
            Decrease (-100)
          </button>
          <button
            onClick={increaseCalories}
            className="bg-green-500 text-white px-4 py-2 rounded"
            >
            Increase (+100)
          </button>
        </div>
      </div>

      {/* Hasil Makronutrien */}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Macronutrients</h2>
        {isEditingMacro ? (
          <div className="space-y-2 ">
          <div>
            <label className="block text-sm font-medium mb-1">Fat (g)</label>
            <input
              type="number"
              value={tempFat}
              onChange={(e) => updateTempMacro("fat", e.target.value)}
              className="w-full p-2 border rounded no-spinner"
              onKeyDown={handleKeyDown}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Carbs (g)</label>
            <input
              type="number"
              value={tempCarbs}
              onChange={(e) => updateTempMacro("carbs", e.target.value)}
              className="w-full p-2 border rounded no-spinner"
              onKeyDown={handleKeyDown}

            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Protein (g)</label>
            <input
              type="number"
              value={tempProtein}
              onChange={(e) => updateTempMacro("protein",e.target.value)}
              className="w-full p-2 border rounded no-spinner"
              onKeyDown={handleKeyDown}

            />
          </div>
          <div className="flex gap-4">
              <button
                onClick={confirmMacroChange}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
              <button
                onClick={cancelMacroChange}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
      </div>
        ):(
          <div className="flex flex-col justify-start gap-4">
            <div className="flex flex-col justify-start text-lg font-pop gap-4">
              <div>
                <div className="font-medium">Fat (g) </div>
                <div className="bg-orange-100 p-2 min-h-11 " style={{
                  // border: "1px solid black",
                  boxShadow: "inset 2px 2px 2px rgba(0, 0, 0, 0.15)", // Inner shadow
                  filter: "drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.1))"
                }}>{fat}</div>
              </div>
               
               <div>
                <div className="font-medium">Carbs (g) </div>
                <div className="bg-blue-50 p-2 min-h-11 " style={{
                  boxShadow: "inset 2px 2px 2px rgba(0, 0, 0, 0.15)", // Inner shadow
                  filter: "drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.1))"
                }}>{carbs}</div>
              </div>

              <div>
                <div className="font-medium">Protein (g) </div>
                <div className="bg-green-100 p-2 min-h-11 " style={{
                  boxShadow: "inset 2px 2px 2px rgba(0, 0, 0, 0.15)", // Inner shadow
                  filter: "drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.1))"
                }}>{protein}</div>
              </div>
              
            </div>

            <div className="w-1/2">
              <button
                onClick={() => {
                  setTempCarbs(carbs);
                  setTempFat(fat);
                  setTempProtein(protein);
                  setIsEditingMacro(true);
                }}
                className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${isEditingPercentage?'hidden':'block'}`}
                >
                Edit Macro
              </button>
            </div>
            </div>
          )}
      </div>

      {/* Persentase*/}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Percentage</h2>
        
          <div className="flex flex-col justify-start gap-4">
            <div className="flex justify-start font-pop w-full">
              <div className="flex flex-col justify-center w-1/3 items-center">
                <div className="">Fat (%) </div>
                <div className="bg-orange-100 p-2 min-h-11 w-full text-center" style={{
                  // border: "1px solid black",
                  boxShadow: "inset 2px 2px 2px rgba(0, 0, 0, 0.15)", // Inner shadow
                  filter: "drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.1))"
                }}>{percentFat} %</div>
              </div>
               
               <div className="flex flex-col justify-center w-1/3 items-center">
                <div className="">Carbs (%) </div>
                <div className="bg-blue-50 p-2 min-h-11 w-full text-center" style={{
                  boxShadow: "inset 2px 2px 2px rgba(0, 0, 0, 0.15)", // Inner shadow
                  filter: "drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.1))"
                }}>{percentCarbs} %</div>
              </div>

              <div className="flex flex-col justify-center w-1/3 items-center">
                <div className="">Protein (%) </div>
                <div className="bg-green-100 p-2 min-h-11 w-full text-center" style={{
                  boxShadow: "inset 2px 2px 2px rgba(0, 0, 0, 0.15)", // Inner shadow
                  filter: "drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.1))"
                }}>{percentProtein} %</div>
              </div>
            </div>
          </div>
      
      </div>
      

    </div>
}

export default NutrientForm;