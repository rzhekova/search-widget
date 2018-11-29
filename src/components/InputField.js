import React from "react";

const InputField = ({ updateInputValue }) => {
  return (
    <fieldset>
      <label htmlFor="autocompleteInput">Pick-up Location</label>
      <input
        type="text"
        name="autocompleteInput"
        id="autocompleteInput"
        onChange={event => updateInputValue(event.target.value)}
        placeholder="city, airport, region, district..."
        aria-required="true"
        aria-autocomplete="list"
        aria-haspopup="true"
        required
      />
    </fieldset>
  );
};

export default InputField;
