import "./Options.less";
import * as React from "react";
import { Utils } from '../../utils';
import { Upload } from '../Upload/Upload';
import { Form, Button, Input, Switch, message } from 'antd';

export function Options() {

  const [form] = Form.useForm();
  const formRef = React.useRef({} as any);

  const initData = async () => {
    // @ts-ignore
    const { rules } = await chrome.storage.sync.get(['rules']);
    form.setFieldsValue({ rules });
  }

  React.useEffect(() => {
    initData();
  }, []);

  return (
    <div className="chrome-extensions-options">
      <Form form={form}>
        <Form.List name="rules">
          {(fields, { add, remove }) => {
            if (!formRef.current.add) {
              formRef.current.add = add;
            }
            return (
              <>
                {fields.map((field, index) => {
                  return (
                    <div key={index} className="rules-list-item">
                      <Form.Item
                        {...field}
                        label={'From'}
                        name={[field.name, 'RegExp_url']}
                        rules={[
                          { required: true, message: '输入URL链接' },
                          { pattern: /^https?:\/\/.*$/i, message: '输入URL链接' }
                        ]}
                      >
                        <Input autoComplete="off" placeholder="http://x.com/a.js &ensp; 👈or👉 &ensp; http://x.com/*" />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        label={'To'}
                        name={[field.name, 'redirect_url']}
                        rules={[
                          { required: true, message: '输入URL链接' },
                          { pattern: /^https?:\/\/.*$/i, message: '输入URL链接' }
                        ]}
                      >
                        <Input autoComplete="off" placeholder="http://localhost/a.js  &ensp; 👈or👉 &ensp; http://localhost/static/js/" />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        className='item-switch'
                        valuePropName='checked'
                        name={[field.name, 'enabled']}
                      >
                        <Switch />
                      </Form.Item>
                      <Button
                        className='del-row-btn'
                        onClick={() => {
                          remove(field.name);
                        }}
                      >
                        删除
                      </Button>
                    </div>
                  )
                })}
              </>
            )
          }}
        </Form.List>
      </Form>
      <div className="option-buttons">
        <Button
          className="add-button"
          onClick={() => {
            formRef.current.add({
              id: Utils.uuid(),
              enabled: false,
              RegExp_url: '',
              redirect_url: '',
              type: 'ResProxy'
            });
          }}
        >
          增加配置
        </Button>
        <Upload
          onChange={(data: any) => {
            form.setFieldsValue({ rules: data });
          }}
        />
        <Button
          onClick={async () => {
            const formData = await form.validateFields();
            Utils.DownloadJsonDataToLocal(formData.rules, 'ExtensionsConfig.json');
          }}
        >
          导出配置
        </Button>
        <Button
          type="primary"
          className="primary-button"
          onClick={async () => {
            const formData = await form.validateFields();
            console.log(formData);
            // @ts-ignore
            await chrome.storage.sync.set({ rules: formData.rules });
            message.success('规则已经生效');
          }}
        >
          生效
        </Button>
      </div>
    </div>
  );
}
