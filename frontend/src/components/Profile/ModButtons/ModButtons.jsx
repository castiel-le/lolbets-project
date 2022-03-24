import { Component, Fragment } from "react";
import withRouter from "../../withRouter";
import Notification from "../../Notification";
import DialogBox from "./DialogBox";
import ToogleButtons from "./ToggleButtons";

class ModButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogState: false,
            dialogType: "",
            textfieldText: "",
            dateValue: "",
            notificationState: false,
            notificationType: "",
            notificationMessage: "",
        }
        this.popUpDialog = this.popUpDialog.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleTextfieldChange = this.handleTextfieldChange.bind(this);
        this.closeNotification = this.closeNotification.bind(this);
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
            this.setState({
                notificationState: true,
                notificationType: "error", 
                notificationMessage: "Something went wrong. Please try again later."
            })
        }

        // Check mod actions and perform accordingly
        switch (newValue[0]) {
        case "Ban":
            // Check if the user is already banned
            if (this.props.userInfo.banned) {
                // Show already banned notification message
                this.setState({
                    notificationState: true,
                    notificationType: "error", 
                    notificationMessage: `${this.props.userInfo.username} is already banned`
                })
            } else {
                // Pop up ban dialog
                this.setState({dialogState: true, dialogType: newValue[0]});
            }
            break;
        case "Timeout":
            // Check if the user is already banned
            if (this.props.userInfo.banned) {
                // Show already banned notification message
                this.setState({
                    notificationState: true,
                    notificationType: "error", 
                    notificationMessage: `Cannot timeout a user that is already banned`
                })
            // Check if the user is already has an ongoing timeout
            } else if (this.props.userInfo.timeout) {
                // Show already timeout notification message
                this.setState({
                    notificationState: true,
                    notificationType: "error", 
                    notificationMessage: `${this.props.userInfo.username} already has an ongoing timeout`
                })
            } else {
                // Pop up timeout dialog
                this.setState({dialogState: true, dialogType: newValue[0]});
            }
            break;
        case "Unban":
            // Check if the user is NOT banned when trying to unban
            if (!this.props.userInfo.banned) {
                // Show not banned notification message
                this.setState({
                    notificationState: true,
                    notificationType: "error", 
                    notificationMessage: `${this.props.userInfo.username} is not banned`
                })
            } else {
                // Pop up timeout dialog
                this.setState({dialogState: true, dialogType: newValue[0]});
            }
            break;
        case "Untimeout":
            // Check if the user has NO timeout when trying to untimeout
            if (!this.props.userInfo.timeout) {
                // Show no timeout notification message
                this.setState({
                    notificationState: true,
                    notificationType: "error", 
                    notificationMessage: `${this.props.userInfo.username} has no ongoing timeout`
                })
            } else {
                // Pop up timeout dialog
                this.setState({dialogState: true, dialogType: newValue[0]});
            }
            break;
        default:
            // Show error notification message
            this.setState({
                notificationState: true,
                notificationType: "error", 
                notificationMessage: "Unknown action. Please try again"
            })   
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
     * Resets notification state to default and not visible.
     */
    closeNotification() {
        this.setState({notificationState: false, notificationMessage: "", notificationType: ""})
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
            this.setState({
                notificationState: true,
                notificationType: "error",
                notificationMessage: `Unknown action. Please try again`
            });
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
                this.setState({
                    textfieldText: "",
                    dialogState: false, 
                    dialogType: "",
                    notificationState: true,
                    notificationType: "success",
                    notificationMessage: `Successfully unbanned ${this.props.userInfo.username}`
                });
            } else {
                // Show a failed notification message
                this.setState({
                    notificationState: true,
                    notificationType: "error",
                    notificationMessage: `${this.props.userInfo.username} is not banned`
                });
            }
        } catch (e) {
            // Show an error notification message
            this.setState({
                notificationState: true,
                notificationType: "error",
                notificationMessage: `Unban failed. Please try again later`
            });
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
                this.setState({
                    textfieldText: "",
                    dateValue: "",
                    dialogState: false, 
                    dialogType: "",
                    notificationState: true,
                    notificationType: "success",
                    notificationMessage: `Successfully untimeout ${this.props.userInfo.username}`
                });
            } else {
                // Show a failed notification message
                this.setState({
                    notificationState: true,
                    notificationType: "error",
                    notificationMessage: `${this.props.userInfo.username} does not have a timeout`
                });
            }
        } catch (e) {
            // Show an error notification message
            this.setState({
                notificationState: true,
                notificationType: "error",
                notificationMessage: `Unban failed. Please try again later`
            });
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
            this.setState({
                notificationState: true,
                notificationType: "error",
                notificationMessage: `Must enter a reason for the timeout`
            });
        // Check if date time value is defined
        } else if (!this.state.dateValue) {
            // Show empty date time error notification message
            this.setState({
                notificationState: true,
                notificationType: "error",
                notificationMessage: `Must enter a timeout duration`
            });
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
                    this.setState({
                        textfieldText: "",
                        dialogState: false, 
                        dialogType: "",
                        notificationState: true,
                        notificationType: "success",
                        notificationMessage: `Successfully timeout ${this.props.userInfo.username}`
                    });
                } else {
                    // Show a failed notification message
                    this.setState({
                        notificationState: true,
                        notificationType: "error",
                        notificationMessage: `${this.props.userInfo.username} is already has a ban or an ongoing timeout`
                    });
                }
            } catch (e) {
            // Show an error notification message
                this.setState({
                    notificationState: true,
                    notificationType: "error",
                    notificationMessage: `Ban failed. Please try again later`
                });
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
            this.setState({
                notificationState: true,
                notificationType: "error",
                notificationMessage: `Must enter a reason for the ban`
            });
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
                    this.setState({
                        textfieldText: "",
                        dialogState: false, 
                        dialogType: "",
                        notificationState: true,
                        notificationType: "success",
                        notificationMessage: `Successfully banned ${this.props.userInfo.username}`
                    });
                } else {
                // Show a failed notification message
                    this.setState({
                        notificationState: true,
                        notificationType: "error",
                        notificationMessage: `${this.props.userInfo.username} is already banned`
                    });
                }
            } catch (e) {
                // Show an error notification message
                this.setState({
                    notificationState: true,
                    notificationType: "error",
                    notificationMessage: `Timeout failed. Please try again later`
                });
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

                <Notification
                    open={this.state.notificationState}
                    message={this.state.notificationMessage} 
                    type={this.state.notificationType}
                    close={this.closeNotification} />
            </Fragment>
        )
    }
}

export default withRouter(ModButtons)

