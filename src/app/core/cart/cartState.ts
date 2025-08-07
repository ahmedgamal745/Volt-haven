import {Action, ActionReducerMap} from '@ngrx/store';
import { Counter, counterReducer } from './Reducer/counter.reducer';


export interface CartState{
    counter : Counter;
}

export interface CounterAction{
    type: string;
    payload?:any;
}



export const rootReducer: ActionReducerMap<CartState>={
    counter:counterReducer
}