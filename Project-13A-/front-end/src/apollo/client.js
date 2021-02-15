import fetch from "cross-fetch"
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

export const client = new ApolloClient({
  link: new HttpLink({
    uri:
      "https://cqofyps4yrfmljpaapxc7q6wqi.appsync-api.us-east-1.amazonaws.com/graphql", // ENTER YOUR GRAPHQL ENDPOINT HERE
    fetch,
    headers: {
      "x-api-key": "da2-3anzcsptdzcarnrm2474cps3nu", // ENTER YOUR API KEY HERE
    },
  }),
  cache: new InMemoryCache(),
})
