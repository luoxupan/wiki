import "./GroupList.less";
import * as React from "react";
import { IbddpSdk } from '../../lib';
import { Type } from '../../lib/config/enum';
import { Drawer } from '../base-components';

export function GroupList(props: any) {
  const { mountDom, open, style, onCancel } = props;

  let eleRef = React.useRef(null as any);
  let ibddpSdk = React.useRef(null as any);

  React.useEffect(() => {
    ibddpSdk.current = new IbddpSdk({
      mountDom: eleRef.current,
      type: Type.GroupList,
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
    <Drawer
      open={open}
      title='Group List'
      onCancel={() => {
        onCancel && onCancel();
      }}
    >
      <div
        className="crm-group-list"
        style={{ ...style }}
      >
        <div ref={eleRef} className='iframe-parent-div'>
        </div>
      </div>
    </Drawer>
  );
}
