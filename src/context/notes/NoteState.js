
import { useState} from "react";
import NoteContext from "./NoteContext";

const NoteState= (props)=>{
    const s1={
        "name":"sattu",
        "class":"graduate"
    }
    const [state,setState]=useState(s1);
    const update =()=>{
        setTimeout(() => {
            setState({
                "name":"bacchu",
                "class":"1d"
            })
        }, 1000);
    }
    return (
        <NoteContext.Provider value={{state,update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;