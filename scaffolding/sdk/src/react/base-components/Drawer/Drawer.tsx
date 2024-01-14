import "./Drawer.less";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button } from '../Button/Button';

export function Drawer(props: any) {

  const { open, title, children, onOk, onCancel } = props;
  
  return ReactDOM.createPortal(
    <div style={{ display: open ? 'flex' : 'none' }} className="crm-drawer">
      <div className="crm-drawer-mask"></div>
      <div className="crm-drawer-content">
        <div className="crm-drawer-header">
          {title}
        </div>
        <div className="crm-drawer-body">
          {children}
        </div>
        <div className="crm-drawer-footer">
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
