# A GraphQL Client

> Why? 

It should be easy to manipulate a GraphQL cache.

> How does the cache work?

A cache is maintained within each `GraphQLQuery` and is unique to the variables provided. 

> How does the cache work?

Internally that's all the cache does. The `setCache` function allows the cache to be manipulated. Once you have updated the cache with `setCache`, calling `fetch` (with the same variables) will return the updated cache.

## GraphQLQuery

### Options

`url` (optional) defaults to `/graphql`

`query` GraphQL query

`cache` (optional) defaults to `false`

`requestOptions` (optional)

### API

`fetch` [function] Returns a promise. Takes an optional object containing a `variables` field.

```js
myQuery.fetch({ variables: { id: '1' } });
```

`setCache` [function] Used to mutate the cache

```js
// Example
myQuery.setCache(cache => ({ items: [...cache.items, { id: '2', title: 'new' }] }));
```

`getCache` [function] Returns the current cache

`refetch` [function] Requests previous request from the server

`fetchMore` [function] Fetch more data without affecting existing cache

`options` The options passed in

#### Example:

```js
import { GraphQLQuery } from './graphql.js';

const myQuery = GraphQLQuery({
  url: 'https://api.graph.cool/simple/v1/swapi',
  cache: true,
  query: `
    {
      allPlanets {
        climate
        gravity
        residents {
          birthYear
          films {
            title
          }
        }
      }
    }
  `,
});

myQuery.fetch().then(data => console.log(data));
```

## GraphQLMutation

### Options

`url` (optional) defaults to `/graphql`

`query` GraphQL query

`requestOptions` (optional)

### API

`fetch` [function] Returns a promise. Takes an optional object containing a `variables` field.

```js
myQuery.fetch({ variables: { id: '1' } });
```

`options` The options passed in

#### Example:

```js
import { GraphQLQuery } from './graphql.js';

const myMutation = GraphQLMutation({
  url: '...',
  query: `...`,
});

myMutation.fetch({ variables: { title: 'New title' } }).then(data => console.log(data));
```
