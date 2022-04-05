import { Component, Fragment } from 'react';
import { Button } from '@mui/material';
import { TypographyBold } from '../../customUIComponents';
import { styled } from '@mui/system';

const ButtonText = styled(TypographyBold)({
    fontSize: 12,
    color: 'inherit'
});

const DialogButton = styled(Button)({
    borderRadius: 16,
    color: '#f9f9f9',
    ":hover": {
        transition: 'background-color 0.3s ease',
        textDecoration: 'underline',
        color: '#111111'
    }
});

export default class CancelAndSubmitButtons extends Component {

    render() {
        return (
            <Fragment>
                <DialogButton 
                    sx={{':hover': {backgroundColor: '#CC0000'}}}
                    onClick={() => {
                        this.props.cancel();
                    }}
                >
                    <ButtonText>Cancel</ButtonText>
                </DialogButton>
                <DialogButton 
                    sx={{':hover': {backgroundColor: '#f9f9f9'}}}
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