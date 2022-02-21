import { Component, Fragment, forwardRef } from "react";

import { Box, Button, Dialog, DialogTitle, DialogContent, 
  DialogActions, Divider, Slide, Avatar, 
  FormControl, InputLabel, OutlinedInput, InputAdornment } from '@mui/material';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default class PlaceBetDrawer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTeam: null
    };
  }

  render() {
    let defaultStyle = { height: '64px', width: '64px'}
    let styleButton1 = { height: '64px', width: '64px', 
      transform: this.state.selectedTeam === 1 ? 'scale(1.1)' : 'scale(0.7)', 
      filter: this.state.selectedTeam === 1 ? 'grayscale(0)' : 'grayscale(1)'}
    let styleButton2 = { height: '64px', width: '64px', 
      transform: this.state.selectedTeam === 2 ? 'scale(1.1)' : 'scale(0.7)', 
      filter: this.state.selectedTeam === 2 ? 'grayscale(0)' : 'grayscale(1)'}
    return(
      <Fragment>
        <Dialog
          open={this.props.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.props.toggleOpenBet}
          aria-describedby="alert-dialog-slide-description"
          PaperProps={{
            style: {
              backgroundColor: '#223039',
            },
          }}
        >
          <DialogTitle sx={{color: '#df9f9f9'}}>{"Place Bet"}</DialogTitle>
          <DialogContent >
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} >

              <Button 
                onClick={() => this.setState({selectedTeam: 1})}
                sx={{width: '100%', backgroundColor: this.state.selectedTeam === 1 
                  ? '#1E2A32' : 'inherit', mx: 'auto'}}
              >
                <Avatar src={this.props.bet.team1.image} 
                  sx={this.state.selectedTeam === null ? defaultStyle : styleButton1} />
              </Button>
                        
              <Divider orientation="vertical" flexItem />

              <Button
                onClick={() => this.setState({selectedTeam: 2})} 
                sx={{width: '100%', backgroundColor: this.state.selectedTeam === 2 
                  ? '#1E2A32' : 'inherit', mx: 'auto'}}
              >
                <Avatar src={this.props.bet.team2.image} sx={this.state.selectedTeam === null 
                  ? defaultStyle : styleButton2} />
              </Button>

            </Box>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                //value={values.amount}
                //onChange={handleChange('amount')}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Amount"
              />
            </FormControl>
          </DialogContent>
                    
          {/* Content of the popup starts here*/}
                    
          {/* Content of the popup ends here*/}

          <DialogActions>
            <Button onClick={this.props.toggleOpenBet}>Cancel</Button>
            <Button onClick={this.props.toggleOpenBet}>Confirm</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}