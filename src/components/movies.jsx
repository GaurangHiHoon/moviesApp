import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import "bootstrap/dist/css/bootstrap.css";

import Pagination from "./common/pagination";
import { paginating } from "./common/paginating";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import ShowMovies from "./showMovies";

class Movies extends Component {
  state = {
    movies: getMovies(),
    genres:[{"name":"All",_id:0}, ...getGenres()],
    pageSize: 4,
    currentPage: 1,
    genre:"",
  };
  handleDelete = (e) => {
    console.log(e);
    const data = this.state.movies.filter((m) => m._id !== e._id);
    this.setState({ movies: data });
  };
  handleLike = (m) => {
    console.log("Like Clicked", m.title);
    const movies = [...this.state.movies];
    const index = movies.indexOf(m);
    // movies[index]={...movies[index]};
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreselect = (value) => {
    console.log(value);
    this.setState({genre:value,currentPage:1})
  };

  render() {
    if (this.state.movies.length === 0)
      return <p>There are no movies in the database</p>;
      const filtered=this.state.genre&&this.state.genre._id?this.state.movies.filter(m=>m.genre.name===this.state.genre.name):this.state.movies
    const pageMovies = paginating(
      filtered,
      this.state.pageSize,
      this.state.currentPage
    );
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreselect}
            selectedItem={this.state.genre}
          />
        </div>
        <div className="col-9">
          <p>Showing {pageMovies.length} movies on this page.</p>
          <ShowMovies 
          pageMovies={pageMovies}
          handleLike={this.handleLike} 
          handleDelete={this.handleDelete}
          />
          <Pagination
            current={this.state.currentPage}
            itemsCount={filtered.length}
            pageSize={this.state.pageSize}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
