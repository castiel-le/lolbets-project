import { Component, Fragment } from "react";
import withRouter from "../../withRouter";
import DialogBox from "./DialogBox";
import ToogleButtons from "./ToggleButtons";
import { SnackbarContext } from "../../Snackbar/SnackbarContext";

class ModButtons extends Component {
    static contextType = SnackbarContext;
    
    constructor(props) {
        super(props);
        this.state = {
            dialogState: false,
            dialogType: "",
            textfieldText: "",
            dateValue: "",
        }
        this.popUpDialog = this.popUpDialog.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleTextfieldChange = this.handleTextfieldChange.bind(this);
        this.changeDateTime = this.changeDateTime.bind(this);
        this.handleModAction = this.handleModAction.bind(this);
    }

    /**
     * Changes the state of dateValue to new date time value
     * @param {Date} newDateTime new date time value
     */
    changeDateTime(newDateTime) {
        this.setState({dateValue: newDateTime});
    }
    /**
     * Change dialog state to true and dialog type to new value
     * @param {*} e Event
     * @param {Array} newValue Single value array of String representing the new value
     */
    popUpDialog(e, newValue) {
        // Check if new value is defined
        if (!newValue) {
            // Show error notification message
            this.context.setSnackbar(true, 'Something went wrong. Please try again later', 'error');
        }

        // Check mod actions and perform accordingly
        switch (newValue[0]) {
        case "Ban":
            // Check if the user is already banned
            if (this.props.userInfo.banned) {
                // Show already banned notification message
                this.context.setSnackbar(true, `${this.props.userInfo.username} is already banned`, 'error');
            } else {
                // Pop up ban dialog
                this.setState({dialogState: true, dialogType: newValue[0]});
            }
            break;
        case "Timeout":
            // Check if the user is already banned
            if (this.props.userInfo.banned) {
                // Show already banned notification message
                this.context.setSnackbar(true, `Cannot timeout a user that is already banned`, 'error');

            // Check if the user is already has an ongoing timeout
            } else if (this.props.userInfo.timeout) {
                // Show already timeout notification message
                this.context.setSnackbar(true, `${this.props.userInfo.username} already has an ongoing timeout`, 'error');
            } else {
                // Pop up timeout dialog
                this.setState({dialogState: true, dialogType: newValue[0]});
            }
            break;
        case "Unban":
            // Check if the user is NOT banned when trying to unban
            if (!this.props.userInfo.banned) {
                // Show not banned notification message
                this.context.setSnackbar(true, `${this.props.userInfo.username} is not banned`, 'error');
            } else {
                // Pop up timeout dialog
                this.setState({dialogState: true, dialogType: newValue[0]});
            }
            break;
        case "Untimeout":
            // Check if the user has NO timeout when trying to untimeout
            if (!this.props.userInfo.timeout) {
                // Show no timeout notification message
                this.context.setSnackbar(true, `${this.props.userInfo.username} has no ongoing timeout`, 'error');
            } else {
                // Pop up timeout dialog
                this.setState({dialogState: true, dialogType: newValue[0]});
            }
            break;
        default:
            // Show error notification message
            this.context.setSnackbar(true, "Unknown action. Please try again", 'error');
        }
        
    }
    /**
     * Change dialog state to false and dialog type to empty
     */
    handleClose() {
        this.setState({dialogState: false, dialogType: ""});
    }

    /**
     * Changes the textfieldText state to value from event target
     * @param {Event} e event value
     */
    handleTextfieldChange(e) {
        this.setState({textfieldText: e.target.value})
    }

    /**
     * Checks if dialog state changes. If it changes, call props's fetch
     * user info.
     * @param {*} prevProps 
     * @param {*} prevState 
     */
    componentDidUpdate(prevProps, prevState) {
        if (prevState.dialogState !== this.state.dialogState) {
            this.props.fetchUserInfo();
        }
    }

    /**
     * Handles bans, timeouts, unbans, and untimeout actions.
     */
    async handleModAction() {
        switch(this.state.dialogType) {
        case "Ban":
            await this.banUser();
            break;
        case "Timeout":
            await this.timeoutUser();
            break;
        case "Unban":
            await this.unbanUser();
            break;
        case "Untimeout":
            await this.untimeoutUser();
            break;
        default:
            // Show error notification message
            this.context.setSnackbar(true, `Unknown action. Please try again`, 'error');
            break;
        }
    }

    /**
     * It will attempt a DELETE request on
     * the backend to unban the user
     */
    async unbanUser() {
        const url = "/api/bans";
        try {
            const data = {ban_id: this.props.userInfo.banned.ban_id};
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                // Show a success notification message and close dialog
                this.context.setSnackbar(true, `Successfully unbanned ${this.props.userInfo.username}`, 'success');
                this.setState({
                    textfieldText: "",
                    dialogState: false, 
                    dialogType: "",
                });
            } else {
                // Show a failed notification message
                this.context.setSnackbar(true, `${this.props.userInfo.username} is not banned`, 'error');                
            }
        } catch (e) {
            // Show an error notification message
            this.context.setSnackbar(true, `Unban failed. Please try again later`, 'error');                
        }
    }

    /**
     * It will attempt a DELETE request on
     * the backend to untimeout the user
     */
    async untimeoutUser() {
        const url = "/api/timeouts";
        try {
            const data = {timeout_id: this.props.userInfo.timeout.timeouts_id};
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                // Show a success notification message and close dialog
                this.context.setSnackbar(true, `Successfully untimeout ${this.props.userInfo.username}`, 'success');                
                this.setState({
                    textfieldText: "",
                    dateValue: "",
                    dialogState: false, 
                    dialogType: "",
                });
            } else {
                // Show a failed notification message
                this.context.setSnackbar(true, `${this.props.userInfo.username} does not have a timeout`, 'error');                
            }
        } catch (e) {
            // Show an error notification message
            this.context.setSnackbar(true, `Untimeout failed. Please try again later`, 'error');                
        }
    }

    /**
     * It will attempt a PUT request
     * on the backend to timeout the user.
     */
    async timeoutUser() {
    // Check if text field is empty
        if (this.state.textfieldText === "") {
            // Show empty text field error notification message
            this.context.setSnackbar(true, `Must enter a reason for the timeout`, 'error');                

        // Check if date time value is defined
        } else if (!this.state.dateValue) {
            // Show empty date time error notification message
            this.context.setSnackbar(true, `Must enter a timeout duration`, 'error');                
        } else {
            const url = "/api/timeouts";
            try {
                const data = {user_id: this.props.userInfo.user_id, 
                    start_date: new Date(), end_date: this.state.dateValue,
                    reason: this.state.textfieldText
                };
                const response = await fetch(url, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                if (response.ok) {
                // Closes dialog box and show a success notification message
                    this.context.setSnackbar(true, `Successfully timeout ${this.props.userInfo.username}`, 'success');                

                    this.setState({
                        textfieldText: "",
                        dialogState: false, 
                        dialogType: "",
                    });
                } else {
                    // Show a failed notification message
                    this.context.setSnackbar(true, `${this.props.userInfo.username} is already has a ban or an ongoing timeout`, 'error');
                }
            } catch (e) {
                // Show an error notification message
                this.context.setSnackbar(true, `Timeout failed. Please try again later`, 'error');
            }
        }
    }

    /**
     * It will attempt a PUT request
     * on the backend to ban the user.
     */
    async banUser() {
        // Check if text field is empty
        if (this.state.textfieldText === "") {
            // Show empty text field error notification message
            this.context.setSnackbar(true, `Must enter a reson for the ban`, 'error');
        } else {
            const url = "/api/bans";
            try {
                const data = {user_id: this.props.userInfo.user_id, 
                    start_date: new Date(), 
                    reason: this.state.textfieldText
                };
                const response = await fetch(url, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                if (response.ok) {
                    // Closes dialog box and show a success notification message
                    this.context.setSnackbar(true, `Successfully banned ${this.props.userInfo.username}`, 'success');
                    this.setState({
                        textfieldText: "",
                        dialogState: false, 
                        dialogType: "",
                    });
                } else {
                // Show a failed notification message
                    this.context.setSnackbar(true, `${this.props.userInfo.username} is already banned`, 'error');
                }
            } catch (e) {
                // Show an error notification message
                this.context.setSnackbar(true, `Timeout failed. Please try again later`, 'error');
            }
        }
    }

    render(){
        return(
            <Fragment>
                <ToogleButtons
                    onChange={this.popUpDialog}
                    value={this.state.dialogType} 
                    isTimeout={this.props.userInfo.timeout}
                    isBanned={this.props.userInfo.banned}
                />
 
                <DialogBox 
                    open={this.state.dialogState}
                    type={this.state.dialogType}
                    username={this.props.userInfo.username}
                    onChangeTextField={this.handleTextfieldChange}
                    dateValue={this.state.dateValue}
                    onChangeDate={this.changeDateTime}
                    confirm={this.handleModAction}
                    cancel={this.handleClose}
                />
            </Fragment>
        )
    }
}

export default withRouter(ModButtons)

