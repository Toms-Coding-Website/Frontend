// src/pages/code/Code.page.tsx
import CodeEditor from "../../components/codeEditor/CodeEditor";
import { Typography, useTheme, Box, styled } from "@mui/material";

/*
Page Requirements:
- No Authentication Required
- First user to log in is assigned as the host (Mentor Tom).
- Second user to log in is assigned as the student.
- Only second user is able to edit the code, The mentor is in readonly mode.

Page Design:
- Navbar(Header)
- Code block editor
- Submit button
- Footer
 */

const PageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.backgroundColors.main, // Using the theme's background color
  minHeight: "100vh",
}));

const CodePage = () => {
  const theme = useTheme();

  const handleCodeSubmit = (code: string) => {
    console.log("Submitted code:", code);
  };

  return (
    <PageContainer>
      <Typography
        sx={{
          color: theme.textColors.title,
          marginBottom: theme.spacing(2),
          textAlign: "center",
          fontWeight: 700,
          fontSize: { xs: "1.3rem", sm: "1.75rem", md: "2rem", lg: "2.3rem" },
        }}
      >
        Assignment Title
      </Typography>
      <CodeEditor onSubmit={handleCodeSubmit} />
    </PageContainer>
  );
};

export default CodePage;
