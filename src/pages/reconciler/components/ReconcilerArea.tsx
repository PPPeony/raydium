import {
  ArrayTable,
  Editable,
  Form,
  FormButtonGroup,
  FormItem,
  Input,
  NumberPicker,
  Select,
  Submit,
} from '@formily/antd';
import {
  createForm,
  Field,
  onFieldReact,
  onFieldValueChange,
} from '@formily/core';
import { createSchemaField, FormProvider } from '@formily/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Button } from 'antd';
import { useMemo, useState } from 'react';
import { IPoolInfo, IToken } from '../model';

import { TSelectFormily } from './TokenSelectArea';

enum IAction {
  SWAP = 'SWAP',
  ADD_LIQUIDITY = 'ADD_LIQUIDITY',
  REMOVE_LIQUIDITY = 'REMOVE_LIQUIDITY',
}

interface ITask {
  action: IAction;
  token1: IToken;
  token1mount: number;
  token2: IToken;
  token2Amount: number;
  slipper?: number;
}

export interface IReconcilerProps {
  data?: IPoolInfo;
  onSubmit: (queue: ITask[]) => void;
}

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Editable,
    Input,
    ArrayTable,
    TSelectFormily,
    Select,
    NumberPicker,
  },
});

const ACTION_LIST = [
  {
    label: 'Swap',
    value: 'swap',
  },
  {
    label: 'Add Liquidity',
    value: 'add_liquidity',
  },
  {
    label: 'Remove Liquidity',
    value: 'remove_liquidity',
  },
];

export default function ReconcilerArea(props: IReconcilerProps) {
  const wallet = useWallet();
  const walletModal = useWalletModal();
  const form = useMemo(() => {
    return createForm({
      effects() {
        onFieldReact('array.*.token2_mint', (field) => {
          const token1_mint_field = field.query('.token1_mint').take() as Field;
          if (token1_mint_field.value === props.data?.baseToken.mint) {
            (field as Field).value = props.data?.quoteToken.mint;
          } else {
            (field as Field).value = props.data?.baseToken.mint;
          }
        });
        onFieldReact('array.*.token2_amount', (field) => {
          const token1_mint_field = field.query('.token1_mint').take() as Field;
          const token1_amount_field = field
            .query('.token1_amount')
            .take() as Field;
          const action_field = field.query('.action').take() as Field;
          if (action_field.value === 'swap') {
            // swap
            if (token1_mint_field.value === props.data?.baseToken.mint) {
              (field as Field).value =
                (0.9975 *
                  token1_amount_field.value *
                  props.data!.quoteReserve) /
                (props.data!.baseReserve + token1_amount_field.value);
            } else {
              (field as Field).value =
                (0.9975 * token1_amount_field.value * props.data!.baseReserve) /
                (props.data!.quoteReserve + token1_amount_field.value);
            }
          } else {
            // liquidity
            if (token1_mint_field.value === props.data?.baseToken.mint) {
              (field as Field).value =
                token1_amount_field.value * (props.data?.rate || 0);
            } else {
              (field as Field).value = props.data?.rate
                ? token1_amount_field.value / props.data.rate
                : 0;
            }
          }
        });
        onFieldReact('array.*.base_reserve', (field) => {
          const token1_mint_field = field.query('.token1_mint').take() as Field;
          const token1_amount_field = field
            .query('.token1_amount')
            .take() as Field;
          const token2_amount_field = field
            .query('.token2_amount')
            .take() as Field;
          if (token1_mint_field.value === props.data?.baseToken.mint) {
            (field as Field).value =
              props.data!.baseReserve + token1_amount_field.value;
          } else {
            (field as Field).value =
              props.data!.baseReserve - token2_amount_field.value;
          }
        });
        onFieldReact('array.*.quote_reserve', (field) => {
          const token1_mint_field = field.query('.token1_mint').take() as Field;
          const token1_amount_field = field
            .query('.token1_amount')
            .take() as Field;
          const token2_amount_field = field
            .query('.token2_amount')
            .take() as Field;
          if (token1_mint_field.value === props.data?.baseToken.mint) {
            (field as Field).value =
              props.data!.quoteReserve - token2_amount_field.value;
          } else {
            (field as Field).value =
              props.data!.quoteReserve + token1_amount_field.value;
          }
        });
      },
    });
  }, [props.data]);
  const schema = useMemo(() => {
    const tokenList = [props.data?.baseToken, props.data?.quoteToken].filter(
      (item) => !!item,
    ) as IToken[];
    return {
      type: 'object',
      properties: {
        /**
          https://react.formilyjs.org/zh-CN/api/shared/schema#%E5%B1%9E%E6%80%A7
          https://antd.formilyjs.org/zh-CN/components
        */
        array: {
          type: 'array',
          maxLength: 3,
          'x-decorator': 'FormItem',
          'x-component': 'ArrayTable',
          'x-component-props': {
            pagination: { pageSize: 10 },
            scroll: { x: '100%' },
          },
          items: {
            type: 'object',
            properties: {
              column1: {
                type: 'void',
                'x-component': 'ArrayTable.Column',
                'x-component-props': {
                  width: 50,
                  title: 'Sort',
                  align: 'center',
                },
                properties: {
                  sort: {
                    type: 'void',
                    'x-component': 'ArrayTable.SortHandle',
                  },
                },
              },
              column2: {
                type: 'void',
                'x-component': 'ArrayTable.Column',
                'x-component-props': { width: 200, title: 'Action' },
                properties: {
                  action: {
                    type: 'string',
                    required: true,
                    default: 'swap',
                    enum: ACTION_LIST,
                    'x-decorator': 'FormItem',
                    'x-component': 'Select',
                    'x-component-props': {
                      placeholder: 'Select Action',
                    },
                  },
                },
              },
              column3: {
                type: 'void',
                'x-component': 'ArrayTable.Column',
                'x-component-props': { width: 200, title: 'Token1' },
                properties: {
                  token1_mint: {
                    type: 'string',
                    required: true,
                    default: props.data?.baseToken.mint,
                    'x-decorator': 'FormItem',
                    'x-component': 'TSelectFormily',
                    'x-component-props': {
                      placeholder: 'Select Token1',
                      style: { width: 200 },
                      dataList: tokenList,
                    },
                  },
                  token1_amount: {
                    type: 'number',
                    required: true,
                    format: 'number',
                    'x-decorator': 'FormItem',
                    'x-component': 'NumberPicker',
                    'x-component-props': {
                      placeholder: 'Token1 Amount',
                    },
                  },
                },
              },
              column4: {
                type: 'void',
                'x-component': 'ArrayTable.Column',
                'x-component-props': { width: 200, title: 'Token2' },
                properties: {
                  token2_mint: {
                    type: 'string',
                    required: true,
                    'x-disabled': true,
                    'x-decorator': 'FormItem',
                    'x-component': 'TSelectFormily',
                    'x-component-props': {
                      placeholder: 'Select Token2',
                      style: { width: 200 },
                      dataList: tokenList,
                    },
                  },
                  token2_amount: {
                    type: 'number',
                    required: true,
                    format: 'number',
                    'x-disabled': true,
                    'x-decorator': 'FormItem',
                    'x-component': 'NumberPicker',
                    'x-component-props': {
                      placeholder: 'Token2 Amount',
                    },
                  },
                },
              },
              column5: {
                type: 'void',
                'x-component': 'ArrayTable.Column',
                'x-component-props': { width: 250, title: 'PoolInfo' },
                properties: {
                  base_reserve: {
                    type: 'number',
                    'x-disabled': true,
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                    'x-component-props': {
                      placeholder: 'Simulated Base Reserve',
                      disabled: true,
                    },
                  },
                  quote_reserve: {
                    type: 'number',
                    'x-disabled': true,
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                    'x-component-props': {
                      placeholder: 'Simulated Quote Reserve',
                      disabled: true,
                    },
                  },
                },
              },
              column6: {
                type: 'void',
                'x-component': 'ArrayTable.Column',
                'x-component-props': {
                  title: 'Operations',
                  dataIndex: 'operations',
                },
                properties: {
                  item: {
                    type: 'void',
                    'x-component': 'FormItem',
                    properties: {
                      remove: {
                        type: 'void',
                        'x-component': 'ArrayTable.Remove',
                      },
                    },
                  },
                },
              },
            },
          },
          properties: {
            add: {
              type: 'void',
              title: 'Add PineLine',
              'x-component': 'ArrayTable.Addition',
              'x-reactions': {
                dependencies: ['array'],
                fulfill: {
                  state: {
                    disabled: '{{$deps[0].length >= 3}}',
                    title: '{{`Add PineLine (${$deps[0].length})`}}',
                  },
                },
              },
            },
          },
        },
      },
    };
  }, [props.data]);

  return (
    <>
      <FormProvider form={form}>
        <SchemaField schema={schema} />
        <FormButtonGroup>
          {wallet.connected ? (
            <Submit onSubmit={console.log}>Reconciler</Submit>
          ) : (
            <Button onClick={() => walletModal.setVisible(true)}>
              Connect Wallet
            </Button>
          )}
        </FormButtonGroup>
      </FormProvider>
    </>
  );
}
