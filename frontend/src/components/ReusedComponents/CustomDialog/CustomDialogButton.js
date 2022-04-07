import {TypographyBold} from '../../customUIComponents';
import { Button, styled } from '@mui/material';

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

export default function CustomDialogButton({text, onClick, hoverBgColor}) {

    return(
        <DialogButton 
            sx={{':hover': {backgroundColor: `${hoverBgColor}`}}}
            onClick={onClick}
        >
            <ButtonText>{text}</ButtonText>
        </DialogButton>
    );        
}