import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import type {
  Movie,
  MovieRouteSuccessResponseData,
  MovieRouteErrorResponseData,
} from '@/types';

type RapidApiResponseData =
  | {
      Search: Movie[];
      totalResults: string;
      Response: 'True';
    }
  | { Response: 'False'; Error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    MovieRouteSuccessResponseData | MovieRouteErrorResponseData
  >
) {
  try {
    const { title } = req.query;

    if (!title) {
      return res
        .status(400)
        .json({ message: "'title' query param is required." });
    }

    const { data } = await axios.get<RapidApiResponseData>(
      'https://movie-database-alternative.p.rapidapi.com',
      {
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com',
        },
        params: {
          s: title,
          r: 'json',
          type: 'movie',
          page: '1',
        },
      }
    );

    if (data.Response === 'True') {
      res.status(200).json(data.Search);
    } else {
      res.status(400).json({ message: data.Error });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Something went wrong. Please try again.' });
  }
}
