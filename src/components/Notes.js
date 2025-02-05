import React, { useContext,useEffect,useRef,useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';


export default function Notes() {
    const context = useContext(NoteContext);
    const {notes,getNote,editNote} = context;
    useEffect(() => {
      getNote();
      // eslint-disable-next-line
    }, [])
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({id:"", etitle:"",edescription:"",etag:"default"})
    const updateNote = (currentNote)=>{
      ref.current.click();
      setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    }
    const handleClick=(e)=>{
        e.preventDefault();
        editNote(note.id,note.etitle,note.edescription,note.etag); 
        refClose.current.click();
    }
    const onChange=(e)=>{
         setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <>
    <AddNote/>
<button type="button"  ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade"  id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
            <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onChange} minLength={5} required aria-describedby="emailHelp"/>
            </div> 
                <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <input type="text" id="edescription" className="form-control" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input type="text" id="etag" className="form-control" name='etag' value={note.etag} onChange={onChange} />
                </div>
            </form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>
    <div className="row my-3">
      <h2>Your Notes</h2>
      <div className="container">
      {notes.length===0 && "No notes to display here!"}
      </div>
    {
      notes && notes.map((note)=>{
          return <Noteitem key = {note._id} updateNote={updateNote} note = {note}/>
        })
    }
    </div>
    </>
  )
}
