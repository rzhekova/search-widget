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
                {/* this is the coloured rectangle which shows what type of place each result is */}
                {this.formatPlaceType(result.placeType)}
              </span>

              <div>
                <p className="result-name">
                  {/* this is the name of the location */}
                  {result.name}

                  {/* displays the three-letter airport code */}
                  {placeType === "airport" ? ` (${result.iata})` : null}
                </p>

                <p>
                  {/* displays city if result is an airport or station */}
                  {placeType === "airport" || placeType === "station"
                    ? `${result.city}, `
                    : null}

                  {/* displays region if city, statio or district */}
                  {placeType === "city" ||
                  placeType === "station" ||
                  placeType === "district"
                    ? result.region
                      ? `${result.region}, `
                      : null
                    : null}

                  {/* diplays country for every result */}
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
              : [{ name: "Not enough characters" }] // setting the state with this message otherwise search terms with under two characters will still fetch results from the DB
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
