import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Divider, Popconfirm, Row } from 'antd';
import type { ColumnProps } from 'antd/es/table';
import { ITask } from '../model';

/*
 * custom table columns
 * refer: https://ant.design/components/table-cn/#Column
 */
export default (handleAction, dataSource: []) => {
  const list: ColumnProps<ITask>[] = [
    // 需设置，根据业务需求需要完善列表内容。
    // 除width外其余均为必填，字段规则查看https://ant.design/components/table-cn/#Column
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'key',
      width: 200,
    },
    {
      title: 'BaseToken',
      key: 'baseToken',
      width: 200,
      render: (text, record) => record.baseToken.symbol,
    },
    {
      title: 'QuoteToken',
      key: 'quoteToken',
      width: 200,
      render: (text, record) => record.quoteToken.symbol,
    },
    {
      title: 'Before Tx',
      key: 'tx_before',
      width: 200,
      render: (text, record) => (
        <>
          <Row>{record.base_reserve_before}</Row>
          <Row>{record.quote_reserve_before}</Row>
        </>
      ),
    },
    {
      title: 'Base Token Amount',
      key: 'base_amount',
      width: 300,
      render: (text, record) => record.base_amount,
    },
    {
      title: 'Quote Token Amount',
      key: 'quote_amount',
      width: 300,
      render: (text, record) => record.quote_amount,
    },

    {
      title: 'After Tx',
      key: 'tx_after',
      width: 200,
      render: (text, record) => (
        <>
          <Row>{record.base_reserve_after}</Row>
          <Row>{record.quote_reserve_after}</Row>
        </>
      ),
    },
  ];

  // todo: oprations
  // add edit/delete or other operations according to special requirements
  list.push({
    title: 'Operations',
    key: 'operations',
    width: 200,
    fixed: 'right',
    render: (_, record, index) => (
      <>
        <Popconfirm
          title="Confirm Delete"
          onConfirm={() => handleAction('delete', record, index)}
          disabled={index !== dataSource.length - 1}
        >
          <Button
            icon={<DeleteOutlined />}
            disabled={index !== dataSource.length - 1}
            danger
            size="small"
          />
        </Popconfirm>
      </>
    ),
  });

  return list;
};
