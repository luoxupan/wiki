import "./Upload.less";
import * as React from "react";
import { IbddpSdk } from '../../lib';
import { Modal } from '../base-components';
import { Type } from '../../lib/config/enum';

export function Upload(props: any) {
  const { mountDom, open, style, onCancel } = props;

  let eleRef = React.useRef(null as any);
  let ibddpSdk = React.useRef(null as any);

  React.useEffect(() => {
    ibddpSdk.current = new IbddpSdk({
      mountDom: eleRef.current,
      type: Type.Upload,
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
      title='CSV upload'
      style={{ width: 700 }}
      onCancel={() => {
        onCancel && onCancel();
      }}
    >
      <div className="crm-upload">
        <div ref={eleRef} className='iframe-parent-div'>
        </div>
      </div>
    </Modal>
  );
}
