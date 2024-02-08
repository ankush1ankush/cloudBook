// making api
const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const notes = require('../models/Notes')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');

// first router to fetch all notes from database

router.get('/fetchallnotes',fetchuser,async(req,res)=>{
   try {
     
      const note= await notes.find({user:req.user.id})
    
      res.json(note);

   } catch (error) {
      res.status(500).send("internal server error");
   }
})
// secod router to add a new note using POST 
router.post('/addnote',fetchuser,[
   body('title','Enter a valid title').isLength({min:3}),
   body('description','Enter a good and superb description of min 5 words').isLength({min:5}),
],async(req,res)=>{
   try {
      if(req.isAuthenticated){
      
      const {title,description ,tag} = req.body;
      //console.log(req.user)

      // if there is any error , return bad request  and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }
      // console.log(errors);
      // console.log(req.body)
      const note = new notes({
         title:req.body.title,description:req.body.description,tag:req.body.tag,user:req.user.id
      })

      
      try{
      await note.save()

      res.status(200).json({message:"note added"})
      
      }catch(e)
      {

        res.status(400).json({e});

      }

     

     
    
       
    
    }
     
   } catch (error) {
      res.status(400).send("internal server error");
   }
})
// third  router to update a new note using POST when user is logged in 
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
   try {
      const {title,description,tag} = req.body;
      const newNote = {};
      if (title){newNote.title=title}
      if (description){newNote.description=description}
      if (tag){newNote.tag=tag}
      // finding note and updating by crosschecking who is updating that notes
      let note =await notes.findById(req.params.id);
      // console.log("id >> ",req.params.id);
      if (!note){return res.status(404).send("Not Found")}
      if (note.user.toString()!==req.user.id){
         return res.status(401).send("not allowd");
      }
      note = await notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
      res.json({note})
   } catch (error) {
      res.status(500).send("Server Going to down");
   }
})
router.delete('/delete/:id',fetchuser,async(req,res)=>{
   try {
      let note =await notes.findById(req.params.id);
      if (!note){return res.status(404).send("Not Found")}
      if (note.user.toString()!==req.user.id){
         return res.status(401).send("not allowd");
      }
       note = await notes.findByIdAndDelete(req.params.id);
      res.json({
      "success":"Note has been deleted ",note:note
      });
   } catch (error) {
      res.status(500).send("Server Going to down");
   }
})
module.exports = router;