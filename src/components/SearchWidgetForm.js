import React, { Component } from "react";
import InputField from "./InputField";
import Results from "./Results";

class SearchWidgetForm extends Component {
  state = {
    inputValue: ""
  };

  render() {
    const { inputValue } = this.state;
    return (
      <div>
        <InputField updateInputValue={this.updateInputValue} />
        <Results inputValue={inputValue} />
      </div>
    );
  }

  updateInputValue = inputValue => {
    this.setState({ inputValue });
  };
}

export default SearchWidgetForm;
