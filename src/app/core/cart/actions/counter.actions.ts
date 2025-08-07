import { CounterAction } from "../cartState";




export const INCREMENT = '[Counter]INCREMENT';
export const DECREMENT = '[Counter]DECREMENT';
export const ADD_TO_CART = '[Cart] ADD_TO_CART';
export type AllCartActions = incrementAction | decrementAction | addToCartAction;


export class incrementAction implements CounterAction {
  readonly type = INCREMENT;
  constructor(public payload: { id: number }) {}
}

export class decrementAction implements CounterAction {
  readonly type = DECREMENT;
  constructor(public payload: { id: number }) {}
}


export class addToCartAction implements CounterAction {
  readonly type = ADD_TO_CART;
  constructor(public payload: any) {} // Include full product
}