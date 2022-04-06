/* eslint-disable max-len */
import { Component } from "react";
import { Box } from "@mui/material";
// eslint-disable-next-line max-len
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination} from "@mui/material";
import DiamondIcon from "@mui/icons-material/Diamond"
import { FlexBoxColumn, FlexBoxRow, TypographyLight } from "../customUIComponents";
import './leaderboardTable.css';
import poro from "./images/poro.png";
import minorStyling from './minorStyling.css';
import {Link} from 'react-router-dom';

class SearchedTable extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <FlexBoxColumn sx= {{ width: '100%', alignItems: 'center'}}>
                {/* Table for ranks 6+ */}
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
                                this.props.remaining.map(testerrr =>
                                    <TableRow key={testerrr.username}>
                                        <TableCell sx={{ width:'30%' }}>
                                            <TypographyLight>{testerrr.rank}</TypographyLight>
                                        </TableCell>
                                        <TableCell>
                                            <Link to={`/user/${testerrr.user_id}`}>
                                                <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                                                    <img src={poro} style={{height: '30px', width: '30px', margin: '0 5px', borderRadius: '5px' }}/>
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
                </TableContainer>
            </FlexBoxColumn>
        );
    }
}

export default SearchedTable;