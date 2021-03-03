# Persistence

-   Last Updated 04:33:22PST-02-01-2021

PersistenceDB works in order of this:

$MANIFEST_DIR$/peristence/ contains:
RECORD.json - A record of universes added and purged.

$PERSISTENCE_ROOT$/$UNIVERSE_ID$/ contains
UNIVERSE.json - Universe info, contains things such as StoreCount, total request count, and user count.
RECORD.json - Records actions on the current universe, such as which placeIds did requests come from.
/stores/ - All Stores for that univers

$UNIVERSE_ROOT$/stores/ will contain:
RECORD.json - A record of stores added and purged.

$STORE_ROOT$/$DATA_STORE_NAME$/ will contain:
DATASTORE.json - DataStore information
RECORD.json - Every update that the store has received.
/scopes/ - All scopes data

$DATASTORE_ROOT$/scopes/ will contain:
RECORD.json - A record of scopes added and purged.

$SCOPES_ROOT$/$SCOPE_NAME$/ will contain:
SCOPE.json - Scope information
RECORD.json - All updates to that specific scope
/keys/ - New feature, not implemented yet.

$SCOPE_ROOT$/keys/ will contain:
RECORD.json - A record of scope keys added and purged.

$KEYS_ROOT$/$KEY_NAME$/ will contain:
KEY.json - Key information
RECORD.json - All updates to that specific key
KEYVERSIONS.json - New feature, consider merging this into KEY.json
/userids/ - New feature, not implemented yet.

$KEY_ROOT$/userids/ will contain:
RECORD.json - A record of userIds added added and purged

$KEY_ROOT$/userIds/$USER_ID$/ will contain:
USER.json - Information on the user based on userId.
RECORD.json - All Key updates for this specific userId
