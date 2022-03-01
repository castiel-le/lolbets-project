import { Component } from "react";
import { Box } from "@mui/material";
// eslint-disable-next-line max-len
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination} from "@mui/material";
import { Android } from '@mui/icons-material';
import { FlexBoxColumn, TypographyLight } from "../customUIComponents";
import './removeLabel.css';


class LeaderboardTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            userCount: 0
        }
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }
    /**
     * Handles changing pages on the table.
     * @param {*} event 
     * @param {*} page 
     */
    async handleChangePage(event, page) {
        this.props.changeUsersNotLoaded(true);
        await this.props.changePage(page + 1);
    }
    
    /**
       * Handles changing row per page
       * @param {*} event 
       */
    handleChangeRowsPerPage(event) {
        this.setState({ page: 0, rowsPerPage: event.target.value });
    }

    async getCountUsers() {
        const urlToFetch = "/api/user/rest";

        const userCount = await fetch(urlToFetch + "?count=true");
        if (userCount.ok){
            return await userCount.json();
        } else {
            throw new Error("error occurred during count");
        }
    }

    async componentDidMount(){
        await this.props.setUsers(this.props.page);
        this.setState({ userCount: await this.getCountUsers() });
    }

    render(){
        const tablePage = this.props.page - 1;
        const start = tablePage * this.props.rowsPerPage;
        const end = tablePage * this.props.rowsPerPage + this.props.rowsPerPage;
        return (
            <FlexBoxColumn sx= {{ width: '100%', alignItems: 'center'}}>
                {/* Table for ranks 6+ */}
                {/* eslint-disable-next-line max-len */}
                <TableContainer sx= {{ width: '80%'}} style={{ backgroundColor: 'grey', borderRadius: '5px', padding: '10px', margin: '10px'}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ align: 'center', width: '30%' }}>
                                    <TypographyLight>Rank</TypographyLight>
                                </TableCell>
                                <TableCell>
                                    <TypographyLight>Username</TypographyLight>
                                </TableCell>
                                <TableCell>
                                    <TypographyLight>Coins</TypographyLight>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.props.remaining.slice(start, end).map((testerrr, index) =>
                                    <TableRow key={testerrr.username}>
                                        <TableCell sx={{ width:'30%' }}>
                                            {/* eslint-disable-next-line max-len */}
                                            <TypographyLight>{index + 6 + tablePage * 10}</TypographyLight>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                                                <Android sx={{ color: 'white' }}/>
                                                {/* eslint-disable-next-line max-len */}
                                                <TypographyLight sx={{ pl: '40px' }}>{testerrr.username}</TypographyLight>
                                            </Box>  
                                        </TableCell>
                                        <TableCell>
                                            <TypographyLight>{testerrr.coins}</TypographyLight>
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[]}
                        rowsPerPage={this.props.rowsPerPage}
                        component="div"
                        count={this.state.userCount - 5}
                        page={tablePage}
                        onPageChange={this.handleChangePage}
                        onRowsPerPageChange={this.handleChangeRowsPerPage}
                        showFirstButton={true}
                        showLastButton={true}
                    />

                </TableContainer>
            </FlexBoxColumn>
        );
    }
}

export default LeaderboardTable;