import { styled } from '@mui/system';
import { Box, Typography, Divider, CircularProgress } from '@mui/material';

export const HorizontalDivider = styled(Divider)({
  variant: "fullWidth",
  orientation: 'horizontal',
  borderColor: '#f9f9f9',
  height: '5px', 
  marginLeft: 'auto',
  marginRight: 'auto'
});

export const FlexBoxRow = styled(Box)({
  display: 'flex',
  flexDirection: 'row'
});
  
export const FlexBoxColumn = styled(Box)({
  display: 'flex',
  flexDirection: 'column'
});

export const TypographyLight = styled(Typography)({
  fontFamily: 'Lemon-Milk-Light',
  color: '#f9f9f9'
});

export const TypographyMedium = styled(Typography)({
  fontFamily: 'Lemon-Milk-Medium',
  color: '#f9f9f9'
});

export const TypographyBold = styled(Typography)({
  fontFamily: 'Lemon-Milk-Bold',
  color: '#f9f9f9'
});

export function Loading(){
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      height:'90vh', 
      my: 'auto', 
      alignItems: 'center'}} 
    >
      <CircularProgress />
    </Box>
  );
}   