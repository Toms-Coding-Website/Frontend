import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Box, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import DynamicButton from "../button/DynamicButton";
import { ICodeBlock } from "../../utils/types/types";

const EditorWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "500px",
  border: `0.2rem solid ${theme.palette.divider}`,
  borderRadius: "2rem",
  overflow: "hidden",
  marginBottom: theme.spacing(1),
}));

interface CodeEditorProps {
  onChange: (code: string) => void;
  code: string;
  codeBlock: ICodeBlock;
  readOnly: boolean;
  onSubmitSolution: (isCorrect: boolean) => void;
  submissionResult: boolean | null;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  onChange,
  code,
  codeBlock,
  readOnly,
  onSubmitSolution,
  submissionResult,
}) => {
  const theme = useTheme();

  const [editorCode, setCode] = useState<string>(code);

  useEffect(() => {
    setCode(code);
  }, [code]);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
      onChange(value);
    }
  };

  const handleSubmit = () => {
    if (!codeBlock) return;

    const isCorrect = code.trim() === codeBlock.solution.trim();

    // Emit the result to the parent component via the onSubmitSolution prop
    onSubmitSolution(isCorrect);
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

      {submissionResult !== null && (
        <Box textAlign="center" mb={1}>
          {submissionResult ? (
            <Typography
              sx={{
                color: "green",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              😊 Well done! You have completed the task successfully.
            </Typography>
          ) : (
            <Typography
              sx={{
                color: "red",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              😟 The submitted code is incorrect. Please try again.
            </Typography>
          )}
        </Box>
      )}

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
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            readOnly: readOnly,
          }}
        />
      </EditorWrapper>
      {!readOnly && (
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
