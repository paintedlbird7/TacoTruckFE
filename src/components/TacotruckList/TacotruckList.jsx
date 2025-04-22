// src/components/TacotruckList/TacotruckList.jsx
import { Link } from 'react-router-dom'; // ✅ Fix import path
import styles from './TacotruckList.module.css';

const TacotruckList = (props) => {
  // Fallback while loading or if data isn't an array yet
  if (!Array.isArray(props.tacotrucks)) {
    return <p>Loading taco trucks...</p>;
  }

  return (
    <main className={styles.container}>
      {props.tacotrucks.map((tacotruck) => (
        <Link key={tacotruck._id} to={`/tacotrucks/${tacotruck._id}`}>
          <article>
            <header>
              <h2>{tacotruck.title}</h2>
              <p>
                {tacotruck.author
                  ? `${tacotruck.author.username}`
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
