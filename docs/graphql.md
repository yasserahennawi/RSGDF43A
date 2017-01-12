GraphQL Documentation section
--------------

# Authentication
- All queries will be wrapped with the viewer query and the user can supply a token or it will fallback to a guest user.
  - All nodes will be resolved from the viewer object type.
- For mutations you must call setViewerMutation before calling any mutation otherwise we will treat you as a guest user.
  - The viewer will be saved in the context for mutations.


# Queries


# Mutations
### Notes
- Mutations
