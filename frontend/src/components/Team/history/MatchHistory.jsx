import { Component } from "react";
import { TablePagination, TableContainer, Table, TableRow, TableCell, TableBody, TableHead, Typography } from "@mui/material";
import MatchRow from "./MatchRow";
/**
 * Component for displaying team's match histories.
 */
export default class MatchHistory extends Component {
  constructor(props) {
    super(props);

    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  }

  /**
     * Handles changing pages on the table.
     * @param {*} event 
     * @param {*} page 
     */
  async handleChangePage(event, page) {
    await this.props.changePage(page + 1);
  }
    
  /**
       * Handles changing row per page
       * @param {*} event 
       */
  handleChangeRowsPerPage(event) {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  }
    
  render() {
    // Styling
    const textColor = "#d1cdc7";
    const styleHeader = {color: textColor, fontWeight: "bold", backgroundColor: "#6d530b"};
    const stylePagination = {color: textColor, backgroundColor: "#1e2a32"};
    const styleCell = {borderBottom: 0};
    const styleTable = {backgroundColor: "#1e2a32"};
        
    return(
      <TableContainer >
        <Typography variant="h5" style={styleHeader}>
                    Match History
        </Typography>
        <Table style={styleTable} size="small">
          <TableHead>
            <TableRow >
              <TableCell align="center" style={styleCell}>
                <Typography variant="h5" fontWeight="bold" color={textColor}>
                                    Date
                </Typography>
              </TableCell>
              <TableCell align="center" style={styleCell}>
                <Typography variant="h5" fontWeight="bold" color={textColor}>
                                    Match Detail
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody size="string">
            {this.props.matches.map((column) => (
              <MatchRow column={column} id={this.props.id} key={column.match_id} />
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[15,]}
          rowsPerPage={15}
          component="div"
          count={200}
          page={this.props.page - 1}
          onPageChange={this.handleChangePage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
          style={stylePagination}
        />
      </TableContainer>
    );
  }
}