import {
  FormDialog,
  FormGrid,
  FormItem,
  FormLayout,
  IModalProps,
  Input,
  NumberPicker,
  Select,
  Space,
} from '@formily/antd';
import { Field, onFieldReact, onFieldValueChange } from '@formily/core';
import { createSchemaField, useForm } from '@formily/react';
import { useCallback, useMemo, useState } from 'react';
import type { ITask, IToken } from '../model';
import { ACTION_LIST } from '../model';
import { TSelectFormily } from './TokenSelectArea';

const DialogSF = createSchemaField({
  components: {
    FormLayout,
    FormItem,
    Select,
    Input,
    NumberPicker,
    TSelectFormily,
    FormGrid,
    Space,
  },
});

type IProps = {
  data: ITask;
  onSubmit: (data: ITask) => any;
};

const decimalFormat = (num: number, decimals: number) => {
  return Number(num.toFixed(decimals));
};

const Dialog = (props: IProps) => {
  const generateSchema = (data?: ITask) => {
    // 此处为弹框的schema
    const tokenList = [data?.baseToken, data?.quoteToken].filter(
      (item) => !!item,
    ) as IToken[];
    const schema = {
      type: 'object',
      properties: {
        layout: {
          type: 'void',
          'x-component': 'FormLayout',
          'x-component-props': {
            labelCol: 4,
            wrapperCol: 20,
            layout: 'horizontal',
          },
          properties: {
            action: {
              title: 'Action',
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
            token_select: {
              type: 'void',
              title: 'Token Select',
              'x-decorator': 'FormItem',
              'x-component': 'FormGrid',
              'x-decorator-props': {
                asterisk: true,
                feedbackLayout: 'none',
              },
              properties: {
                token1_mint: {
                  type: 'string',
                  required: true,
                  default: data?.baseToken.mint,
                  'x-decorator': 'FormItem',
                  'x-component': 'TSelectFormily',
                  'x-component-props': {
                    placeholder: 'Select Token1',
                    showSearch: false,
                    dataList: tokenList,
                  },
                },
                token2_mint: {
                  type: 'string',
                  required: true,
                  'x-disabled': true,
                  'x-decorator': 'FormItem',
                  'x-component': 'TSelectFormily',
                  'x-component-props': {
                    placeholder: 'Select Token2',
                    dataList: tokenList,
                  },
                },
              },
            },
            trade_amount: {
              type: 'void',
              title: 'Trade Amount',
              'x-decorator': 'FormItem',
              'x-component': 'FormGrid',
              'x-decorator-props': {
                asterisk: true,
                feedbackLayout: 'none',
              },

              properties: {
                token1_amount: {
                  type: 'number',
                  required: true,
                  format: 'number',
                  default: 0,
                  'x-decorator': 'FormItem',
                  'x-component': 'NumberPicker',
                  'x-component-props': {
                    placeholder: 'Token1 Amount',
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
            token_reserve_simulated: {
              type: 'void',
              title: 'Simulate Amount',
              'x-decorator': 'FormItem',
              'x-component': 'FormGrid',
              'x-decorator-props': {
                asterisk: true,
                feedbackLayout: 'none',
              },
              properties: {
                base_reserve_after: {
                  type: 'number',
                  default: data?.base_reserve_after || 0,
                  'x-disabled': true,
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                  'x-component-props': {
                    placeholder: 'Simulated Base Reserve',
                    disabled: true,
                  },
                },
                quote_reserve_after: {
                  type: 'number',
                  default: data?.quote_reserve_after || 0,
                  'x-disabled': true,
                  'x-decorator': 'FormItem',
                  'x-component': 'NumberPicker',
                  'x-component-props': {
                    placeholder: 'Simulated Quote Reserve',
                    disabled: true,
                  },
                },
              },
            },
            slippage_tolerance: {
              type: 'number',
              required: true,
              title: 'Slippage Tolerance',
              default: (data?.slippage_tolerance || 0.005) * 100,
              'x-disabled': true,
              'x-decorator': 'FormItem',
              'x-component': 'NumberPicker',
              'x-component-props': {
                placeholder: 'Slippage Tolerance',
              },
            },
            rate_after: {
              type: 'number',
              required: true,
              title: 'Final Rate',
              default: data?.rate_after || 0,
              'x-disabled': true,
              'x-decorator': 'FormItem',
              'x-component': 'Input',
              'x-component-props': {
                placeholder: 'Simulated Quote Reserve',
                disabled: true,
              },
              'x-reactions': {
                dependencies: ['.base_reserve_after', '.quote_reserve_after'],
                fulfill: {
                  state: {
                    value: '{{$deps[0] ? $deps[1]/$deps[0] : 0}}',
                  },
                },
              },
            },
          },
        },
      },
    };

    return schema;
  };

  /*
   * modalInfo 中的参数可以参考 antd modal
   * https://ant.design/components/modal-cn/#API
   */
  const modalInfo: IModalProps = {
    title: 'Task Dialog',
    width: 800,
  };

  FormDialog(modalInfo, (form) => {
    form.setEffects(() => {
      // todo 此处填写弹框副作用逻辑，例如联动
      // 可设置：对于复杂表单间的联动逻辑，可以在此设置
      onFieldReact('token2_mint', (field) => {
        if (field.query('.token1_mint').value() === props.data.baseToken.mint) {
          (field as Field).value = props.data.quoteToken.mint;
        } else {
          (field as Field).value = props.data.baseToken.mint;
        }
      });
      onFieldReact('token2_amount', (field) => {
        const token1_mint_field = field.query('.token1_mint').take() as Field;
        const token1_amount_field = field
          .query('.token1_amount')
          .take() as Field;
        const action_field = field.query('.action').take() as Field;
        let target_value = 0;
        let target_decimals = 0;
        if (action_field.value === 'swap') {
          // swap
          if (token1_mint_field.value === props.data?.baseToken.mint) {
            target_value =
              (0.9975 *
                token1_amount_field.value *
                props.data!.quote_reserve_before) /
              (props.data!.base_reserve_before + token1_amount_field.value);
            target_decimals = props.data?.baseToken.decimals;
          } else {
            target_value =
              (0.9975 *
                token1_amount_field.value *
                props.data!.base_reserve_before) /
              (props.data!.quote_reserve_before + token1_amount_field.value);
            target_decimals = props.data?.quoteToken.decimals;
          }
        } else {
          // liquidity
          if (token1_mint_field.value === props.data?.baseToken.mint) {
            target_value =
              token1_amount_field.value * (props.data?.rate_before || 0);
            target_decimals = props.data?.quoteToken.decimals;
          } else {
            target_value = props.data?.rate_before
              ? token1_amount_field.value / props.data.rate_before
              : 0;
            target_decimals = props.data?.baseToken.decimals;
          }
        }
        (field as Field).value = decimalFormat(target_value, target_decimals);
      });
      onFieldReact('.base_reserve_after', (field) => {
        const token1_mint_field = field.query('.token1_mint').take() as Field;
        const token1_amount_field = field
          .query('.token1_amount')
          .take() as Field;
        const action_field = field.query('.action').take() as Field;
        let target_value = 0;
        let target_decimals = 0;
        if (action_field.value === 'swap') {
          if (token1_mint_field.value === props.data?.baseToken.mint) {
            target_value =
              props.data!.base_reserve_before + token1_amount_field.value;
            target_decimals = props.data?.baseToken.decimals;
          } else {
            target_value =
              props.data!.quote_reserve_before + token1_amount_field.value;
            target_decimals = props.data?.quoteToken.decimals;
          }
        } else {
          // liquidity
          if (token1_mint_field.value === props.data?.baseToken.mint) {
            target_value =
              props.data!.base_reserve_before + token1_amount_field.value;
            target_decimals = props.data?.baseToken.decimals;
          } else {
            target_value =
              props.data!.quote_reserve_before + token1_amount_field.value;
            target_decimals = props.data?.quoteToken.decimals;
          }
        }
        (field as Field).value = decimalFormat(target_value, target_decimals);
      });
      onFieldReact('.quote_reserve_after', (field) => {
        const token2_mint_field = field.query('.token2_mint').take() as Field;
        const token2_amount_field = field
          .query('.token2_amount')
          .take() as Field;
        const action_field = field.query('.action').take() as Field;
        let target_value = 0;
        let target_decimals = 0;
        if (action_field.value === 'swap') {
          if (token2_mint_field.value === props.data?.baseToken.mint) {
            target_value =
              props.data!.base_reserve_before - token2_amount_field.value;
            target_decimals = props.data?.baseToken.decimals;
          } else {
            target_value =
              props.data!.quote_reserve_before - token2_amount_field.value;
            target_decimals = props.data?.quoteToken.decimals;
          }
        } else {
          // liquidity
          if (token2_mint_field.value === props.data?.baseToken.mint) {
            target_value =
              props.data!.base_reserve_before + token2_amount_field.value;
            target_decimals = props.data?.baseToken.decimals;
          } else {
            target_value =
              props.data!.quote_reserve_before + token2_amount_field.value;
            target_decimals = props.data?.quoteToken.decimals;
          }
        }
        (field as Field).value = decimalFormat(target_value, target_decimals);
      });
    });
    return (
      <FormLayout labelCol={6} wrapperCol={10}>
        <DialogSF schema={generateSchema(props.data)} />
      </FormLayout>
    );
  })
    .forOpen((payload, next) => {
      // 此处填写打开前逻辑
      // 此处可以填写initvalue
      // 注意此处payload 还是 undefined
      next(payload);
    })
    .forConfirm(async (payload, next) => {
      // 此处填写点击确认按钮后逻辑
      const res = {
        ...props.data,
      };
      const {
        token1_mint,
        token1_amount,
        token2_amount,
        slippage_tolerance,
        ...rest
      } = payload.values;
      if (token1_mint === props.data.baseToken.mint) {
        res.base_amount = token1_amount;
        res.quote_amount = token2_amount;
      } else {
        res.base_amount = token2_amount;
        res.quote_amount = token1_amount;
      }
      res.slippage_tolerance = slippage_tolerance / 100;
      Object.assign(res, rest);
      /* --------表单提交逻辑 start---------- */
      // 需设置：根据需求完成对表单数据按照接口格式的调整并调用请求方法
      // 发送请求
      await props.onSubmit(res);
      /* ========表单提交逻辑 end========== */

      next(payload);
    })
    .forCancel((payload, next) => {
      next(payload);
    })
    .open(); // 此处可以填写initvalue
};

export default Dialog;
