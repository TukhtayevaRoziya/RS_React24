import { Component } from "react";

class SearchForm extends Component<
  { handleSearch: (term: string) => void },
  { searchTerm: string }
> {
  state = {
    searchTerm: "",
  };

  componentDidMount() {
    const lastSearchTerm = localStorage.getItem("lastSearchTerm");
    if (lastSearchTerm) {
      this.setState({ searchTerm: lastSearchTerm });
    }
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.handleSearch(this.state.searchTerm.trim());
    localStorage.setItem("lastSearchTerm", this.state.searchTerm.trim());
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={(e) => this.setState({ searchTerm: e.target.value })}
          placeholder="Enter repository name..."
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default SearchForm;
