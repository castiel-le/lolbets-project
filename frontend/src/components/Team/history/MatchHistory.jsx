import { Component } from "react";
import { TablePagination, TableContainer, Table, TableRow, TableCell, TableBody, TableHead, Typography, Box } from "@mui/material";
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
        console.log(page);
        await this.props.changePage(page);
      };
    
      /**
       * Handles changing row per page
       * @param {*} event 
       */
    handleChangeRowsPerPage(event) {
        this.setState({ page: 0, rowsPerPage: event.target.value });
    };
    
    render() {
        // Styling
        const textColor = "#d1cdc7";
        const styleInfo = {color: textColor}
        const styleHeader = {color: textColor, fontWeight: "bold", backgroundColor: "#6d530b"};
        const stylePagination = {color: textColor, backgroundColor: "#1e2a32"};
        
        return(
            <TableContainer >
                <Typography variant="h5" style={styleHeader}>Match History</Typography>
                <Table style={{backgroundColor: "#1e2a32"}} size="small">
                    <TableHead>
                        <TableRow >
                            <TableCell align="center" style={{ borderBottom: 0}}>
                                <Typography variant="h5" fontWeight="bold" color={textColor}>Date</Typography>
                            </TableCell>
                            <TableCell align="center" style={{ borderBottom: 0}}>
                                <Typography variant="h5" fontWeight="bold" color={textColor}>Match Detail</Typography>
                            </TableCell>
                        </TableRow>
                </TableHead>
                <TableBody size="string">
                    {this.props.matches.map((column) => (
                        <TableRow key = {column.match_id}
                            style = {column.winner_id === this.props.id ? 
                                {backgroundColor:"darkGreen"} 
                                : column.winner_id != null ?
                                    {backgroundColor:"darkRed"} : {}}>
                            <TableCell align="center" style={{ borderBottom: 0}}>
                                <Typography variant="p" style={styleInfo}>{new Date(column.match_start_time).toLocaleString()}</Typography>
                            </TableCell>
                            <TableCell align="center" style={{ borderBottom: 0}}>
                            <Box display="flex" flexDirection="row" columnGap={1} justifyContent="center" alignItems="center">
                                <img src={column.team1_id.logo}
                                 alt="logo" width={30} height={30} loading="lazy"/>
                                    <Typography variant="p" style={styleInfo}>{column.team1_id.abbreviation}</Typography>
                                    <Typography variant="p" style={styleInfo}>VS</Typography>
                                    <Typography variant="p"  style={styleInfo}>{column.team2_id.abbreviation}</Typography>
                                    <img src={column.team2_id.logo} alt="logo" width={30} height={30} loading="lazy"/>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[15,]}
                rowsPerPage={15}
                component="div"
                count={200}
                page={this.props.page}
                onPageChange={this.handleChangePage}
                onRowsPerPageChange={this.handleChangeRowsPerPage}
                style={stylePagination}
            />
            </TableContainer>
        );
    }
}