import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);
    


    //Get all notes
    const fetchAllNotes = async () => {
        //With API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const result = await response.json();
        setNotes(result);


    }



    //Add a note 
    const addNote = async (title, description, tag) => {
        //With API call
        const res = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const response =await res.json();

        setNotes(notes.concat(response));
    }

    //Delete a note
    const deleteNote = async(id) => {
        //API Call
        const res = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const response = res.json();
        console.log(response);
        
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes)
    }


    //Edit a note
    const editNote = async (id, title, description, tag) => {
        //API CALL
        const res = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const response= await res.json();
        console.log(response);

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
                break;
            }
        }
        setNotes(notes);

    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, fetchAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;