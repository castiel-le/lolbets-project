import { Component } from "react";
import { DialogContentText, Button, Dialog, DialogTitle, DialogActions, TextField, DialogContent } from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { add } from "date-fns";

export default class DialogBox extends Component {
    render() {
        const styleReasonTextfield = {marginBottom: "5px"};
        return(
            <Dialog open={this.props.open}>
                <DialogTitle>
                    {`${this.props.type} ${this.props.username}`}
                </DialogTitle>
                
                {this.props.type === "Unban" || this.props.type === "Untimeout"
                    ? 
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to {this.props.type.toLowerCase()} this user?
                        </DialogContentText>
                    </DialogContent>
                    :
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="reason"
                            label={`Reason of ${this.props.type}`}
                            style={styleReasonTextfield}
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={this.props.onChangeTextField}
                            required
                        />

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                renderInput={(props) => 
                                    <TextField {...props} required fullWidth 
                                        style={{display: this.props.type === "Timeout" 
                                            ? "block" : "none"}} />
                                }
                                label="Timeout duration"
                                value={this.props.dateValue}
                                onChange={this.props.onChangeDate}
                                minDate={add(new Date(), {days: 1})}
                            />
                        </LocalizationProvider>
                    </DialogContent>
                }
                <DialogActions>
                    <Button onClick={this.props.cancel}>Cancel</Button>
                    <Button onClick={this.props.confirm}>Confirm</Button>
                </DialogActions>
            </Dialog>
        )
    }
}