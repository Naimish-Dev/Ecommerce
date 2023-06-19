import { createSlice } from "@reduxjs/toolkit";

const cartslice = createSlice({
  name: "cart",
  initialState: {
    cartid:null ,
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    cartid: (state, action) => {
      state.cartid = action.payload;
    },
    
    addtocart: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.quantity * action.payload.price;
    },
    removefromcart: (state, action) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
      state.cartid=null
    },

    quantityaddcarditem: (state, action) => {
      state = state.products.filter((val) => {
        if (val.OrderProduct_id === action.payload) {
          val.quantity++;
          state.total += val.price;
        }

        return state.products;
      });
    },

    quantityremovecarditem: (state, action) => {
      state = state.products.filter((val, index) => {
        if (val.OrderProduct_id === action.payload) {
          if (val.quantity > 1) {
            val.quantity--;
            state.total -= val.price;
          } else {
            state.quantity = state.quantity - 1;
            state.total = state.total - val.price;
            state.products.splice(index, 1);
          }
        }

        return state.products;
      });
    },
  },
});

export const {
  addtocart,
  removefromcart,
  quantityaddcarditem,
  quantityremovecarditem,
  cartid,
} = cartslice.actions;
export default cartslice.reducer;
