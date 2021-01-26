import React, { Component } from "react";
import { getMovies } from "../Service/fakeMovieService";
class Movies extends Component {
  state = {
    movies: getMovies(),
  };
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);

    this.setState({ movies });
  };
  render() {
    const { length: count } = this.state.movies;
    if (count === 0) return <h2>there are no movies in database</h2>;

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
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => {
              return (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
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
      </main>
    );
  }
}

export default Movies;
