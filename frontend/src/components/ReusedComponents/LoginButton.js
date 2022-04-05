import { Button, Stack } from "@mui/material";
import { Google } from "@mui/icons-material";
import { TypographyMedium } from "../customUIComponents";

export function LoginButton() {

    return (
        <Stack direction="row" spacing={1}>
            <a href={"/api/login/federated/google"} style={{all: "inherit", cursor: "pointer"}}>
                <Button 
                    variant="contained" 
                    startIcon={<Google />}
                    sx={{
                        color: "#0f1519",
                        backgroundColor: 'rgb(0,100,100)',
                        display: {xs: "none", md: "inherit"},
                        borderRadius: 16,
                        '&:hover': {
                            backgroundColor: "rgb(0, 200, 200)",
                        }}}
                >
                    <TypographyMedium sx={{color: 'unset'}}>
                        Login
                    </TypographyMedium>
                </Button>
            </a>
            <a href={"/api/login/federated/google"} style={{all: "inherit", cursor: "pointer"}}>
                <Button
                    variant="contained"
                    sx={{
                        color: "#0f1519", 
                        backgroundColor: 'rgb(0,100,100)',
                        display: {xs: "inherit", md: "none"},
                        padding: "3px",
                        borderRadius: 16,
                        '&:hover': {
                            backgroundColor: "rgb(0, 200, 200)",
                        }}}
                >
                    <Google />
                </Button>
            </a>
        </Stack>
    );
}