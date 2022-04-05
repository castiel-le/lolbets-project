import { Tooltip, styled, Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { FlexBoxColumn } from "../../customUIComponents";

/**
 * Bet button in bet view styled
 */
const BetButtonStyle = styled(Button)({
    variant: 'contained',
    margin: 'auto',
    textDecoration: 'underline',
    boxShadow: 'unset',
    borderRadius: 16,
    backgroundColor: 'unset',
    color: '#f9f9f9',
    fontFamily: 'Lemon-Milk-Bold',
    height: '45px',
    width: '85px',
    fontSize: '26px',
    marginLeft: 'auto',
    ":hover": {
        textDecoration: 'underline',
        backgroundColor: '#f9f9f9',
        color: '#111111'
    }
});

export default function EditAndDeleteButtons({onEdit, onDelete}) {

    return (
        <FlexBoxColumn>
            <Tooltip title={"Modify"} placement="left">
                <BetButtonStyle 
                    onClick={() => onEdit()}
                    sx={{my: 'auto', height: '35px', width: '65px', ':hover': {backgroundColor: 'rgb(0,100,100)'}}}
                >
                    <Edit />
                </BetButtonStyle>
            </Tooltip>
            
            <Tooltip title={"Delete"} placement="left">
                <BetButtonStyle
                    onClick={() => onDelete()}
                    sx={{my: 'auto', height: '35px', width: '65px', ':hover': {backgroundColor: '#CC0000'}}}
                >
                    <Delete />
                </BetButtonStyle>
            </Tooltip>
        </FlexBoxColumn>
    )
}