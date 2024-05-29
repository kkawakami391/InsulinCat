"use client";

import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/register-insulin");
  };

  return (
    <Box>
      <Typography variant="h2" align="center">
        Welcome to Gatita Insulina!
      </Typography>
      <Box>
        <Button
          variant="contained"
          color="green"
          sx={{ my: 3, display: "flex", marginX: "auto"}}
          onClick={handleClick}
        >
          Enter to site!
        </Button>
      </Box>
    </Box>
  );
}
