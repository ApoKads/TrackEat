import React , {useState}from "react";
import InputNum from "./InputNum";

function AgeInput(){

    const [age,setAge] = useState("")
    return <div>

        <InputNum
            id = "age"
            placeholder={"Enter your age"}
            value = {age}
            setValue={setAge}
        ></InputNum>
    </div>
}

export default AgeInput;