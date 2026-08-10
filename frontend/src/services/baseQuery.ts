import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  prepareHeaders: (headers) => {
    const token = window.sessionStorage.getItem("accessToken");
    if (token) {
      headers.set("authorization", `bearer ${token}`);
    }

    return headers;
  },
});

const customFetchBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let res = await baseQuery(args, api, extraOptions);

  if (res.error) {
    const refreshToken = await baseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
      },
      api,
      extraOptions,
    );

    if (refreshToken.data) {
      const data = refreshToken.data as { accessToken: string };
      window.sessionStorage.setItem("accessToken", data.accessToken);
    }

    res = await baseQuery(args, api, extraOptions);
  }

  return res;
};

export default customFetchBaseQuery;
