from algoliasearch_django import algolia_engine

def get_client():
    return algolia_engine.client
def get_index(index_name="bunablog2_UserProfile"):
    client = get_client()
    index = client.init_index(index_name)
    return index
def preform_search(query,**kwargs):
    index = get_index()
    results = index.search(query)
    return results
