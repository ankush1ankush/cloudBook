import React, {useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

export default function Noteitem(props) {
    const {note,updateNote} = props;
    const contex = useContext(NoteContext);
    const {deleteNote} = contex;
    return (
    <div className='container'>
        <div className="col-md-3 my-3">
        <div className="card my-3" >
            <div className="card-body ">
                <h5 className="card-title">{note.title}</h5>
                <i><b><p className="card-text">{note.tag}</p></b></i>
                <p className="card-text">{note.description}</p>
                <i className="fa-solid fa-trash-can mx-2" onClick={()=>{return deleteNote(note._id)}}></i>
                <i className="fa-solid fa-pen-to-square mx-2"onClick={()=>{updateNote(note)}} ></i>     
            </div>
            </div>
            </div>
    </div>
  )
}
