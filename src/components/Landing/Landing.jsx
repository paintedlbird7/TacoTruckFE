import { Link } from 'react-router-dom';
const Landing = (props) => {
  console.log('Landing props:', props); // Log to check taco trucks data
  return (
    <main>
       <h1>Hello, you are on the landing page for visitors.</h1>
       <p>Sign up now, or sign in to see your super secret dashboard!</p>
      {props.tacotrucks?.map((tacotruck) => (
        <Link key={tacotruck._id} to={`/tacotrucks/${tacotruck._id}`}>
          <article>
            <header>
              <h2>{tacotruck.title}</h2>  {/* Ensure this is the correct field */}
              <p>
                {tacotruck.author ? tacotruck.author.username : 'Unknown author'}
              </p>
              {/* Check if the date exists */}
              <p>{new Date(tacotruck.createdAt).toLocaleDateString()}</p>
            </header>
            <p>{tacotruck.text}</p>  {/* Ensure this field exists */}
          </article>
        </Link>
      ))}
    </main>
  );
};


export default Landing;
