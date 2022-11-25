import { observer, useField } from '@formily/react';
import type { SelectProps } from 'antd';
import { Avatar, Row, Select } from 'antd';
import React from 'react';

import { useCallback } from 'react';
import { IFilterInfo, IToken, TOKEN_LIST } from '../model';

interface ITSelectProps extends Omit<SelectProps, 'options'> {
  dataList?: IToken[];
}

export const TSelect = React.memo(function TSelect(props: ITSelectProps) {
  const { dataList, ...restProps } = props;
  return (
    <Select {...restProps}>
      {(dataList ?? TOKEN_LIST).map((item, index) => (
        <Select.Option key={index} value={item.mint}>
          <Avatar src={item.icon} shape="square" />
          {`${item.name}(${item.symbol})`}
        </Select.Option>
      ))}
    </Select>
  );
});

export const TSelectFormily = observer((props) => {
  return <TSelect showSearch {...props} />;
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
        placeholder="Base Select"
        style={{ width: 300 }}
        value={props.data?.base || ''}
        showSearch
        onChange={(value) => handleChange('base', value)}
      />
      <TSelect
        placeholder="Quote Select"
        style={{ width: 300 }}
        value={props.data?.quote || ''}
        onChange={(value) => handleChange('quote', value)}
      />
    </Row>
  );
};
export default TokenSelectArea;
