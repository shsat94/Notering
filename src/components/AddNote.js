import React, { useState, useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const {addNote} = context;
    const [note,setNote]=useState({title:"",description:"",tag:""})

    const handleAdd=(e)=>{
        e.preventDefault(); 
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        props.showAlert("Added Successfully","success");
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
                        <input type="text" className="form-control" id="tit" value={note.title} name="title" aria-describedby="emailHelp" onChange={onChange}/>
                        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="desc" className="form-label">Description</label>
                        <input type="textarea" className="form-control"  value={note.description}id="desc" name="description" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag"  value={note.tag}name="tag" onChange={onChange} />
                    </div>
                    <button type="submit" disabled={note.title.length<5 || note.description.length<5}  className="btn btn-primary"onClick={handleAdd}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
