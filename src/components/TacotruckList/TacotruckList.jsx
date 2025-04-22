// src/components/TacotruckList/TacotruckList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './TacotruckList.module.css';

const TacotruckList = (props) => {
  // Fallback while loading or if data isn't an array yet
  if (!Array.isArray(props.tacotrucks)) {
    return <p>Loading taco trucks...</p>;
  }

  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  return (
    <main className={styles.container}>
      {props.tacotrucks.map((tacotruck) => (
        <article key={tacotruck._id} className={styles.card}>
          {/* Heart button in top-right corner */}
          <button
            className={styles.heartBtn}
            onClick={(e) => {
              e.preventDefault(); // stop navigation
              toggleFavorite(tacotruck._id);
            }}
          >
            {favorites.includes(tacotruck._id) ? '❤️' : '🤍'}
          </button>

          <header>
            <h2>{tacotruck.title}</h2>
            <p>
              {tacotruck.author
                ? `${tacotruck.author.username}`
                : 'Unknown author'}
            </p>
          </header>
          <p>{tacotruck.text}</p>
          <Link to={`/tacotrucks/${tacotruck._id}`}>View Details</Link>
        </article>
      ))}
    </main>
  );
};

export default TacotruckList;
