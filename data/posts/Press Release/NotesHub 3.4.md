---
description: Search - the most requested feature is here
postedOn: 07/19/2024
published: false
image: .attachments/nh34-hero.webp
---

Finally, the most requested feature is here. **Search** was one of the few fundamental pieces missing in NotesHub. Let's celebrate the arrival, hurrah 🎉

## Search

To start searching for content across all of your files, tap the corresponding icon in the upper right corner. The functionality is available from the notebooks and folder views. When performing the search from inside the folder, you narrow the scope of the operation to that specific folder and all of its subfolders.

The search dialog has a main query input field and 3 sections for a quick search that are visable any time when query is empty.
As a quick search option, you have:
- **Recent searches** - queries will appear here once you have navigated to documents from the corresponding queries.
- **Favorite searches** - here you can find your favorite search queryes, which for convenience, have friendly names; you can add a new favorite search query after performing the search and navigating to `...` then _Add to Favorites_.
- **Tags** - in the final section, you can find all available hashtags for the giving scope; once selected, the search for a specific hashtag will be performed.

### Query syntax
Search queries consist of search terms, comprising text you want to search for, and qualifiers, which narrow down the search.
A bare term with no filters will match either the content of a file or the file's name.

- Exact string match
- Regular expressions
-

### Filters
- `name` -
- `type` - type of the document, acceptd values are _note_, _kanban_, _whiteboard_.
- `path` -
- `notebook` -
- `content` -
- `heading`, `heading1`...`heading6` (`h`, `h1`...`h6`) -
- `tag` -
- `listitem` (`li`) -
- `task` -
- `todo` -
- `done` -
- `attachment` - accepted values are: _image_, _audio_, _video_, _location_.

### Scoring

## Tags

## Find in note

## Filters (Kanban boards)


## Highlight tool improvements

## Rich link previews

## Other notable features

- Links in whiteboards can be used for internal navigation to different documents.
- Adds syntax highlighting for `git` in code blocks for preview.
- Adds `bat` alias for `batch` language used for syntax highlighting.
- Lists all available languages for syntax highlighting in preview in Markdown Syntax guide dialog.
- Adds minutes as a supported type for Kanban card estimates.

## Important fixes
- Now, the `Copy to Clipboard` code block button appears even for unrecognized languages.
- Fixes pasting links from the share sheet.
- Fixes the issue with the stale state of a Kanban card subtasks completion progress when clearing card content.
- Fixes the issue with some key bindings not working on Windows with non-English keyboard layout.
- Fixes rendering of collapsible nested callouts.
- Fixes highlight tool not correctly working with complex content.
- Fixes the situation when a note can disappear after an attempt to save it with an empty name.
- Fixes the situation on the iPhone when the app can become stuck and not load any content.
