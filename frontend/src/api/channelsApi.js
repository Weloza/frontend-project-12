import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getAuthHeader from '../utils/getAuthHeader';
import { paths } from '../utils/routes.js';

const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery: fetchBaseQuery({ 
    baseUrl: paths.channels(),
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
    
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
    }),
    getChannelById: builder.query({
      query: (id) => ({
        url: id,
      }),
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        method: 'POST',
        body: channel,
      }),
    }),
    editChannel: builder.mutation({
      query: (channel) => ({
        url: channel.id,
        method: 'PATCH',
        body: channel,
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useGetChannelByIdQuery,
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
} = channelsApi;

export default channelsApi;