import { useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Button(){

    const [suscribe, setSuscribe]= useState(false);

    return(
        <>
        
        
        <button 
            onClick={()=> {
                toast.success("Felicidades ya estas Inscrito")
                setSuscribe(!suscribe)
            }}className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700"
        
        >
            {
                suscribe? "Ya esta suscrito": "suscribete"

            }
            
            
        </button>
        
        <ToastContainer/>
         
        
        </>
      
    )
}

export default Button