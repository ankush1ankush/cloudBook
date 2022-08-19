// Is puri web site ko apni ghumen ki list mai change karna hai
import { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props)=>{

  const host = "http://localhost:5000";
    const noteInitial = []
      const [notes,setNotes] = useState(noteInitial);
      // Add a Note
      const addNote= async(title,description,tag)=>{
        //api call
        const response = await fetch(`${host}/api/notes/addnote`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlZmJkNDAyODRjZDc2YTQ5MTU4OTBiIn0sImlhdCI6MTY1OTg4NDU1NX0.1N1EaEX5yl1JXo5sZXCd44j77VjxapQDPzH9UnzL8yw"
          },
          body:JSON.stringify({title,description,tag})
});
      const json = await response.json();
 

        console.log("Adding a new note >>> ", json);
        const note = {
          "_id": `${json._id}`,
          "user": json.user,
          "title": title,
          "description": description,
          "tag": tag,
          "date": json.date,
          "__v": 0
        };
        setNotes(notes.concat(note))
}

    //  get note in this way
      const getNote= async()=>{
        //api call
        const response = await fetch(`${host}/api/notes/fetchallnotes`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlZmJkNDAyODRjZDc2YTQ5MTU4OTBiIn0sImlhdCI6MTY1OTg4NDU1NX0.1N1EaEX5yl1JXo5sZXCd44j77VjxapQDPzH9UnzL8yw"
          }
        });
        const json = await response.json();
        // console.log(json);
        setNotes(json);
      }
      // dElete note
      const deleteNote= async(id)=>{
        // api call here for delete note from database
        const response = await fetch(`${host}/api/notes/delete/${id}`,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlZmJkNDAyODRjZDc2YTQ5MTU4OTBiIn0sImlhdCI6MTY1OTg4NDU1NX0.1N1EaEX5yl1JXo5sZXCd44j77VjxapQDPzH9UnzL8yw"
          }
        });
        const json = await response.json();
        console.log(json);
        const newNote = notes.filter((note)=>{return note._id!==id})
        setNotes(newNote);
      }
      // Upadate a Note
      const editNote= async(id,title,description,tag)=>{
        //api Call

        // conosle.log(JSON.stringify(title,description,tag));

        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlZmJkNDAyODRjZDc2YTQ5MTU4OTBiIn0sImlhdCI6MTY1OTg4NDU1NX0.1N1EaEX5yl1JXo5sZXCd44j77VjxapQDPzH9UnzL8yw"
          },
          
          body: JSON.stringify({title,description,tag}) 
        })
        // const json = await response.json();
        // console.log(json)
      
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < notes.length; index++) {
          const element = newNotes[index];
          if (element._id===id){
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
        }
        setNotes(newNotes);
}



    return (
        <NoteContext.Provider value = {{notes,addNote,deleteNote,editNote,getNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;
