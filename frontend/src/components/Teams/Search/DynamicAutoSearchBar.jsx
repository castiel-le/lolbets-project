import { Component } from "react";
import { Autocomplete, TextField } from "@mui/material";

export default class DynamicAutoSearchBar extends Component {
  render() {
    return (
      <Autocomplete
        sx={{backgroundColor: "white"}}
        freeSolo
        disableClearable
        onInputChange={(e) => this.props.onSearch(e.target.value)}
        options={this.props.teams.map((team) => team.team_name)}
        renderInput={(params) => 
          <TextField
            {...params}
            label="Search input"
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
