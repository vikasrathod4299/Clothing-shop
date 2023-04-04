import {createSlice} from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState:{
        products:[],
        quantity:0,
        total:0
    },
    reducers:{
        addProduct:(state,action)=>{
            state.quantity+=1;
            state.products.push(action.payload);
            state.total+= action.payload.price * action.payload.quantity
        },
        removeProduct:(state)=>{
            state.products=[];
            state.quantity=0;
            state.total=0;
        },
        deletesSingleProduct:(state, action)=>{
            state.quantity=state.quantity-1;
            state.total = state.total - state.products[state.products.findIndex((item) => item._id === action.payload)].price
            state.products.splice(
                state.products.findIndex((item) => item._id === action.payload),
                1
              );
        },
        increaseProductQuantity:(state,action)=>{
            state.products[state.products.findIndex((item)=> item._id === action.payload)].quantity+=1
        },
        decreaseProductQuantity:(state,action)=>{
            state.products[state.products.findIndex((item)=> item._id === action.payload)].quantity-=1
        }
    }
})


export const {addProduct, removeProduct, deletesSingleProduct,increaseProductQuantity, decreaseProductQuantity} = cartSlice.actions;
export default cartSlice.reducer;