import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksCard from '../components/home/BooksCard';
import BooksTable from '../components/home/Bookstable';
const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  //http://localhost:5555/books

  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get('https://m648v9hp-5555.inc1.devtunnels.ms/')   
  //     .then((response) => {
  //       setBooks(response.data);   //removed  .data
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
  setLoading(true);
  axios
    .get('https://m648v9hp-5555.inc1.devtunnels.ms/books')
    .then((response) => {
      console.log(" Data from API:", response.data);  // 👈 Add this line
      setBooks(response.data.data);  // or response.data.data based on response
      setLoading(false);
    })
    .catch((error) => {
      console.log(" Error fetching books:", error);
      setLoading(false);
    });
}, []);


  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('table')}
        >
          TABLE
        </button>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('card')}
        >
          CARD
        </button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;