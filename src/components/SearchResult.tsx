import { Component } from "react";
import { Repository } from "./types";

class SearchResults extends Component<{ results: Repository[] }, object> {
  render() {
    const { results } = this.props;
    return (
      <div>
        {results.map((repo) => (
          <div key={repo.name}>
            <h3>{repo.name}</h3>
            <p>{repo.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default SearchResults;
