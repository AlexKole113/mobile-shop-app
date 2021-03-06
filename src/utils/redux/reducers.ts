import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit';
import type { AsyncActionCreator } from '@/utils/redux/actions';

export interface AsyncReducerState<T> {
  loading: boolean,
  data: T,
  error: string,
  status?: number,
}

export function getInitialAsyncState<T = any>(data: T): AsyncReducerState<T> {
  return {
    loading: true,
    data,
    error: '',
    status: 0,
  };
}

export function getInitialAsyncStateNoLoad<T>(data: T): AsyncReducerState<T> {
  return {
    ...getInitialAsyncState(data),
    loading: false,
  };
}

export function createAsyncReducer<T = any, K extends AsyncReducerState<T> = AsyncReducerState<T>>(
  initialState: K,
  asyncCreator: AsyncActionCreator<T>,
  configurator?:(builder: ActionReducerMapBuilder<K>) => void,
) {
  return createReducer(initialState, ((builder) => {
    builder
      .addCase(asyncCreator.request, (state, action) => ({
        ...state,
        params: action.payload ?? {},
        status: 0,
        loading: true,
        data: initialState.data,
        error: '',
      }))
      .addCase(asyncCreator.success, (state, action) => ({
        ...state,
        ...action.payload,
        error: '',
        loading: false,
      }))
      .addCase(asyncCreator.error, (state, action) => ({
        ...state,
        data: action.payload.data,
        error: action.payload.error,
        status: action.payload.status,
        loading: false,
      }))
      .addCase(asyncCreator.clear, () => initialState);
    if (configurator) {
      configurator(builder);
    }
  }));
}
