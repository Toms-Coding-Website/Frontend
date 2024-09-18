import React, { useState, useEffect } from "react";
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
  onChange: (code: string) => void;
  code: string;
  readOnly: boolean; // Add readOnly prop
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  onSubmit,
  onChange,
  code,
  readOnly,
}) => {
  const theme = useTheme();

  // Sync editor with the incoming code prop
  useEffect(() => {
    setCode(code);
  }, [code]);

  const [editorCode, setCode] = useState<string>(code);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
      onChange(value);
    }
  };

  const handleSubmit = () => {
    onSubmit(editorCode);
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
          value={editorCode}
          onChange={handleEditorChange}
          theme={theme.palette.mode === "dark" ? "vs-dark" : "vs"}
          options={{
            fontSize: 18,
            matchBrackets: "near",
            minimap: { enabled: false }, // Disable minimap
            scrollBeyondLastLine: false, // Disable scrolling beyond the last line
            readOnly: readOnly, // Set readOnly option
          }}
        />
      </EditorWrapper>
      {!readOnly && ( // Only show the submit button if not read-only
        <DynamicButton
          onClick={handleSubmit}
          label="Submit"
          variant="contained"
          size="small"
        />
      )}
    </Box>
  );
};

export default CodeEditor;
