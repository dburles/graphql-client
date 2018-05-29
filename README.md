# A GraphQL Client

## GraphQLQuery

`url` (optional) defaults to `/graphql`

`query` GraphQL query

`cache` (optional) defaults to `false`

`requestOptionsOverride` (optional)


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

`url` (optional) defaults to `/graphql`

`query` GraphQL query

`requestOptionsOverride` (optional)

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
