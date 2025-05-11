import { Typography as MuiTypography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTypography = styled(MuiTypography)({
  fontFamily: "'Nunito', sans-serif",
});

export const Typography = (props: TypographyProps) => {
  return <StyledTypography {...props} />;
};

// Re-export the TypographyProps type for convenience
export type { TypographyProps }; 