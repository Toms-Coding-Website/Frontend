import React, { useEffect, useState, useCallback, useRef } from "react";
import { Typography, useTheme, Box } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import debounce from "lodash/debounce";
import Editor, { OnMount } from "@monaco-editor/react";
import { styled } from "@mui/material/styles";

import PageContainer from "../../components/pageContainer/PageContainer";
import DynamicButton from "../../components/button/DynamicButton";
import { ICodeBlock } from "../../utils/types/types";
import { codeBlockLink, serverLink } from "../../utils/constants/backendLinks";

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
  onMount?: (editor: any) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = React.memo(
  ({
    onChange,
    code,
    codeBlock,
    readOnly,
    onSubmitSolution,
    submissionResult,
    onMount,
  }) => {
    const theme = useTheme();
    const editorRef = useRef<any>(null);

    const handleEditorDidMount: OnMount = (editor) => {
      editorRef.current = editor;
      if (onMount) {
        onMount(editor);
      }
    };

    const handleEditorChange = (value: string | undefined) => {
      if (value !== undefined) {
        onChange(value);
      }
    };

    const handleSubmit = () => {
      if (!codeBlock) return;
      const isCorrect =
        editorRef.current.getValue().trim() === codeBlock.solution.trim();
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
            fontSize: {
              xs: "1.2rem",
              sm: "1.4rem",
              md: "1.6rem",
              lg: "1.8rem",
            },
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
            value={code}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            theme={theme.palette.mode === "dark" ? "vs-dark" : "vs"}
            options={{
              fontSize: 16,
              matchBrackets: "near",
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              readOnly: readOnly,
              smoothScrolling: true,
              automaticLayout: true,
              cursorSmoothCaretAnimation: "off",
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
  }
);

const CodePage: React.FC = () => {
  const theme = useTheme();
  const { codeBlockId } = useParams<{ codeBlockId: string }>();
  const navigate = useNavigate();

  const [codeBlock, setCodeBlock] = useState<ICodeBlock | null>(null);
  const [mentorId, setMentorId] = useState<string | undefined>(undefined);
  const [studentCount, setStudentCount] = useState<number>(0);
  const [userType, setUserType] = useState<string | null>(null);
  const [readOnly, setReadOnly] = useState<boolean>(false);
  const [editorContent, setEditorContent] = useState<string>("");
  const [submissionResult, setSubmissionResult] = useState<boolean | null>(
    null
  );

  const socketRef = useRef<Socket | null>(null);
  const editorRef = useRef<any>(null);
  const isLocalChange = useRef<boolean>(false);

  useEffect(() => {
    const socket = io(serverLink);
    socketRef.current = socket;

    socket.emit("joinRoom", { roomId: codeBlockId });

    socket.on("mentorDisconnected", () => {
      alert("The mentor has disconnected. You will be redirected.");
      setTimeout(() => navigate("/"), 2000);
    });

    socket.on("roleAssigned", (role: string) => {
      setUserType(role);
      setReadOnly(role === "Mentor");
      console.log(`[Socket] Assigned role: ${role}`);
    });

    socket.on("updateRoomStatus", ({ studentCount, mentorId }) => {
      setMentorId(mentorId);
      setStudentCount(studentCount);
    });

    socket.on("codeChange", ({ code, userId }) => {
      if (userId !== socket.id) {
        isLocalChange.current = false;
        setEditorContent(code);
      }
    });

    socket.on("submissionResult", (isCorrect: boolean) => {
      setSubmissionResult(isCorrect);
    });

    return () => {
      socket.disconnect();
    };
  }, [codeBlockId, navigate]);

  useEffect(() => {
    const fetchCodeBlock = async () => {
      try {
        const response = await axios.get(`${codeBlockLink}${codeBlockId}`);
        setCodeBlock(response.data);
        setEditorContent(response.data.hint || "");
      } catch (error) {
        console.error("Error fetching code block:", error);
      }
    };
    fetchCodeBlock();
  }, [codeBlockId]);

  const debouncedEmitChange = useCallback(
    debounce((code: string) => {
      socketRef.current?.emit("codeChange", {
        code,
        userId: socketRef.current.id,
      });
    }, 300),
    []
  );

  const handleCodeChange = useCallback(
    (code: string) => {
      isLocalChange.current = true;
      setEditorContent(code);
      debouncedEmitChange(code);
    },
    [debouncedEmitChange]
  );

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    if (editorRef.current && !isLocalChange.current) {
      const editor = editorRef.current;
      const position = editor.getPosition();
      editor.setValue(editorContent);
      editor.setPosition(position);
    }
    isLocalChange.current = false;
  }, [editorContent]);

  const handleSolutionSubmission = useCallback((isCorrect: boolean) => {
    socketRef.current?.emit("submissionResult", isCorrect);
  }, []);

  if (!codeBlock) {
    return null;
  }

  return (
    <PageContainer>
      <Typography
        sx={{
          color: theme.textColors.title,
          marginBottom: theme.spacing(1),
          textAlign: "center",
          fontWeight: 700,
          fontSize: { xs: "1.3rem", sm: "1.75rem", md: "2rem", lg: "2.3rem" },
        }}
      >
        {codeBlock.title || "Assignment Title"}
      </Typography>
      <Typography
        sx={{
          color: theme.textColors.text,
          marginBottom: theme.spacing(2),
          textAlign: "center",
          fontSize: "1.1rem",
        }}
      >
        {codeBlock.description}
      </Typography>
      <Typography
        sx={{
          color: theme.textColors.title,
          textAlign: "center",
          fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem", lg: "1.8rem" },
        }}
      >
        {"Session Details:"}
      </Typography>
      <Typography
        sx={{
          color: theme.textColors.text,
          textAlign: "center",
          fontSize: "1.1rem",
        }}
      >
        {userType === "Mentor" ? "You are the Mentor" : "You are a Student"}
      </Typography>
      {userType !== "Mentor" && (
        <Typography
          sx={{
            color: theme.textColors.text,
            textAlign: "center",
            fontSize: "1.1rem",
          }}
        >
          {mentorId ? `Mentor: Tom` : "Mentor: Not assigned"}
        </Typography>
      )}
      <Typography
        sx={{
          color: theme.textColors.text,
          marginBottom: theme.spacing(1),
          textAlign: "center",
          fontSize: "1.1rem",
        }}
      >
        Connected Students: {studentCount}
      </Typography>
      <CodeEditor
        submissionResult={submissionResult}
        onSubmitSolution={handleSolutionSubmission}
        codeBlock={codeBlock}
        onChange={handleCodeChange}
        code={editorContent}
        readOnly={readOnly}
        onMount={handleEditorDidMount}
      />
    </PageContainer>
  );
};

export default CodePage;
