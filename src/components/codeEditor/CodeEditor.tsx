// src/components/CodeEditor.tsx
import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { Box, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import DynamicButton from "../button/DynamicButton";

// Styled component for the editor wrapper
const EditorWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "500px",
  border: `0.2rem solid ${theme.palette.divider}`,
  borderRadius: "2rem",
  overflow: "hidden",
  marginBottom: theme.spacing(1),
}));

interface CodeEditorProps {
  onSubmit: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onSubmit }) => {
  const [code, setCode] = useState<string>("");
  const theme = useTheme();

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  const handleSubmit = () => {
    onSubmit(code);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        padding: 2,
      }}
    >
      <Typography
        sx={{
          color: theme.textColors.title,
          marginBottom: theme.spacing(1),
          textAlign: "center",
          fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem", lg: "1.8rem" },
        }}
      >
        JavaScript Code Editor
      </Typography>
      <EditorWrapper>
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue="// Write your code here"
          onChange={handleEditorChange}
          theme={theme.palette.mode === "dark" ? "vs-dark" : "vs"}
          options={{
            fontSize: 18,
            matchBrackets: "near",
            minimap: { enabled: false }, // Disable minimap
            scrollBeyondLastLine: false, // Disable scrolling beyond the last line
          }}
        />
      </EditorWrapper>
      <DynamicButton
        onClick={handleSubmit}
        label="Submit"
        variant="contained"
        size="small"
      />
    </Box>
  );
};

export default CodeEditor;
