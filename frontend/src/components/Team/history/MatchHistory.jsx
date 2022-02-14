import { Component } from "react";
import { TablePagination, TableContainer, Table, TableRow, TableCell, TableBody, TableHead, Typography, Box } from "@mui/material";
/**
 * Component for displaying team's match histories.
 */
export default class MatchHistory extends Component {
    constructor(props) {
        super(props);
        const testColumns = [{date: 1, opponent: "A", logo: "https://cdn.pandascore.co/images/team/image/130134/no_teamlogo_square.png" , isWin: true},
        {date: 2, opponent: "B", logo: "https://cdn.pandascore.co/images/team/image/130134/no_teamlogo_square.png", isWin: true},
        {date: 3, opponent: "C", logo: "https://cdn.pandascore.co/images/team/image/130134/no_teamlogo_square.png", isWin: true},
        {date: 4, opponent: "D", logo: "https://cdn.pandascore.co/images/team/image/130134/no_teamlogo_square.png", isWin: false},
        {date: 5, opponent: "E", logo: "https://cdn.pandascore.co/images/team/image/130134/no_teamlogo_square.png", isWin: true},
        {date: 6, opponent: "F", logo: "https://cdn.pandascore.co/images/team/image/130134/no_teamlogo_square.png", isWin: true},
        {date: 8, opponent: "G", logo: "https://cdn.pandascore.co/images/team/image/130134/no_teamlogo_square.png", isWin: false},
        {date: 9, opponent: "G", logo: "https://cdn.pandascore.co/images/team/image/130134/no_teamlogo_square.png", isWin: false},
        {date: 10, opponent: "G", logo: "https://cdn.pandascore.co/images/team/image/130134/no_teamlogo_square.png", isWin: false},
        {date: 11, opponent: "G", logo: "https://cdn.pandascore.co/images/team/image/130134/no_teamlogo_square.png", isWin: false},
        {date: 12, opponent: "G", logo: "https://cdn.pandascore.co/images/team/image/130134/no_teamlogo_square.png", isWin: false},
    ];
        this.state = {
            page: 0,
            rowsPerPage: 10,
            testColumns: testColumns,
        }

        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }

    /**
     * Handles changing pages on the table.
     * @param {*} event 
     * @param {*} page 
     */
    handleChangePage(event, page) {
        this.setState({ page });
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

        // Range of rows to be displayed
        const startRowCount = this.state.page 
            * this.state.rowsPerPage;
        const endRowCount =  this.state.page * this.state.rowsPerPage + this.state.rowsPerPage; 

        return(
            <TableContainer >
                <Typography variant="h5" style={styleHeader}>Match History</Typography>
                <Table style={{backgroundColor: "#1e2021"}}>
                    <TableHead>
                        <TableRow >
                            <TableCell align="center">
                                <Typography variant="h5" fontWeight="bold" color={textColor}>Date</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="h5" fontWeight="bold" color={textColor}>Match Detail</Typography>
                            </TableCell>
                        </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.testColumns.slice(startRowCount, endRowCount)
                        .map((column) => (
                        <TableRow id = {column["date"]}
                            style = {column.isWin ? 
                                {backgroundColor:"darkGreen"} 
                                : {backgroundColor:"darkRed"}}>
                            <TableCell align="center">
                                <Typography variant="h5" style={styleInfo}>{column.date}</Typography>
                            </TableCell>
                            <TableCell align="center">
                            <Box display="flex" flexDirection="row" columnGap={1} justifyContent="center">
                                <img src="https://cdn.pandascore.co/images/team/image/1097/cloud9-gnd9b0gn.png" alt="logo" width={30} height={30 }/>
                                    <Typography variant="h6" style={styleInfo}>C9</Typography>
                                    <Typography variant="h6" style={styleInfo}>VS</Typography>
                                    <Typography variant="h6"  style={styleInfo}>{column["opponent"]}</Typography>
                                    <img src={column["logo"]} alt="logo" width={30} height={30}/>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[this.state.rowsPerPage]}
                component="div"
                count={this.state.testColumns.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                onPageChange={this.handleChangePage}
                onRowsPerPageChange={this.handleChangeRowsPerPage}
                style={styleInfo}
            />
            </TableContainer>
        );
    }
}