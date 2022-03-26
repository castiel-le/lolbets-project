import { Collapse, Fab } from '@mui/material';
import {Component, Fragment} from 'react';
import AddIcon from '@mui/icons-material/Add';
import { TypographyBold } from '../../customUIComponents';

export default class CreateBetButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapseAddButton: true,
        };
    }

    render() {
        return (
            <Fragment>
                <Fab 
                    variant='extended'
                    aria-label="Create Bet" 
                    sx={{position: 'fixed', bottom: '1rem', right: '1rem', p: 2, color:'#f9f9f9', lineHeight: '0'}} 
                    onMouseEnter={() => this.setState({collapseAddButton: false})}
                    onMouseLeave={() => this.setState({collapseAddButton: true})}
                    onClick={() => this.props.createBet()}
                >
                    <Collapse orientation="horizontal" in={this.state.collapseAddButton} collapsedSize={0}>
                        <AddIcon sx={{color:'#2a373c'}}/>
                    </Collapse>
                    <Collapse orientation="horizontal" in={!this.state.collapseAddButton} collapsedSize={0}>
                        <TypographyBold sx={{width: '100px', color: '#2a373c'}}>
                                Create Bet
                        </TypographyBold>
                    </Collapse>
                </Fab>
                
            </Fragment>
        );
    }
}