import "./Options.less";
import * as React from "react";
import { uuid } from '../../utils';
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
                        <Input autoComplete="off" />
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
                        <Input autoComplete="off" />
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
      <Button
        className="add-button"
        onClick={() => {
          formRef.current.add({
            id: uuid(),
            enabled: false,
            RegExp_url: '',
            redirect_url: '',
            type: 'ResProxy'
          });
        }}
      >
        增加
      </Button>
      <Button
        type="primary"
        onClick={async () => {
          const formData = await form.validateFields();
          console.log(formData);
          // @ts-ignore
          await chrome.storage.sync.set({ rules: formData.rules });
          message.success('保存成功');
        }}
      >
        保存
      </Button>
    </div>
  );
}
