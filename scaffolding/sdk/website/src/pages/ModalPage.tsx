import * as React from "react";
import { Button, Modal } from '../../../src/react/index';

export function ModalPage(props: any) {

  const [open, setOpen] = React.useState(false);

  return (
    <div className="modal-page">
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        打开 Modal
      </Button>
      <Modal
        open={open}
        title='CSV upload'
        onCancel={() => {
          setOpen(false);
        }}
      >
        <div>crm modal</div>
      </Modal>
    </div>
  );
}
