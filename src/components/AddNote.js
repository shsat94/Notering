import React, { useState, useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

const AddNote = () => {
    const context = useContext(NoteContext);
    const {addNote} = context;
    const [note,setNote]=useState({title:"",description:"",tag:"Default"})

    const handleAdd=(e)=>{
        e.preventDefault(); 
        addNote(note.title,note.description,note.tag);
    }

    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})

    }
    return (
        <div>
            <div className='container my-3'>
                <h2>Add a note</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="tit" className="form-label">Title</label>
                        <input type="text" className="form-control" id="tit" name="title" aria-describedby="emailHelp" onChange={onChange}/>
                        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="desc" className="form-label">Description</label>
                        <input type="textarea" className="form-control" id="desc" name="description" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary"onClick={handleAdd}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
