import * as React from "react";
import { Button, Drawer } from '../../../src/react/index';

export function DrawerPage(props: any) {

  const [open, setOpen] = React.useState(false);

  return (
    <div className="drawer-page">
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        打开 Drawer
      </Button>
      <Drawer
        open={open}
        title='Group List'
        onCancel={() => {
          setOpen(false);
        }}
      >
        <div>crm drawer</div>
      </Drawer>
    </div>
  );
}
