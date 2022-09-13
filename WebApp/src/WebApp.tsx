import * as React from "react";
import { UndoRedo } from './components/index';
import { Button } from 'antd';

export function WebApp() {
  return (
    <div className="web-app">
      <UndoRedo />
      <Button onClick={() => {
        console.log('===');
      }}>
        Button
      </Button>
    </div>
  );
}
