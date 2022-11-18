import { FC, BaseSyntheticEvent } from "react";

import { Switch, FormControlLabel } from "@mui/material";

interface SwitchProps {
  label: string;
  callback?: Function;
  defaultChecked?: boolean;
}

const CustomSwitch: FC<SwitchProps> = (props):JSX.Element => {
  const handleChange = (event: BaseSyntheticEvent): void => {
    props.callback(event.target.checked);
  };
  return (
    <FormControlLabel
      sx={{ width: "fit-content" }}
      control={
        <Switch
          defaultChecked={!!props.defaultChecked ? props.defaultChecked : false}
        />
      }
      label={props.label}
      onChange={handleChange}
    />
  );
};
export default CustomSwitch;
