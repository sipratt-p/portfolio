# Fable collection delivery

The Fable article contains the six finished works and the two delivered VR experiments, not intermediate takes. Media is opt-in; there is no new homepage feed. The interactive story and audio do not start automatically.

Things I Love is a direct MP4 copy. Long Exposure and the VR180 chorus are original MP4 bytes split into parts below the static host's 25MB asset limit. The client assembles a Blob only after selection; it is **not progressive streaming**. Playback/download become available after the complete download (about120MB/66MB respectively). Cancel stops outstanding downloads. Leaving the page aborts a transfer and releases its object URL. Length checks catch incomplete downloads; source-master hashes are covered by tests.

For a later public launch, a dedicated media origin with HTTP ranges would improve these larger films' start time and seeking without changing their encoding. That storage change is not part of this local preview. Do not replace masters with aggressively compressed clips to meet a hosting limit.

Tell Me Again bundles inkjs2.3.2, EB Garamond, and their licenses for offline review. Its iframe allows scripts but not same-origin access to the portfolio. Noindex keeps this raw experience out of the editorial sitemap. Its own sound is optional.

Current validation: archive reconstruction, ordered downloads, progress, cancellation, HTTP failures/size mismatches, native MP4 range responses, static rendering and links. Browser review subsequently verified desktop/tablet/mobile layouts, native play/pause, full Long Exposure playback, interactive story choices, and single-player coordination. See MANUAL-REVIEW.md.

Starting a film or song pauses other players. The sandboxed story exchanges only playback signals with its parent, checking the sending window. Opening the story pauses page media. Its first passage now stays at the beginning rather than automatically scrolling past the introduction.
