import { ButtonGroup, Button, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { BetButtonStyle } from "../styledElements";
import { FlexBoxColumn } from "../../customUIComponents";

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