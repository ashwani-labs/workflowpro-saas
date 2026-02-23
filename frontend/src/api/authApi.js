import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),
    inviteUser: builder.mutation({
      query: (body) => ({
        url: '/users/invite',
        method: 'POST',
        body,
      }),
    }),
    getOrganizationUsers: builder.query({
      query: () => '/users/organization',
    }),
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/users/${userId}/role?role=${role}`,
        method: 'PUT',
      }),
    }),
    removeUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { 
  useLoginMutation, 
  useRegisterMutation,
  useInviteUserMutation,
  useGetOrganizationUsersQuery,
  useUpdateUserRoleMutation,
  useRemoveUserMutation
} = authApi
