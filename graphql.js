const defaultUrl = '/graphql';
const defaultRequestOptions = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};
const defaultFetchUserOptions = { variables: null };
const defaultFetchOptions = { fetchMore: false };

export const GraphQLQuery = ({
  url = defaultUrl,
  query,
  cache = false,
  requestOptionsOverride = options => options,
}) => {
  let _cache = {};
  let _variables = null;

  const fetcher = (
    userOptions = defaultFetchUserOptions,
    options = defaultFetchOptions,
  ) => {
    if (userOptions.variables && !options.fetchMore) {
      _variables = userOptions.variables;
    }

    const request = new Request(url, {
      ...requestOptionsOverride(defaultRequestOptions),
      body: JSON.stringify({
        query,
        variables: options.fetchMore ? userOptions.variables : _variables,
      }),
    });

    return fetch(request)
      .then(response => response.json())
      .then(data => {
        if (cache && !options.fetchMore) {
          _cache = data;
        }
        return data;
      });
  };

  return {
    ...(cache && {
      setCache: cb => {
        _cache = { data: cb(_cache.data) };
      },
      getCache: () => _cache,
    }),
    fetch: (userOptions = defaultFetchUserOptions) => {
      if (
        cache &&
        Object.keys(_cache).length &&
        // If variables are unchanged from previous request
        JSON.stringify(userOptions.variables) === JSON.stringify(_variables)
      ) {
        return new Promise(resolve => resolve(_cache));
      }
      return fetcher(userOptions);
    },
    refetch: fetcher,
    fetchMore: (userOptions = defaultFetchUserOptions) => {
      if (!cache) {
        throw Error('Cannot call `fetchMore` without cache');
      }
      return fetcher(userOptions, { fetchMore: true });
    },
    options: {
      url,
      query,
      cache,
      requestOptionsOverride,
    },
  };
};

export const GraphQLMutation = ({
  url = defaultUrl,
  query,
  requestOptionsOverride = options => options,
}) => {
  const fetcher = (options = defaultFetchUserOptions) => {
    const request = new Request(url, {
      ...requestOptionsOverride(defaultRequestOptions),
      body: JSON.stringify({
        query,
        variables: options.variables,
      }),
    });

    return fetch(request).then(response => response.json());
  };

  return {
    fetch: fetcher,
    options: {
      url,
      query,
      requestOptionsOverride,
    },
  };
};
