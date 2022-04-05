import { Button, Modal } from "@mui/material";
import { Fragment } from "react";
import { FlexBoxColumn, FlexBoxRow, TypographyMedium } from "../../customUIComponents";
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

export default function ConfirmationBox({open, onClose, confirmationMessage, selectNo, selectYes}) {
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
                    <TypographyMedium>
                        {confirmationMessage}
                    </TypographyMedium>

                    <FlexBoxRow sx={{justifyContent:'center', py: 1}}>
                        <Button onClick={selectNo}>
                            No
                        </Button>
                        <Button onClick={selectYes}>
                            Yes
                        </Button>
                    </FlexBoxRow>
                    
                </FlexBoxColumn>
            </StyledModal>
        </Fragment>
    );
}
