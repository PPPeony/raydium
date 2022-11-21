import type { SelectProps } from 'antd';
import { Form, Modal, Select } from 'antd';

import { useCallback } from 'react';
import { IToken, TOKEN_LIST } from '../model';

const options: SelectProps['options'] = [];
for (let i = 0; i < 100000; i++) {
  const value = `${i.toString(36)}${i}`;
  options.push({
    label: value,
    value,
    disabled: i === 10,
  });
}

const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};

interface IData {
  base: IToken;
  quote: IToken;
}
interface IParams {
  data?: IData;
  isOpen: boolean;
  onOk: (data: IData) => void;
  onCancel: () => void;
}

const TokenSelectModal: React.FC = (props: IParams) => {
  const form = Form.useForm();

  const onSubmit = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      form
        .validateFields()
        .then((values) => {
          /*
      values:
        {
          username: 'username',
          password: 'password',
        }
      */
        })
        .catch((errorInfo) => {
          /*
        errorInfo:
          {
            values: {
              username: 'username',
              password: 'password',
            },
            errorFields: [
              { name: ['password'], errors: ['Please input your Password!'] },
            ],
            outOfDate: false,
          }
        */
        });
    },
    [],
  );
  return (
    <Modal
      title="Basic Modal"
      open={props.isOpen}
      onOk={onsubmit as any}
      onCancel={props.onCancel}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        initialValues={props.data}
        form={form}
      >
        <Form.Item label="Base Token" name="base">
          <Select
            style={{ width: 300 }}
            placeholder="Please select"
            defaultValue={props.data?.base}
            options={TOKEN_LIST}
          />
        </Form.Item>

        <Form.Item label="Quote Token" name="quote">
          <Select
            style={{ width: 300 }}
            placeholder="Please select"
            defaultValue={props.data?.quote}
            options={TOKEN_LIST}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default TokenSelectModal;
