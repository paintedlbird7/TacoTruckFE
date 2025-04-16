// src/components/TacotruckList/TacotruckList.jsx
import { Link } from 'react-router';


const TacotruckList = (props) => {


  return (
    <main>
      {props.tacotrucks.map((tacotruck) => (
        <Link key={tacotruck._id} to={`/tacotrucks/${tacotruck._id}`}>
          <article>
            <header>
              <h2>{tacotruck.title}</h2>
              <p>
                {/* {`${tacotruck.author.username} posted on
                ${new Date(tacotruck.createdAt).toLocaleDateString()}`} */}
                {tacotruck.author
                  ? `${tacotruck.author.username}` 
                  // posted on ${new Date(tacotruck.createdAt).toLocaleDateString()}`
                  : 'Unknown author'}

              </p>
            </header>
            <p>{tacotruck.text}</p>
          </article>
        </Link>
      ))}
    </main>
  );
};


export default TacotruckList;
