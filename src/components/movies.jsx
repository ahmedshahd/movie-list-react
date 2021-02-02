import React, { Component } from "react";
import { getMovies } from "../Service/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
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
    const { currentPage, pageSize, movies: allMovies } = this.state;
    if (count === 0) return <h2>there are no movies in database</h2>;
    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <main className="container ">
        <h2>Showing {count} movies in the database.</h2>
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
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
        />
      </main>
    );
  }
}

export default Movies;
