import { Component, Fragment } from 'react';
import CustomDialogButton from './CustomDialogButton';

export default class CancelAndSubmitButtons extends Component {

    render() {
        return (
            <Fragment>
                <CustomDialogButton
                    onClick={() => this.props.cancel()}
                    text={"Cancel"}
                    hoverBgColor={'#CC0000'}
                />
                <CustomDialogButton
                    onClick={() => this.props.submit()}
                    text={"Submit"}
                    hoverBgColor={'#f9f9f9'}
                />
            </Fragment>
        );
    }
}