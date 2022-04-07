import { styled } from '@mui/system';
import { Box, Typography, Divider, CircularProgress } from '@mui/material';

/**
 * A horizontal bar. Must specify width with "width="
 */
export const HorizontalDivider = styled(Divider)({
    variant: "fullWidth",
    orientation: 'horizontal',
    borderColor: '#f9f9f9',
    height: '5px', 
    marginLeft: 'auto',
    marginRight: 'auto'
});

/**
 * A box with display flex in a row direction
 */
export const FlexBoxRow = styled(Box)({
    display: 'flex',
    flexDirection: 'row'
});
  
/**
 * A box with display flex in a column direction
 */
export const FlexBoxColumn = styled(Box)({
    display: 'flex',
    flexDirection: 'column'
});

/**
 * Text with lemon-milk-light as the font
 */
export const TypographyLight = styled(Typography)({
    fontFamily: 'Lemon-Milk-Light',
    color: '#f9f9f9'
});

/**
 * Text with lemon-milk-medium as the font
 */
export const TypographyMedium = styled(Typography)({
    fontFamily: 'Lemon-Milk-Medium',
    color: '#f9f9f9'
});

/**
 * Text with lemon-milk-bold as the font
 */
export const TypographyBold = styled(Typography)({
    fontFamily: 'Lemon-Milk-Bold',
    color: '#f9f9f9'
});

/**
 * A function that returns a centered loading circle
 * @returns A loading circle
 */
export function Loading(){
    return (
        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mt: '10%', 
            alignItems: 'center'}} 
        >
            <CircularProgress />
        </Box>
    );
}  

/**
 * A function that returns a ABSOLUTELY centered loading circle
 * on the parent component.
 * @returns A loading circle
 */
export function LoadingOverTop(){
    return (
        <Box sx={{ 
            position: "absolute",
            top: "50%",
            left: "50%",
        }} 
        >
            <CircularProgress />
        </Box>
    );
}   