import { useEffect, useState } from "react";
import { Spinner } from "reactstrap";
import { getCategories, getMovieListByCategory } from "../../api/categories";
import { textWithoutSpace } from "../../utils";
import MovieList from "./MovieList";

const List = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [movieList, setMovieList] = useState({});
  const [categoriesList, setCategoriesList] = useState([]);
  const [scrollLoader, setScrollLoader] = useState(false);

  useEffect(() => {
    getCategories()
      .then((res) => res.json())
      .then((result) => {
        setIsLoaded(true);
        setCategories(result);
        categoryDetails(result);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setScrollLoader(true);
    }
  };

  useEffect(() => {
    const categoriesLength = categoriesList.length;
    categoryDetails(categories, categoriesLength, categoriesLength + 6);
  }, [scrollLoader === true]);

  const categoryDetails = (result, start, end) => {
    const sliceStart = start || 0;
    const sliceEnd = end || 6;
    if (sliceStart === 18) {
      setScrollLoader(false);
      return;
    }
    const requiredArr = result.slice(sliceStart, sliceEnd);
    setScrollLoader(false);
    setCategoriesList((prevState) => [...prevState, ...requiredArr]);
    requiredArr.map((item) => getMovieList(item));
  };

  const getMovieList = (item, pageNumber) => {
    getMovieListByCategory({
      category: item,
      page: pageNumber || 1,
    })
      .then((res) => res.json())
      .then((result) => {
        setMovieListByCategory(item, result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setMovieListByCategory = (item, result) => {
    const categoryName = textWithoutSpace(item);
    const movieObj = movieList[categoryName];
    if (movieObj) {
      movieList[categoryName] = {
        page: result.page,
        list: [...movieObj.list, ...result.data],
      };
    } else {
      movieList[categoryName] = {
        page: result.page,
        list: result.data,
      };
    }
    setMovieList((prevState) => ({ ...prevState, ...movieList }));
  };

  if (error) {
    return (
      <>
        Got an error. Please try again.
        <br />
        Error message: {error.message}
      </>
    );
  } else if (!isLoaded) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner color="light" />
      </div>
    );
  } else {
    return (
        <div>
          {categoriesList.map((item) => (
            <div key={item}>
              <h3>{item}</h3>
              {movieList[textWithoutSpace(item)] && (
                <MovieList
                  movies={movieList[textWithoutSpace(item)]}
                  category={item}
                  getMovieList={getMovieList}
                />
              )}
            </div>
          ))}
        </div>
    );
  }
};

export default List;