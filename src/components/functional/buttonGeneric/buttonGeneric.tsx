import { ChangeEvent, FC, useEffect, useState } from "react";

//style
import style from "./buttonGenericStyle.module.scss";

//mui
import { Button, Box, Typography } from "@mui/material";

const buttonGeneric = () => {
  return (
    <Box className={style.inputFileContainer}>
      <Button
        itemType=""
        variant="contained"
        sx={{
          backgroundColor: "#e9e3e6",
          color: "black",
          textTransform: "initial",
        }}
        component="span"
      >
        Seleziona file
      </Button>
    </Box>
  );
};
export default buttonGeneric;
