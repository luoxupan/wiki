import "./Modal.less";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button } from '../Button/Button';

export function Modal(props: any) {

  const { open, title, children, onOk, onCancel, style } = props;

  return ReactDOM.createPortal(
    <div style={{ display: open ? 'flex' : 'none' }} className='crm-modal'>
      <div className="crm-modal-mask"></div>
      <div style={{ ...style }} className="crm-modal-content">
        <div className="crm-modal-header">
          {title}
        </div>
        <div className="crm-modal-body">
          {children}
        </div>
        <div className="crm-modal-footer">
          <Button
            style={{ marginRight: 10 }}
            onClick={() => onCancel && onCancel()}
          >
            Cancel
          </Button>
          <Button
            type='primary'
            onClick={() => onOk && onOk()}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
    , document.body
  );
}
