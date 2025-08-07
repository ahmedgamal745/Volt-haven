import { ADD_TO_CART, DECREMENT, INCREMENT } from "../actions/counter.actions";
import { CounterAction } from "../cartState";





const InitialState: Counter = {
  quantities: {},
  cartItems: {}
};
export interface Counter {
  quantities: { [productId: number]: number };
  cartItems: { [productId: number]: any & { quantity: number } };
}

export const counterReducer = (state = InitialState, action: CounterAction): Counter => {
  const id = action.payload?.id;
  const currentQty = state.quantities[id] || 0;

  switch (action.type) {
    case INCREMENT:
        return {
            ...state,
            quantities: {
            ...state.quantities,
            [id]: currentQty + 1
            }
      };

    case DECREMENT:
        return {
            ...state,
            quantities: {
            ...state.quantities,
            [id]: currentQty > 0 ? currentQty - 1 : 0
            }
        };
      case ADD_TO_CART: {
            const product = action.payload;
            const addedQty = state.quantities[product.id] || 1;
            const existingCartItem = state.cartItems[product.id];

            const totalQty = (existingCartItem?.quantity || 0) + addedQty;

            const newCartItem = {
                ...product,
                quantity: totalQty
            };

            console.log(`Item "${product.title}" added. Total quantity: ${totalQty}`);

            return {
                ...state,
                cartItems: {
                ...state.cartItems,
                [product.id]: newCartItem
                }
            };
        }

    default:
      return state;
  }
};