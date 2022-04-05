import { forwardRef } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Slide } from "@mui/material";
import { HorizontalDivider, TypographyBold } from "../../customUIComponents";
import CancelAndSubmitButtons from "./CancelAndSubmitButtons";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomDialog({open, onClose, onSubmit, title, children}) {

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            PaperProps={{
                style: {
                    backgroundColor: '#223039',
                    boxShadow:'0 0px 10px #f9f9f9',
                    p: 1
                },
            }}
        >
            <DialogTitle>
                <TypographyBold fontSize={20}>
                    {title}
                </TypographyBold>    
                <HorizontalDivider />
            </DialogTitle>

            <DialogContent sx={{py: 0}}>
                {children}
            </DialogContent>

            <DialogActions >
                <CancelAndSubmitButtons cancel={onClose} submit={onSubmit}/>
            </DialogActions>

        </Dialog>
    );
}
