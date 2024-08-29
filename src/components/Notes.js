import React, { useContext, useEffect, useRef,useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    let navigate =useNavigate();
    const context = useContext(NoteContext);
    const { notes, fetchAllNotes,editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            fetchAllNotes()
        }
        else{
            navigate('/login');
        }
    },[fetchAllNotes,navigate]);
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note,setNote]=useState({_id:"",title:"",description:"",tag:""})

    const updateNote = (currentnote) => {
        ref.current.click();
        setNote(currentnote);
        
    }
    const handleClick=(e)=>{
        e.preventDefault();
        editNote(note._id,note.title,note.description,note.tag);
        props.showAlert("Updated Successfully","success");
        refClose.current.click();
    }

    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})

    }
    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etit" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etit" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="desc" className="form-label">Description</label>
                                    <input type="textarea" value={note.description} className="form-control" id="desc" name="description" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" value={note.tag} id="tag" name="tag" onChange={onChange} />
                                </div>
                                 
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.title.length<5 || note.description.length<5}  type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <h2 className='my-3'>Your notes</h2>
                <div className="container">
                {notes.length===0 && 'No notes to display'}
                </div>
                {notes && notes.map((note) => {
                    return <NoteItem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />;
                })}
            </div>
            

        </>
    )
}

export default Notes
