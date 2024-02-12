import { Box } from "@mui/material";
import React from "react";

const SqureButton = (props: any) => {
  const { children, sx, ...other } = props;

  return (
    <Box
      sx={{
        cursor: "pointer",
        color: "text.secondary",
        width: "30px",
        height: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        justifyItems: "center",
        borderRadius: "5px",
        "&:hover": {
          color: "text.primary",
          cursor: "pointer",
          backgroundColor: "action.hover",
        },
        ...sx, // Передача пользовательских стилей из props
      }}
      {...other}
    >
      {children}
    </Box>
  );
};

export default SqureButton;
