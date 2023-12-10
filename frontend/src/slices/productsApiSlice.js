import { PRODUCTS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: PRODUCTS_URL,
        params: {
          keyword,
          pageNumber,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    getTop3Products: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/top3`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

// convention is "use" + whatever we called the endpoint("getProducts") + "Query"
export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateReviewMutation,
  useGetTop3ProductsQuery,
} = productsApiSlice;
