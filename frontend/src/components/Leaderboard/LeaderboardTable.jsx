/* eslint-disable max-len */
import { Component } from "react";
import { Box } from "@mui/material";
// eslint-disable-next-line max-len
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination} from "@mui/material";
import DiamondIcon from "@mui/icons-material/Diamond"
import { FlexBoxColumn, FlexBoxRow, TypographyLight } from "../customUIComponents";
import './leaderboardTable.css';
import poro2 from './images/poro2.png';
import minorStyling from './minorStyling.css';
import {Link} from 'react-router-dom';


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
                <TableContainer sx= {{ width: '80%'}} style={{ backgroundColor: 'rgba(19, 60, 121, 0.96)', borderRadius: '5px', padding: '10px', margin: '10px'}}>
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
                                <TableCell>
                                    <TypographyLight textAlign = 'center'>Win Rate</TypographyLight>
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
                                            <Link to={`/user/${testerrr.user_id}`}>
                                                <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                                                    <img src={poro2} style={{height: '30px', width: '30px', margin: '0 5px', borderRadius: '5px' }}/>
                                                    <TypographyLight sx={{ pl: '10px', my: 'auto'}}>{testerrr.username}</TypographyLight>
                                                </Box>
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <FlexBoxRow>
                                                <TypographyLight>{testerrr.coins}</TypographyLight>
                                                <DiamondIcon sx={{ fontSize: '1rem', my: 'auto', color: 'lightblue', pl: '2px'}}/>
                                            </FlexBoxRow>
                                        </TableCell>
                                        <TableCell>
                                            {testerrr.wins + testerrr.losses !== 0 ? 
                                                <FlexBoxColumn>
                                                    <TypographyLight textAlign = 'center'>{Math.round(testerrr.wins / (testerrr.wins + testerrr.losses) * 10000) / 100}%  |  {testerrr.wins}W - {testerrr.losses}L</TypographyLight>
                                                    <FlexBoxRow sx={{ width: '100%', backgroundColor: 'rgb(238, 90, 82)', height: '10px', borderRadius: '5px'}}>
                                                        <FlexBoxRow sx={{ width: `${testerrr.wins / (testerrr.wins + testerrr.losses) * 100}%`, backgroundColor: 'rgb(61, 149, 229)', borderRadius: '5px'}} />
                                                    </FlexBoxRow>
                                                </FlexBoxColumn>
                                                :
                                                <FlexBoxColumn>
                                                    <TypographyLight textAlign = 'center'>0%  |  0W - 0L</TypographyLight>
                                                    <FlexBoxRow sx={{ width: '100%', backgroundColor: 'rgb(238, 90, 82)', height: '10px', borderRadius: '5px'}}>
                                                        <FlexBoxRow sx={{ width: '0%', backgroundColor: 'rgb(61, 149, 229)', borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px'}} />
                                                    </FlexBoxRow>
                                                </FlexBoxColumn>
                                            }
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