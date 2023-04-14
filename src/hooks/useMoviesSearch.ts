import useSWR from 'swr';
import axios, { AxiosError } from 'axios';
import {
  MovieRouteErrorResponseData,
  MovieRouteSuccessResponseData,
} from '@/types';

const fetcher = async ([url, title]: string[]) => {
  try {
    const response = await axios.get<MovieRouteSuccessResponseData>(url, {
      params: {
        title,
      },
    });
    return response.data;
  } catch (err) {
    const error = err as Error | AxiosError<MovieRouteErrorResponseData>;

    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          'Something went wrong. Please try again.'
      );
    }

    throw error;
  }
};

const useMoviesSearch = (title: string) => {
  const { data, isLoading, error } = useSWR(
    title?.length ? ['api/movies', title] : null,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  return { movies: data || [], isLoading, error };
};

export default useMoviesSearch;
