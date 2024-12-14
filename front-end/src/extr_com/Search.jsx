import React from 'react';
import { InstantSearch, SearchBox, Hits } from '@algolia/react-instantsearch-hooks-web';
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch('8H6L6CYN1Y', '07859015512763152e61225efa8299ed');

const Hit = ({ hit }) => (
  <div>
    <h3>{hit.title}</h3>
    <p>{hit.description}</p>
  </div>
);

const Search = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName="YourIndexName">
      <SearchBox />
      <Hits hitComponent={Hit} />
    </InstantSearch>
  );
};

export default Search;
