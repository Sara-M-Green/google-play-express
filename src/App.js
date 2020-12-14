import React, { Component } from 'react';
import PlayStore from './playStore/playStore';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apps: [],
      sort: '',
      genre: '',
      error: 'null'
    }
  }

  setSort(sort) {
    this.setState({
      sort
    });
  }

  setGenre(genre) {
    this.setState({
      genre
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const baseURL = 'http://localhost:8000/apps';
    const params = [];
    if(this.state.sort) {
      params.push(`sort=${this.state.sort}`)
    }
    if(this.state.genre) {
      params.push(`genre=${this.state.genre}`)
    }
    const query = params.join('&');
    const url = `${baseURL}?${query}`;

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          apps: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: 'Sorry, could not find apps at this time'
        })
      })
  }

  render(){
    const apps = this.state.apps.map((app, i) => {
      return <PlayStore {...app} key={i} />
    })
    return (
      <div className="reactApp">
        <h1>Google Play Store</h1>
        <div className="search">
          <form onSubmit={e => this.handleSubmit(e)}>
            
            <label htmlFor="sort">Sort: </label>
            <select id="sort" name="sort" onChange={e => this.setSort(e.target.value)}>
              <option value="">None</option>
              <option value="Rating">Rating</option>
              <option value="App">App</option>
            </select>

            <label htmlFpr="genre">Genre: </label>
            <select id="genre" name="genre" onChange={e => this.setGenre(e.target.value)}>
              <option value="">None</option>
              <option value="Action">Action</option>
              <option value="Puzzle">Puzzle</option>
              <option value="Strategy">Strategy</option>
              <option value="Casual">Casual</option>
              <option value="Arcade">Arcade</option>
              <option value="Card">Card</option>
            </select>
            <button type="submit">Search</button>
          </form>
          <div className="error">{ this.state.error }</div>
        </div>
        {apps}
      </div>
    );
  }
}

export default App;
