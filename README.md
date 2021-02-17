<h4 align="center">A Node.js version of MFD's TestSite.</h4>
<br>
<p align='center'>
	<a href="https://discord.gg/afahYa5VvX"><img src="https://img.shields.io/badge/Discord-MFD%20Engine%20Team%20Chat-blue.svg?style=flat-square" alt="MFD Engine Team Discord"/></a>
</p>
<br>

# About

This server is a meme, just look at my DB, I am storing a Raw JSON, so don't take this seriously

sitetest4.robloxlabs.com is a site that allows mfd engineers to test new features, it is never guaranteed that this will be up at all times.

This branch is for tests of sessionsv2, and many other things that are too unstable for the main branch.

# Installation

You will have to clone the repository and add all the folders and files that this complains about.

```bash
# Run this to install sitetest4.robloxlabs.com
$ git clone https://github.com/mfd-core/sitetest4.robloxlabs.com.git
```

That's it!

# Credits

-   [MFD CO](https://github.com/mfd-core) - MFD Engine and backend Team

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
