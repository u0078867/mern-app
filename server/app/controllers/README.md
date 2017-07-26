## Search API

Search is performed as text search. Results retrieved by using a full-text search are listed first.

#### Full-text search

For all collections, all indexable string (sub)fields are used (see Data models).

#### Partial-text search

For all collections, only required fields of data models are used (see Data models).

#### Special case: outputs search

Algorithm (see [source](./output.search.controller.js)):
- text search (partial and full) is first performed on subjects, and all ``cuid``s are placed in an array;
- text search (partial and full) is then performed on activities, but a search on ``subjects.id`` is ``$or``-ed;
- of the results, a ``$graphLookup`` search is performed backwards to search for previous activities whose ``outputs.cuid`` is used in ``other_resources.id``. Lookup results are placed in field ``prev``;
- ``prev`` field is ``$unwind``-ed and results whose ``$prev.subjects.id`` field is contained in the array of subject previously created are given priority (maybe the others should be filtered out to restrict results?);
- ``outputs`` field is ``$unwind``-ed, so that every final item corresponds to a single output;
- for each result, document root and ``output`` field are swapped so that the root is an output and not an activity, but still the source activity is kept;

Given the already big number of documents in ``activities`` collection and the ``$unwind`` operations above, the search is triggered only if tokenized terms are all equal or longer than 3 characters, to limit the amount of results and the search time.
