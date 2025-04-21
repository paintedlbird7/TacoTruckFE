// src/components/TacotruckDetails/TacotruckDetails.jsx
import { useParams, Link } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import * as tacotruckService from '../../services/tacotruckService';
import CommentForm from '../CommentForm/CommentForm';
import { UserContext } from '../../contexts/UserContext';
import './TacotruckDetails.css';


const TacotruckDetails = (props) => {
  const { user } = useContext(UserContext);
  const [tacotruck, setTacotruck] = useState(null);
  const { tacotruckId } = useParams();
  console.log('tacotruckId', tacotruckId);
  useEffect(() => {
    const fetchTacotruck = async () => {
      const tacotruckData = await tacotruckService.show(tacotruckId);
      setTacotruck(tacotruckData);
    };
    fetchTacotruck(); // this will run when the effect function runs when we have a tacotruckID
  }, [tacotruckId]);

  // Verify the tacotruck state is set correctly:
  console.log('tacotruck state:', tacotruck);
  if (!tacotruck) return <main>Loading...</main>;

  const handleAddComment = async (commentFormData) => {
    // console.log('commentFormData', commentFormData);
    const newComment = await tacotruckService.createComment(tacotruckId, commentFormData);
    setTacotruck({ ...tacotruck, comments: [...tacotruck.comments, newComment] });
  };


  // return <main>TacotruckDetails</main>;
  return (
    <main>
      <section>
        <header>
          {/* <p>{tacotruck.category.toUpperCase()}</p> */}
          <h1>{tacotruck.title}</h1>
          {/* <p>
                {`${tacotruck.author.username} posted on
                ${new Date(tacotruck.createdAt).toLocaleDateString()}`}
              </p> */}

          {/* {tacotruck.author._id === user._id && (
              <>
            <Link to={`/tacotrucks/${tacotruckId}/edit`}>Edit</Link>

            <button onClick={() => props.handleDeleteTacotruck(tacotruckId)}>
              Delete
            </button>              </>
            )} */}
          {tacotruck.author?._id === user._id && (
            <>
              <Link to={`/tacotrucks/${tacotruckId}/edit`}>Edit</Link>
              <button onClick={() => props.handleDeleteTacotruck(tacotruckId)}>
                Delete
              </button>
            </>
          )}


        </header>
        <p>{tacotruck.text}</p>
      </section>
      <section>
        <h2>Comments</h2>
        {/* Make use of the CommentForm component */}
        <CommentForm handleAddComment={handleAddComment} />

        {!tacotruck.comments.length && <p>There are no comments.</p>}

        {tacotruck.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              {/* <p>
                {`${comment.author.username} posted on
                ${new Date(comment.createdAt).toLocaleDateString()}`}
              </p> */}
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>

    </main>
  );

};



export default TacotruckDetails;
