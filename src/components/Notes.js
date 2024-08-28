import React, { useContext, useEffect, useRef,useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, fetchAllNotes } = context;
    useEffect(() => {
        fetchAllNotes()
    },[fetchAllNotes]);
    const ref = useRef(null);
    const [note,setNote]=useState({title:"",description:"",tag:""})

    const updateNote = (currentnote) => {
        ref.current.click();
        setNote(currentnote);
    }

    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})

    }
    return (
        <>
            <AddNote />
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
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" value={note.tag} id="etag" name="etag" onChange={onChange} />
                                </div>
                                 
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <h2 className='my-3'>Your notes</h2>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />;
                })}
            </div>

        </>
    )
}

export default Notes
