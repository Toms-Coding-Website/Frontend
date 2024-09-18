import { Box, Link, useTheme } from "@mui/material";

const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.backgroundColors.footer,
        color: theme.textColors.text,
        py: 2,
        px: 3,
        textAlign: "center",
        bottom: 0,
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <span>© 2024 Lior Hassin | Software Engineer </span>
        <span>
          <Link
            color={theme.textColors.link}
            href="mailto:liorhassin3@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            liorhassin3@gmail.com
          </Link>{" "}
          |
          <Link
            color={theme.textColors.link}
            href="https://www.linkedin.com/in/lior-hassin"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            LinkedIn
          </Link>{" "}
          |
          <Link
            color={theme.textColors.link}
            href="https://github.com/liorhassin"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Github
          </Link>
        </span>
      </Box>
    </Box>
  );
};

export default Footer;
