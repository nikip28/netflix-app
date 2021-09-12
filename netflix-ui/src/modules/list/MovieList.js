import { useState } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";

const MovieList = ({ movies, category, getMovieList }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onScroll = (event) => {
    if (
      event.target.scrollLeft + event.target.offsetWidth ===
      event.target.scrollWidth
    ) {
      setIsLoading(true);
      getMovieList(category, movies.page + 1);
      setIsLoading(false);
    }
  };

  return (
      <div
        className="d-flex mb-5 overflow-auto align-items-center"
        onScroll={onScroll}
      >
        {movies.list.map((item) => (
          <div key={item.name + item.id} className="mx-3">
            <div className="small-text d-flex justify-content-end">
              released year: {item.year}
            </div>
            <Link to={{ pathname: "/details", state: { item } }}>
              <img src="https://placehold.jp/450x350.png" alt={item.name} />
            </Link>
            <div className="d-flex align-items-center justify-content-between">
              <div className="movie-name">{item.name}</div>
              <div className="small-text">rating: {item.rating}</div>
            </div>
          </div>
        ))}
        {isLoading && <Spinner color="light" />}
      </div>
  );
};

export default MovieList;
