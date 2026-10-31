export type DownloadStore = 'web' | 'app-store' | 'google-play' | 'windows' | 'linux';
export type DownloadPlacement = 'hero' | 'comparison' | 'testimonials';

// Umami counts a tap on any element carrying these attributes, with no script of
// our own. One event for every link, the store and placement as its properties: a
// goal or funnel takes one event name, and Umami breaks the event down by them.
export function downloadTap(store: DownloadStore, placement: DownloadPlacement) {
  return {
    'data-umami-event': 'Download tap',
    'data-umami-event-store': store,
    'data-umami-event-placement': placement
  };
}
