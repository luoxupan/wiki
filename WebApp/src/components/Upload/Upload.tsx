import "./Upload.less";
import * as React from "react";
import { Button, message } from 'antd';

export function Upload(props: any) {

  return (
    <div className="comp-upload">
      <Button>导入配置</Button>
      <input
        type='file'
        accept='.json'
        className='upload-input'
        onChange={(event: any) => {
          const file = event.target.files[0];
          const fileReader = new FileReader();
          fileReader.readAsText(file);
          fileReader.onload = ({ target }: any) => {
            try {
              const result = JSON.parse(target.result);
              props.onChange(result);
            } catch (e) {
              message.error('导入失败，请检查文件格式是否正确');
            }
          };
        }}
      />
    </div>
  );
}
