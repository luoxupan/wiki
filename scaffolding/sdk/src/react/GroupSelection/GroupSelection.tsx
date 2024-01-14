import "./GroupSelection.less";
import * as React from "react";
import { IbddpSdk } from '../../lib';
import { Type } from '../../lib/config/enum';
import { Modal } from '../base-components';

export function GroupSelection(props: any) {

  const { mountDom, open, style, onCancel } = props;

  let eleRef = React.useRef(null as any);
  let ibddpSdk = React.useRef(null as any);

  React.useEffect(() => {
    ibddpSdk.current = new IbddpSdk({
      mountDom: eleRef.current,
      type: Type.GroupSelection,
      env: 'sim',
      onChange(data) {
      }
    });
    ibddpSdk.current.open();
    return () => {
      ibddpSdk.current.destroy();
    }
  }, []);

  return (
    <Modal
      open={open}
      title='Group Selection'
      style={{ width: 700 }}
      onCancel={() => {
        onCancel && onCancel();
      }}
    >
      <div
        style={{ ...style }}
        className="group-selection"
      >
        <div ref={eleRef} className='iframe-parent-div'>
        </div>
      </div>
    </Modal>
  );
}
