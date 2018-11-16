import React from "react";

const InputField = ({ updateInputValue, inputValue }) => {
  return (
    <fieldset>
      <label htmlFor="autocompleteInput">Pick-up Location</label>
      <input
        type="text"
        name="autocompleteInput"
        id="autocompleteInput"
        value={inputValue}
        onChange={event => updateInputValue(event.target.value)}
        placeholder="city, airport, region, district..."
        aria-required="true"
        aria-autocomplete="list"
        aria-haspopup="true"
      />
    </fieldset>
  );
};

export default InputField;
