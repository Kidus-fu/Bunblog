from algoliasearch_django import algolia_engine

def get_client():
    return algolia_engine.client
def get_index(index_name="bunablog2_Post"):
    client = get_client()
    index = client.init_index(index_name)
    return index
def preform_search(query, **kwargs):
    index = get_index()
    params = {}

    # If query exists, add it to the parameters
    if query:
        params["query"] = query

    # If tags exist, add them to tagFilters
    tags = kwargs.get("tags", [])
    if tags:
        params["tagFilters"] = tags

    # Perform the search
    results = index.search(query, params)
    return results

