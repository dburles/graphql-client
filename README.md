# A GraphQL Client

## GraphQLQuery

*Options*

`url` (optional) defaults to `/graphql`

`query` GraphQL query

`cache` (optional) defaults to `false`

`requestOptionsOverride` (optional)

*Instance methods*

`fetch` [function] Returns a promise, takes an optional object containing `variables` field.

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
  cache: true,
});

myQuery.fetch().then(data => console.log(data));
```

## GraphQLMutation

*Options*

`url` (optional) defaults to `/graphql`

`query` GraphQL query

`requestOptionsOverride` (optional)

*Instance methods*

`fetch` [function] Returns a promise, takes an optional object containing `variables` field.

```js
myQuery.fetch({ variables: { id: '1' } });
```

`options` The options passed in

#### Example:

```js
import { GraphQLQuery } from './graphql.js';

const myMutation = GraphQLQuery({
  url: '...',
  query: `...`,
  cache: true,
});

myMutation.fetch().then(data => console.log(data));
```
