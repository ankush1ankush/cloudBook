
import React, {useContext, useState } from 'react'
 import NoteContext from '../context/notes/NoteContext';
 const AddNote = () => {
    const contex = useContext(NoteContext);
    const {addNote} = contex;
    const [note, setNote] = useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
        e.preventDefault();
         addNote(note.title,note.description,note.tag);
         setNote({title:"",description:"",tag:""});
    }
    const onChange=(e)=>{
         setNote({...note,[e.target.name]:e.target.value})
    }
   return (
     <div>
        <div className="container">
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">title</label>
                    <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onChange} aria-describedby="emailHelp"/>
                </div> 
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" id="description" className="form-control" value={note.description} name='description' onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" id="tag" className="form-control" value={note.tag} name='tag' onChange={onChange}/>
                </div>
                <button type="submit" onClick={handleClick} className="btn btn-primary">Add Note</button>
            </form>
      </div>
     </div>
   )
 }
 
 export default AddNote;