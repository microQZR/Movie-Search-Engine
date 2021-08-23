# Movie Search Engine

A movie search engine built using React and TypeScript.

It interfaces with a third-party API ([The Movie Database API](https://www.themoviedb.org/)) to fetch a list of recommanded movie titles based on the user's search query.

## Features

- Instant Search
- Fully Responsive

## Live Demo

See a live demo of this application [here](https://tmdb-movie-search-engine.netlify.app/).

## Build and Deployement

For build and deployment instructions see file [`Create-React-App-README.md`](./Create-React-App-README.md).

## Environment Variables

The application is set up to make use of two environment variables:

- `REACT_APP_TMDB_API_KEY` : The token required to make queries to [The Movie DB API](https://www.themoviedb.org/).
- `REACT_APP_PROXY_URL` (optional) : The url of the proxy service responsible for redirecting search queries. If provided, queries are directed to this url instead of TMDB.

## Attributions and Notices

"This product uses the TMDb API but is not endorsed or certified by TMDb."

This application interfaces with [The Movie Database API](https://www.themoviedb.org/). If you intend to use this application, please make sure to review TMDB's [Terms of Use](https://www.themoviedb.org/terms-of-use), [API Terms of Use](https://www.themoviedb.org/documentation/api/terms-of-use), and [Privacy Policy](https://www.themoviedb.org/privacy-policy).
