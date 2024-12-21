import React, { useRef, useState } from "react";
import { TextField, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";

interface Props {
  name: string;
  label: string;
  onGetFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<Props> = ({ name, label, onGetFile }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName("");
    }
    onGetFile(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        style={{ display: "none" }}
        type="file"
        name={name}
        onChange={onFileChange}
        ref={inputRef}
      />
      <Grid container spacing={2} alignItems="center">
        <Grid>
          <TextField
            disabled
            label={label}
            value={fileName}
            onClick={activateInput}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid>
          <Button variant="contained" onClick={activateInput}>
            Browse
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;
