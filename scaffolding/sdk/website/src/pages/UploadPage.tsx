import * as React from "react";
import { Button, Upload } from '../../../src/react/index';

export function UploadPage(props: any) {

  const [open, setOpen] = React.useState(false);

  return (
    <div className="upload-page">
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        打开 Upload
      </Button>
      <Upload
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
}
