
import { Component } from 'react';
import SearchResults from './components/SearchResult';
import SearchForm from './components/SearchForm';
import ErrorBoundary from './components/ErrorBoundary';

class App extends Component {
  state = {
    searchTerm: '',
    results: [],
    error: null,
  };

  fetchData = async (searchTerm:string) => {
    console.log
    try {
      let url = 'https://swapi.dev/api/people/';
      if (searchTerm) {
        url += `?search=${encodeURIComponent(searchTerm)}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.setState({ results: data.results });
    } catch (error) {
      this.setState({ error });
      console.error('Error fetching data:', error);
    }
  };

  componentDidMount() {
    const lastSearchTerm = localStorage.getItem('lastSearchTerm');
    if (lastSearchTerm) {
      this.setState({ searchTerm: lastSearchTerm });
      this.fetchData(lastSearchTerm);
    } else {
      this.fetchData('');
    }
  }

  handleSearch = (searchTerm:string) => {
    this.setState({ searchTerm });
    this.fetchData(searchTerm);
  };

  handleThrowError = () => {
    throw new Error('Test error');
  };

  render() {
    const { results, error } = this.state;

    return (
      <ErrorBoundary>
        <div>
          <h1>Star Wars Character Search</h1>

          <SearchForm handleSearch={this.handleSearch} />
          {error ? (
            <div>
              <p>Something went wrong. Please try again later.</p>
              <button onClick={this.handleThrowError}>Throw Error (for testing)</button>
            </div>
          ) : (

            <SearchResults results={results} />
          )}
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;


