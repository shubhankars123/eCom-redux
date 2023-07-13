import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchProductsByFilters } from "./ProductAPI.js"

const initialState = {
    products: [],
    status: "idle",
    totalItems : 0
};

// The value we return becomes the 'fulfilled action payload
export const fetchAllProductsAsync = createAsyncThunk(
    'product/fetchAllProducts',
    async () => {
        const response = await fetchAllProducts();
        return response.data;  
    }
)

// The value we return becomes the 'fulfilled action payload
export const fetchProductsByFilterAsync = createAsyncThunk(
    'product/fetchAllProductsByFilters',
    async ({filter, sort, pagination}) => {
        const response = await fetchProductsByFilters(filter, sort, pagination);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
)



export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchAllProductsAsync.pending, (state) => {
            state.status = 'loading';
        }).addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
            state.status = 'idle'
            state.products = action.payload
        }).addCase(fetchProductsByFilterAsync.pending, (state) => {
            state.status = 'loading';
        }).addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
            state.status = 'idle'
            state.products = action.payload.products
            state.totalItems = action.payload.totalItems
        })

    }
})

export const { increment } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;

export default productSlice.reducer