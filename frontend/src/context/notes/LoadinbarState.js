
import { useState } from "react";
import LoadingbarContext from "./LoadingbarContext";

const LoadingbarState = (props) => {
   const [progress,setProgress]=useState(0);

    
    return (
        <LoadingbarContext.Provider value={{progress,setProgress}}>
            {props.children}
        </LoadingbarContext.Provider>
    )
}

export default LoadingbarState;
