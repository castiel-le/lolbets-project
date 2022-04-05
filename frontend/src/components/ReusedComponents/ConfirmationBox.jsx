import { Button, Modal } from "@mui/material";
import { Fragment } from "react";
import { FlexBoxColumn, FlexBoxRow, TypographyLight, TypographyMedium } from "../customUIComponents";
import { styled } from "@mui/material";

const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export default function ConfirmationBox({open, onClose, confirmationMessage, selectNo, selectYes, children}) {
    return(
        <Fragment>
            <StyledModal
                open={open}
                onClose={() => onClose(false)}
            >
                <FlexBoxColumn
                    sx={{
                        backgroundColor: '#111111',
                        p: 3,
                        maxWidth: '30%'
                    }}
                >
                    {children
                        ?
                        children
                        :
                        <TypographyMedium>
                            {confirmationMessage}
                        </TypographyMedium>
                    }
                    

                    <FlexBoxRow sx={{justifyContent:'center', py: 1}}>
                        <Button variant='text' onClick={selectNo} sx={{color: '#f9f9f9', ':hover': {backgroundColor: '#f9f9f9', color: '#111111'}}}>
                            <TypographyLight sx={{color: 'inherit'}} >
                                No
                            </TypographyLight>
                        </Button>
                        <Button variant='text' onClick={selectYes} sx={{color: '#f9f9f9', ':hover': {backgroundColor: '#f9f9f9', color: '#111111'}}}>
                            <TypographyLight sx={{color: 'inherit'}}>
                                Yes
                            </TypographyLight>
                        </Button>
                    </FlexBoxRow>
                    
                </FlexBoxColumn>
            </StyledModal>
        </Fragment>
    );
}
