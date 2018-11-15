import React, { Component } from "react";

class SearchWidgetForm extends Component {
  state = {
    inputValue: ""
  };

  render() {
    const { inputValue } = this.state;
    return (
      <fieldset>
        <label htmlFor="autocompleteInput">Pick-up Location</label>
        <input
          type="text"
          name="autocompleteInput"
          id="autocompleteInput"
          value={inputValue}
          onChange={event => this.updateInputValue(event.target.value)}
          placeholder="city, airport, region, district..."
          aria-required="true"
          aria-autocomplete="list"
          aria-haspopup="true"
        />
      </fieldset>

      // todo:
      // put fieldset in its own separate component (it should receive updateInputValue function via props)
      // create results component that will receive inputValue via props in order to make api call
    );
  }

  updateInputValue = inputValue => {
    this.setState({ inputValue });
  };
}

export default SearchWidgetForm;
