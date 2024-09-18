import { Box, styled } from "@mui/material";

const PageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.backgroundColors.main,
  minHeight: "70vh",
}));

export default PageContainer;
