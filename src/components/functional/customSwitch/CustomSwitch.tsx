import { FC, BaseSyntheticEvent } from "react";

import { Switch, FormControlLabel } from "@mui/material";

interface SwitchProps {
  label: string;
  callback: Function;
}

const CustomSwitch: FC<SwitchProps> = (props) => {
  const handleChange = (event: BaseSyntheticEvent): void => {
    props.callback(event.target.checked);
  };
  return (
    <FormControlLabel
      sx={{ width: 30 }}
      control={<Switch />}
      label={props.label}
      onChange={handleChange}
    />
  );
};
export default CustomSwitch;
