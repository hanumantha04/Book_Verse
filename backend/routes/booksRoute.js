import express from 'express';
import {Book} from "../models/book-model.js";
const router = express.Router();




router.post('/', async (request,response)=>{
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({message: 'send all the required field: title,author,publishYear'});
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);
        
        return response.status(201).send(book);
    }catch (error){
        console.log(error.message);
        response.status(500).send({error:error.message});

    }

});

// router.get('/', async (request, response) => {
//     try {
//         const books = await Book.find({}); // fetch all books
//         return response.status(200).json(
//     //         {
//     //         count:books.length,
//     //         data:books

        
//     // }
//     book

// ); // send them as JSON


//     } catch (error) {
//         return response.status(500).json({ error: error.message });
//     }
// });




router.get('/', async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});




router.get('/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const book = await Book.findById(id); // fetch all books
        return response.status(200).json(book); // send them as JSON
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
});
router.put('/:id',async (request,response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear

        ){
            return response.status(400).send({message:"send all the required fields"})
        }
        const {id} = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({message:"Book not found"});

        }return response.status(200).json({message:"Book updated successfully"});

    }catch(error){
        console.log(error.message);
        return response.status(500).send({error: error.message});
    }
 });


router.delete('/:id',async (request,response)=>{
    try{
        const {id} =request.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({message:"book not found"});
        }
        return response.status(200).json({message:"Book Deleted successfully"})


    }catch(error){
        console.log(error.message);
        return response.status(500).send({error:error.message});
    }
 });
 
export default router;