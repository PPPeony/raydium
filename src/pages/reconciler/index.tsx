import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Button, Card, Col, Row, Space, Spin, Table } from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'dva';
import { useCallback, useEffect, useMemo, useState } from 'react';

import CurrencyDataTable from '@/components/CurrencyDataTable';

import { IDVAConnectState } from '@/models/connectModel';

import getTableColumns from './components/TableColumns';
import taskDialog from './components/TaskDialog';
import TokenSelectArea from './components/TokenSelectArea';
import {
  IFilterInfo,
  IPoolInfo,
  IReconcilerState,
  ITask,
  NAME_SPACE,
} from './model';

export default function Reconciler() {
  const dispatch = useDispatch();
  const { poolInfo, filterInfo, loading } = useSelector(
    (state: { [NAME_SPACE]: IReconcilerState } & IDVAConnectState) => {
      return {
        poolInfo: state[NAME_SPACE].poolInfo,
        filterInfo: state[NAME_SPACE].filterInfo,
        loading: Boolean(
          state.loading.effects[`${NAME_SPACE}/getPoolInfo`] ||
            state.loading.effects[`${NAME_SPACE}/reconciler`],
        ),
      };
    },
    shallowEqual,
  );

  const handleSelectChange = useCallback((data: IFilterInfo) => {
    dispatch({
      type: `${NAME_SPACE}/getPoolInfo`,
      opt: data,
    });
  }, []);

  // init
  useEffect(() => {
    handleSelectChange(filterInfo!);
  }, []);

  const [list, setList] = useState<ITask[]>([]);

  const getNextTaskData = useCallback(
    (poolInfo: IPoolInfo, prev?: ITask): ITask => {
      return {
        baseToken: poolInfo!.baseToken,
        base_reserve_before: prev
          ? prev.base_reserve_after!
          : poolInfo.baseReserve,
        quoteToken: poolInfo!.quoteToken,
        quote_reserve_before: prev
          ? prev.quote_reserve_after!
          : poolInfo.quoteReserve,
        rate_before: prev ? prev.rate_after! : poolInfo.rate,
      };
    },
    [],
  );

  const handleAction = useCallback(
    async (action: string, item?: ITask, index?: number) => {
      switch (action) {
        case 'reconciler':
          await dispatch({
            type: `${NAME_SPACE}/reconciler`,
            opt: [...list],
          });
          setList([]);
          handleSelectChange(filterInfo!);
          break;
        case 'create':
          taskDialog({
            data: getNextTaskData(poolInfo!, list[list.length - 1]),
            onSubmit: (item: ITask) => {
              setList((prev) => [...prev, item]);
            },
          });
          break;
        case 'delete':
          setList((prev) => prev.filter((item, i) => i !== index));
          break;
      }
    },
    [poolInfo, list],
  );

  const tableColumns = useMemo(
    () => getTableColumns(handleAction, list as []),
    [handleAction, list],
  );

  return (
    <Spin spinning={loading}>
      <TokenSelectArea onChange={handleSelectChange} data={filterInfo} />
      <CurrencyDataTable data={poolInfo} />
      <Card
        title={
          <Row>
            <Col span={6}> UserIdentity List </Col>
          </Row>
        }
        extra={
          <Space>
            {/* 
                可设置：根据需求判断是否需要添加功能按钮，如批量操作等功能
              */}
            <Button
              type="primary"
              onClick={() => handleAction('create')}
              disabled={list.length >= 3}
            >
              Create
            </Button>
            <Button
              type="primary"
              onClick={() => handleAction('reconciler')}
              disabled={list.length === 0}
            >
              Reconciler
            </Button>
          </Space>
        }
      >
        <Table<ITask>
          dataSource={list}
          columns={tableColumns}
          scroll={{ x: true }}
          rowKey={(r, i) => i!}
        />
      </Card>
    </Spin>
  );
}
