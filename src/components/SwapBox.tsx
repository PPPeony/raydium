import React from "react";
import { Button, Form, Input } from 'antd';


export default function SwapBox() {

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Connect Wallet
        </Button>
      </Form.Item>
    </Form>
  );
};