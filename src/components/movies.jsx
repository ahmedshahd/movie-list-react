import React, { Component } from "react";
import { getMovies } from "../Service/fakeMovieService";
import { getGenres } from "../Service/fakeGenreService";

import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
  };
  componentDidMount() {
    const genres = [{ name: "All Movies" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);

    this.setState({ movies });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      selectedGenre,
      genres,
    } = this.state;
    if (count === 0) return <h2>there are no movies in database</h2>;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;
    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={genres}
            selectedGenre={selectedGenre}
            onGenreSelect={this.handleGenreSelect}
          />
        </div>

        <div className="col">
          <h2>Showing {filtered.length} movies in the database.</h2>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col">stock</th>
                <th scope="col">rate</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => {
                return (
                  <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <Like
                        onLike={() => this.handleLike(movie)}
                        liked={movie.liked}
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => this.handleDelete(movie)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            onPageChange={this.handlePageChange}
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
