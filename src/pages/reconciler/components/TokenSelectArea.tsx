import type { SelectProps } from 'antd';
import {
  Avatar,
  Button,
  Cascader,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
  Switch,
  TreeSelect,
} from 'antd';
import React from 'react';

import { useCallback, useMemo } from 'react';
import { IFilterInfo, IToken, TOKEN_LIST } from '../model';

const options: SelectProps['options'] = [];
for (let i = 0; i < 100000; i++) {
  const value = `${i.toString(36)}${i}`;
  options.push({
    label: value,
    value,
    disabled: i === 10,
  });
}

const TSelect = React.memo(function TSelect(props: {
  value: string;
  plactholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select
      style={{ width: 300 }}
      placeholder={props.plactholder}
      value={props.value}
      showSearch={true}
      onChange={props.onChange}
    >
      {TOKEN_LIST.map((item, index) => (
        <Select.Option key={index} value={item.mint}>
          <Avatar src={item.icon} shape="square" />
          {`${item.name}(${item.symbol})`}
        </Select.Option>
      ))}
    </Select>
  );
});

interface IParams {
  data?: IFilterInfo;
  onChange: (data: IFilterInfo) => void;
}

const TokenSelectArea = (props: IParams) => {
  const handleChange = useCallback(
    (type: keyof IFilterInfo, value: string) => {
      if (props.data) {
        props.onChange({ ...props.data, [type]: value });
      } else {
        props.onChange({ [type]: value });
      }
    },
    [props.data],
  );
  return (
    <Row>
      <TSelect
        plactholder="Base Select"
        value={props.data?.base || ''}
        onChange={(value) => handleChange('base', value)}
      />
      <TSelect
        plactholder="Quote Select"
        value={props.data?.quote || ''}
        onChange={(value) => handleChange('quote', value)}
      />
    </Row>
  );
};
export default TokenSelectArea;
