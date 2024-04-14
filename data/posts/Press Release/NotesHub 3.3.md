---
description: Introducing whiteboard as a new supported content type and plenty more
postedOn: 04/14/2024
published: true
image: .attachments/nh33-hero.webp
---

Welcome to our huge 3.3 update, which touches many existing areas, improves the user experience, and unlocks new capabilities.

## Whiteboard
There are situations when you have a spark in your head with a brilliant idea, and you want to write and draw it as quickly as possible until it's still in your head. In another situation, you create some awesome architecture diagram or sketch a wireframe for your next big thing. The common theme for those situations is that regular plain text notes may not help you much.

We are happy to introduce our solution, **Whiteboard**! The whiteboard is an infinite canvas for your creativity where you can place different shapes, make connections between them, make drawings, and many more, all with customizable styles. You also can create reusable blocks and add them to your library for future use. The implementation is based on [Excalidraw](https://excalidraw.com) library and this means it has a solid foundation approved by many people. For the underlying file format, we chose _SVG_ for its ultimate compatibility with all kinds of tools and services. This means your whiteboards will be accessible and look the same everywhere, and don't worry you can still edit them later.

![Whiteboard](.attachments/nh33-whiteboard.webp "Whiteboard")

### Notable features
- **Built-in browser for external libraries.** You can access hundreds of [community-created libraries](https://libraries.excalidraw.com), all without leaving the app.
  ![Built-in libraries browser](.attachments/nh33-whiteboard-libraries.webp "Built-in libraries browser")
- **Double-tap Apple Pencil support.** We support the following preferred double-tap actions:
  - Switch between current tool and eraser
  - Switch between current tool and last used
  - Show color palette
  - Show ink attributes (works only on mobile, opens up the shape menu)
  - Off (disable double-tap)
- **Interactive tool for merge conflict resolution.** When you edit the same whiteboard from multiple clients, it may result in a merge conflict. In such cases, when you open the whiteboard in the app, you will be prompted to select the desired version with the option to save all other versions (applies to Git/GitHub notebooks).

### Current limitations
- Added library items do not persist between app restarts. This will be fixed in the upcoming version.

## Audio/video playback
Let's zoom out a little and look into how you can reference other resources in Markdown. There is link construction `[title](resource-URL)` and there is image construction which is very similar to previous one `![alt-text](image-URL)` and if think more broadly the image syntax could be generalized as a way to preview any type of content. In case of image we see the actual picture, and for audio files it could be audio player and same for video. We already support image syntax for _YouTube videos_ and _X posts_. With this update we expanding image syntax support for audio/video files that will allow to playback them directy from your notes.

![Audio playback](.attachments/nh33-audio-playback.webp "Audio playback")

![Video playback](.attachments/nh33-video-playback.webp "Video playback")

## Audio recording
Well, now we can play audio/video in your notes. What about recording? On a mobile phone, at least when you click _Attachment_ button, you have the option to take _Photo_ or _Video_, but there was no way to record just audio, well until now. With this update, if you would like to start an audio recording, click _Mic_ button on toolbar. It will start the process immediately and when you are done, just press _Stop_ button and your recording will be inserted into the note as an attachment.

![Audio recording](.attachments/nh33-audio-recording.webp "Recording in progress")

## Slash commands
Regardless, if you are new to Markdown or an experienced user, this feature should fit you well. Now, instead of going to the help panel to discover what is possible in the editor, simply type slash `/` and you should see the contextual menu with options such as _Insert callout_, _Insert table_, _Insert link_, etc. Select the desired action and hit `Enter`. For inexperienced users, it's a useful tool to discover different syntax elements. For expert users, it's quicker to use slash commands for some constructs than to type them from scratch. Some commands are implemented as snippets with placeholders where you can navigate between parts with the `Tab` key.

![Slash commands](.attachments/nh33-slash-commands.webp "Slash commands")

## Autocompletion for callout types
To change the default callout icon and background color, you need to change the callout type. Before this version, the only way to know what types were available was through the help panel. Those times are a thing of the past. If you use `/` command to insert a callout, you will immediately see the autocompletion list with all available options. This also works when the editor recognizes callout syntax typed manually `> [!]`.

![Autocompletion for callout types](.attachments/nh33-callout-autocompletion.webp "Autocompletion for callout types")

## Autocompletion for emojis
Do you like to use emojis in your notes, but don't remember all of the shortcodes? Now it's easier than ever to insert and discover new emojis with autocomplete and all without touching the mouse. Type `:` and then start typing the name, fuzzy search will help you find what you are looking for. To commit your choice, press `Enter`, and the text will be replaced with a Unicode representation of the emoji.

![Autocompletion for emojis](.attachments/nh33-emojis-autocompletion.webp "Autocompletion for emojis")

## Accent color
Tired of our branded blue color in the app? No problem, we got you covered. We love all colors, and now you can select accent color used throughout the app from the color picker, just navigate to _Settings -> Appearance -> Accent Color_.

![Accent color](.attachments/nh33-accent-color.webp "Different accent colors")

## Subtasks completion progress for Kanban cards
Have you ever been wondered how many subtasks in your Kanban card left to finish? We bet you do. Now you can quickly check this information from the Kanban board view without opening the card details dialog. We provided a progress ring for a visual representation as well as the number of total and completed tasks.

![Subtasks completion progress](.attachments/nh33-subtasks-completion-progress.webp "Subtasks completion progress")

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
