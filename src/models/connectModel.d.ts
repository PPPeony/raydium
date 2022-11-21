/**
 * global interfaces of dva
 */

import { Model } from 'dva';
import { EffectsMapObject, ReducersMapObject } from 'umi';

export interface IBaseModelType<S extends Record<string, any>> extends Model {
  state: S;
  reducers: ReducersMapObject<S>;
  effects: EffectsMapObject;
}

export interface ILoadingState {
  global: boolean;
  models: Record<string, boolean>;
  effects: Record<string, boolean>;
}

export interface IDVAConnectState {
  loading: ILoadingState;
  [s: string]: any;
}

export type ModelState = Record<string, unknown>;
