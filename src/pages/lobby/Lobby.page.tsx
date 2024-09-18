import { useEffect, useState } from "react";
import { ICodeBlock } from "../../utils/types/types";
import PageContainer from "../../components/pageContainer/PageContainer";
import axios from "axios";
import { codeBlockLink, serverLink } from "../../utils/constants/backendLinks";
import { Box, styled, Grid, Typography, useTheme } from "@mui/material";
import CodeBlockCard from "../../components/codeBlockCard/CodeBlockCard";
import { io } from "socket.io-client";

const FlexedBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: theme.spacing(3),
}));

const TransitionGridItem = styled(Grid)(() => ({
  transition: "all 0.4s ease-in-out",
}));

const socket = io(serverLink);

const LobbyPage = () => {
  const theme = useTheme();
  const [codeBlocks, setCodeBlocks] = useState<ICodeBlock[]>([]);
  const [role, setRole] = useState<"Mentor" | "Student" | null>(null);

  useEffect(() => {
    const fetchCodeBlocks = async () => {
      const response = await axios.get(`${codeBlockLink}`);
      setCodeBlocks(response.data);
    };
    fetchCodeBlocks();

    socket.on("roomJoined", ({ roomId, userRole }) => {
      setRole(userRole);
      console.log(`[Socket] Joined room ${roomId} as ${userRole}`);
    });

    socket.on("error", (message) => {
      console.log(`[Socket] error: ${message}`);
    });

    // Cleanup
    return () => {
      socket.disconnect();
    };
  }, []);

  const joinRoom = (codeBlockId: string) => {
    socket.emit("joinRoom", { codeBlockId });
  };

  return (
    codeBlocks && (
      <PageContainer>
        <Typography
          sx={{
            color: theme.textColors.title,
            textAlign: "center",
            marginBottom: 2,
            fontSize: "2rem",
          }}
        >
          {"Choose Code Block:"}
        </Typography>
        <FlexedBox>
          <Grid
            container
            rowSpacing={4}
            columnSpacing={1}
            sx={{ maxWidth: "85rem" }}
          >
            {codeBlocks.map((codeBlock) => (
              <TransitionGridItem
                xs={12}
                sm={6}
                md={4}
                lg={3}
                item
                key={codeBlock.title}
                sx={{ display: "flex", justifyContent: "center" }}
                onClick={() => joinRoom(codeBlock._id)}
              >
                <CodeBlockCard {...codeBlock} />
              </TransitionGridItem>
            ))}
          </Grid>
        </FlexedBox>
      </PageContainer>
    )
  );
};

export default LobbyPage;
