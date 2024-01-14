import * as React from "react";
import { Button, GroupSelection } from '../../../src/react/index';

export function GroupSelectionPage(props: any) {

  const [open, setOpen] = React.useState(false);

  return (
    <div className="group-selection-page">
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        打开 Group Selection
      </Button>
      <GroupSelection
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
}
