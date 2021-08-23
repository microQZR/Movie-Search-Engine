#!/bin/bash
# This script is the build/deploy script for the Netlify hosting platform. USAGE: In the "deployed site"s "Site settings" > "Build & deploy" > "Build settings" > "Build command", use the following command to avoid permission errors => "sh ./netlify-deployment-build-script.sh"

# Builds the React project
npm run build

# Creates a proper Netlify redirects file for "rewrites"
echo "${REACT_APP_PROXY_URL} page=:page query=:query   https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_TMDB_API_KEY}&language=en-US&page=:page&include_adult=false&query=:query   200" > ./build/_redirects

# A test file
echo "hello world" > ./build/hello.txt