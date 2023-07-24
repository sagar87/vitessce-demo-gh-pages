import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = { movies: getMovies() };
  render() {
    const { length: count } = this.state.movies;

    if (count === 0) return <p>There are no movies in the database.</p>;

    return (
      <React.Fragment>
        <p>There are {count} movies in the database.</p>
        {this.renderMovieTable()}
      </React.Fragment>
    );
  }
  renderTotalMovies() {
    const { movies } = this.state;
    if (movies.length == 0) return <p>There are no Movies.</p>;
    return <p>There are {movies.length} movies</p>;
  }
  renderMovieTable() {
    const { movies } = this.state;
    if (movies.length == 0) return <p>There are no Movies.</p>;
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Genre</th>
            <th scope="col">Stock</th>
            <th scope="col">Rate</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
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
          ))}
        </tbody>
      </table>
    );
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };
}

export default Movies;
