import React, { Component } from "react";
import { debounce } from "lodash";
import axios from "axios";

class Results extends Component {
  state = {
    results: []
  };

  componentDidUpdate(prevProps) {
    const { inputValue } = this.props;
    // let timeoutID = null;
    if (prevProps.inputValue !== inputValue) {
      this.debouncedFetchLocations(inputValue);
      // clearTimeout(timeoutID);
      // timeoutID = setTimeout(this.fetchLocations(inputValue), 1000);
    }
  }

  render() {
    const { results } = this.state;
    return results.length && results[0].name !== "Not enough characters" ? (
      <ul role="listbox">
        {results.map(result => {
          const placeType = this.formatPlaceType(
            result.placeType
          ).toLowerCase();
          return result.name === "No results found" ? (
            <li className="no-results" key={result.name}>
              No results found
            </li>
          ) : (
            <li key={result.placeKey}>
              <span className={placeType}>
                {this.formatPlaceType(result.placeType)}
              </span>
              <div>
                <p className="result-name">
                  {result.name}
                  {placeType === "airport" ? ` (${result.iata})` : null}
                </p>
                <p>
                  {placeType === "airport" || placeType === "station"
                    ? `${result.city}, `
                    : null}
                  {placeType === "city" ||
                  placeType === "station" ||
                  placeType === "district"
                    ? result.region
                      ? `${result.region}, `
                      : null
                    : null}
                  {result.country}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    ) : null;
  }

  fetchLocations = searchTerm => {
    const URL = `https://cors.io/?https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=6&solrTerm=${searchTerm}`;

    axios
      .get(URL)
      .then(({ data }) => {
        this.setState({
          results:
            searchTerm.length >= 2
              ? data.results.docs
              : [{ name: "Not enough characters" }]
        });
      })
      .catch(error => console.log(error));
  };

  formatPlaceType = placeType => {
    if (placeType === "C") {
      return "City";
    } else if (placeType === "T") {
      return "Station";
    } else if (placeType === "A") {
      return "Airport";
    } else if (placeType === "D") {
      return "District";
    } else {
      return "Place";
    }
  };

  debouncedFetchLocations = debounce(this.fetchLocations, 250);
}

export default Results;
