import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = { movies: getMovies() };
  render() {
    return (
      <div>
        {this.renderTotalMovies()}
        {this.renderMovieTable()}
      </div>
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
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>SomeGenre</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  handleDelete = (movie) => {
    return null;
  };
}

export default Movies;
