import CodeEditor from "../../components/codeEditor/CodeEditor";
import { Typography, useTheme } from "@mui/material";
import PageContainer from "../../components/pageContainer/PageContainer";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { ICodeBlock } from "../../utils/types/types";
import { codeBlockLink, serverLink } from "../../utils/constants/backendLinks";
import { io } from "socket.io-client";

const CodePage = () => {
  const theme = useTheme();
  const { codeBlockId } = useParams();
  const navigate = useNavigate();

  const [codeBlock, setCodeBlock] = useState<ICodeBlock | null>(null);
  const [mentorId, setMentorId] = useState<string | undefined>(undefined);
  const [studentCount, setStudentCount] = useState<number>(0);
  const [socket, setSocket] = useState<any>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [readOnly, setReadOnly] = useState<boolean>(false);
  const [editorContent, setEditorContent] = useState<string>("");
  const [submissionResult, setSubmissionResult] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    const initializeSocket = () => {
      const newSocket = io(serverLink);
      setSocket(newSocket);

      newSocket.emit("joinRoom", { roomId: codeBlockId });

      newSocket.on("mentorDisconnected", () => {
        alert("The mentor has disconnected. You will be redirected.");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      });

      newSocket.on("roleAssigned", (role: string) => {
        setUserType(role);
        setReadOnly(role === "Mentor");
        console.log(`[Socket] Assigned role: ${role}`);
      });

      newSocket.on("updateRoomStatus", ({ studentCount, mentorId }) => {
        setMentorId(mentorId);
        setStudentCount(studentCount);
      });

      newSocket.on("codeChange", (code: string) => {
        setEditorContent(code);
      });

      newSocket.on("submissionResult", (isCorrect: boolean) => {
        setSubmissionResult(isCorrect);
      });

      return newSocket;
    };

    const socketInstance = initializeSocket();

    return () => {
      socketInstance.disconnect();
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

  const handleCodeChange = useCallback(
    (code: string) => {
      socket?.emit("codeChange", code);
    },
    [socket]
  );

  if (!codeBlock) {
    return null;
  }

  const handleSolutionSubmission = (isCorrect: boolean) => {
    socket?.emit("submissionResult", isCorrect);
  };

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
