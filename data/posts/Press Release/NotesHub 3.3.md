---
description: Introducing whiteboard as a new supported content type and plenty more
postedOn: 04/14/2024
published: false
image: .attachments/nh33-hero.webp
---

## Whiteboard

### Notable features
- Built-in browser for external libraries.
- Double-tap Apple Pencil support.

### Current limitations
- Added library items do not persist between app restarts. This will be fixed in the upcoming version.

## Audio/video playback in Markdown

## Audio recording

## Slash commands
Regardless, if you are new to Markdown or an experienced user, this feature should fit you well. Now, instead of going to the help panel to discover what is possible in the editor, simply type slash `/` and you should see the contextual menu with options such as _Insert callout_, _Insert table_, _Insert link_, etc. Select the desired action and hit `Enter`. For inexperienced users, it's a useful tool to discover different syntax elements. For expert users, it's quicker to use slash commands for some constructs than to type them from scratch. Some commands are implemented as snippets with placeholders where you can navigate between parts with the `Tab` key.

## Autocompletion for callout types


## Autocompletion for emojis
Do you like to use emojis in your notes, but don't remember all of the shortcodes? Now it's easier than ever to insert and discover new emojis with autocomplete and all without touching the mouse. Type `:` and then start typing the name, fuzzy search will help you find what you are looking for. To commit your choice, press `Enter`, and the text will be replaced with a Unicode representation of the emoji.

## Accent color
Tired of our branded blue color in the app? No problem, we got you covered. We love all colors, and now you can select accent color used throughout the app from the color picker, just navigate to _Settings -> Appearance -> Accent Color_.

## Subtasks completion progress for Kanban cards
Have you ever been wondered how many subtasks in your Kanban card left to finish? We bet you do. Now you can quickly check this information from the Kanban board view without opening the card details dialog. We provided a progress ring for a visual representation as well as the number of total and completed tasks.

## Other notable features
- New appearance setting: "Show page title on print".
- Adds the ability to favorite folders.
- Adds syntax highlighting for `batch`, `log`, `YAML` languages in code blocks for preview.
- Adds `Tab` button to Markdown toolbar on mobile devices. This could be handy for navigation between placeholders of a snippet. _Example_: navigation between callout type, title, and content when inserting callout via `slash` command.

## Important fixes
- Fixes handling of merge conflicts when folders with the same path have been added/deleted from multiple clients (applies to Git/GitHub notebooks).
- Fixes colors for Mermaid diagrams on the dark theme. Now they will better represent the original colors instead of just inverting them.
- Fixes the issue when a floating menu may appear on a printed note.
- Fixes rendering of task lists in some edge cases.
- Fixes tabs switching for Markdown help panel on Windows.
