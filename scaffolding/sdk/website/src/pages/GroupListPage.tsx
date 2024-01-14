import * as React from "react";
import { Button, GroupList } from '../../../src/react/index';
// import { Upload, GroupList } from '../../../dist/react/index';

export function GroupListPage(props: any) {

  const [open, setOpen] = React.useState(false);

  return (
    <div className="group-list-page">
      {/* <Upload /> */}
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        打开 Group List
      </Button>
      <GroupList
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
}
