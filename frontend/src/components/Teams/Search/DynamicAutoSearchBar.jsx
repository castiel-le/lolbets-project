import { Component } from "react";
import { Autocomplete, TextField, Paper } from "@mui/material";

export default class DynamicAutoSearchBar extends Component {
  render() {
    // styling
    const textColor = "#d1cdc7";
    const styleAutocomplete = {borderBottom: 1, borderColor: "#6d530b"};
    const styleTextfield = {input: {color: "#d1cdc7"}, 
      label: {color: "darkgray"}};
    const styleDropdown = {backgroundColor: "#1E2A32", color: textColor};
    return (
      <Autocomplete
        sx={styleAutocomplete}
        freeSolo
        disableClearable
        onInputChange={(element, event) => this.props.onSearch(event)}
        options={this.props.teams.map((team) => team.team_name)}
        PaperComponent={({ children }) => 
          <Paper sx={styleDropdown}>{children}</Paper>
        }
        renderInput={(params) => 
          <TextField
            sx={styleTextfield}
            {...params}
            label="Search"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        }
      />
    );
  }
}
