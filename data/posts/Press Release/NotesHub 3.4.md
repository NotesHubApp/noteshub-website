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
- **Tags** - in the final section, you can find all available hashtags for the giving scope; nested tags will be represented in the hierarchical structure; once selected, the search will be performed for a specific hashtag.

### Query syntax
Search queries consist of search terms, comprising text you want to search for, and filters, which narrow down the search.
A bare term with no filters will match either the content of a file or the file's name.
To make it more clear, a simple request like `Hello World` is equivalent to `(name:Hello OR content:Hello) AND (name:World OR content:World)`

- Exact string match
- Regular expressions
-

### Query filters
- `name` - matches for a specified text inside of a file's name (without extension).
- `type` - matches the type of the file, accepted values are _note_, _kanban_, _whiteboard_.
- `path` - matches for a specified text inside of the folder path of the file.
- `notebook` - matches for a specified text inside of the notebook name where the file is located.
- `content` - matches for a specified text inside of the content of the file.
- `heading`, `heading1`...`heading6` (`h`, `h1`...`h6`) - matches for a specified text inside of the heading element.
- `tag` - matches for a specified text inside of a hashtag.
- `listitem` (`li`) - matches for a specified text inside of list item.
- `task` - matches for a specified text inside of the task in any state (completed or not).
- `todo` - matches for a specified text inside of the task that is not completed.
- `done` - matches for a specified text inside of the task with the completed state.
- `attachment` - searches for attachments inside of the file with a specified type; accepted values are _image_, _audio_, _video_, and _location_.

### Scoring

## Tags

## Find in note

## Filters (Kanban boards)

### Query filters
- `title` - matches for a specified text inside of a card's title.
- `details` -
- `tag` -
- `due` - accepted values are _completed_, _overdue_, _day_, _week_, _month_.
- `tasks` - accepted values are _todo_, _inprogress_, _done_.
- `has` - accepted values are _details_, _tags_, _tasks_, _due_, _estimates_.
- `is` - accepted value is _completed_.

## Multicolored highlight tool

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
