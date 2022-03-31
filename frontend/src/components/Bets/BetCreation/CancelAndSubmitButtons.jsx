import { Component, Fragment } from 'react';
import { Button } from '@mui/material';
import { TypographyBold } from '../../customUIComponents';
import { styled } from '@mui/system';

const ButtonText = styled(TypographyBold)({
    fontSize: 12,
    color: 'inherit'
});

const DialogButton = styled(Button)(({buttonHoverColor}) => ({
    borderRadius: 16,
    color: '#f9f9f9',
    ":hover": {
        transition: 'background-color 0.3s ease',
        textDecoration: 'underline',
        backgroundColor: buttonHoverColor,
        color: '#111111'
    }
}));

export default class CancelAndSubmitButtons extends Component {

    render() {
        return (
            <Fragment>
                <DialogButton 
                    buttonHoverColor="#e18b8b"
                    onClick={() => {
                        this.props.cancel();
                    }}
                >
                    <ButtonText>Cancel</ButtonText>
                </DialogButton>
                <DialogButton 
                    buttonHoverColor="#f9f9f9"
                    onClick={() => {
                        this.props.submit();
                    }}
                >
                    <ButtonText>Submit</ButtonText>
                </DialogButton>
            </Fragment>
        );
    }
}