import { Button, Modal } from "@mui/material";
import { Component, Fragment } from "react";
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

export default class ConfirmBet extends Component {

    render() {
        return(
            <Fragment>
                <StyledModal
                    open={this.props.open}
                    onClose={() => this.props.onClose(false)}
                >
                    <FlexBoxColumn
                        sx={{
                            backgroundColor: '#111111',
                            p: 3
                        }}
                    >
                        <TypographyMedium>
                        Bet {this.props.amount} on {this.props.team.team_name}?
                        </TypographyMedium>

                        <FlexBoxRow sx={{justifyContent:'center', py: 1}}>
                            <Button onClick={() => this.props.onClose(false)}>
                            No
                            </Button>
                            <Button onClick={() => this.props.onClose(true)}>
                            Yes
                            </Button>
                        </FlexBoxRow>
                        
                    </FlexBoxColumn>
                </StyledModal>
            </Fragment>
        );
    }
}