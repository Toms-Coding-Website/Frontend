import React, { useEffect, useState, useCallback, useRef } from "react";
import { Typography, useTheme } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import axios from "axios";

import CodeEditor from "../../components/codeEditor/CodeEditor";
import PageContainer from "../../components/pageContainer/PageContainer";
import { ICodeBlock } from "../../utils/types/types";
import { codeBlockLink, serverLink } from "../../utils/constants/backendLinks";

const UPDATE_INTERVAL = 5000;

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
  const lastSentCode = useRef<string>("");

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (
        editorRef.current &&
        lastSentCode.current !== editorRef.current.getValue()
      ) {
        const currentCode = editorRef.current.getValue();
        socketRef.current?.emit("codeUpdate", {
          code: currentCode,
          userId: socketRef.current.id,
        });
        lastSentCode.current = currentCode;
      }
    }, UPDATE_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  const handleCodeChange = useCallback((code: string) => {
    setEditorContent(code);
  }, []);

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
      />
    </PageContainer>
  );
};

export default CodePage;
