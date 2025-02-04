import React , {useState} from "react";
import { Link,useNavigate } from 'react-router-dom';
import RegisterAwal from "./RegisterAwal";
import ProtectedRoute from "../Route/ProtectedRoute";

function Register()
{
    return <div className="min-h-screen flex items-center justify-center h-[100vh]">
        <RegisterAwal/>
    </div>
}

export default Register;