import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuthHeader } from '../utils';
import { paths } from '../utils';

const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery: fetchBaseQuery({ 
    baseUrl: paths.messages(),
    prepareHeaders: getAuthHeader,
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        method: 'POST',
        body: message,
      }),
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useEditMessageMutation,
  useRemoveMessageMutation,
} = messagesApi;

export default messagesApi;
