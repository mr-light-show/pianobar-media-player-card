# Full Overflow Menu Implementation

Implement all menu items from [pianobar-websockets webui](/Users/khawes/stash/pianobar-websockets/webui) in our overflow menu.

**Reference implementation:** `/Users/khawes/stash/pianobar-websockets/webui/src/components/`

## Phase 1: Simple Actions

### 1.1 Explain Song

- Add menu item "Why this song?"
- Call `pianobar.explain_song` service
- Show result using Home Assistant's browser notification or toast

### 1.2 Create Station Modal

Reference: [`/Users/khawes/stash/pianobar-websockets/webui/src/components/create-station-modal.ts`](/Users/khawes/stash/pianobar-websockets/webui/src/components/create-station-modal.ts)

Create new component: `src/components/create-station-modal.ts`

Single menu item "Create Station" opens a multi-mode modal with:

- **Search mode**: Search for artist/song, select from results
- **Current song/artist**: Create from currently playing track
- **Genre browser**: Browse and select genre categories
- **Shared station**: Enter station ID to add shared station

Services used:

- `pianobar.create_station` (type: song/artist)
- `pianobar.search` (TBD - may need to add to pianobar-ha)
- `pianobar.get_genres` (TBD - may need to add to pianobar-ha)

## Phase 2: List Popup Components

### 2.1 Upcoming Songs Popup

Create new component: `src/components/upcoming-songs-popup.ts`

- Call `pianobar.get_upcoming` service
- Display song list with artist/title
- Portal-based popup similar to existing popups

### 2.2 Station Mode Popup

Reference: [`/Users/khawes/stash/pianobar-websockets/webui/src/components/station-mode-modal.ts`](/Users/khawes/stash/pianobar-websockets/webui/src/components/station-mode-modal.ts)

Create new component: `src/components/station-mode-popup.ts`

- Call `pianobar.get_station_modes` to get available modes
- Display radio-style selection (My Station, Crowd Faves, Deep Cuts, Discovery)
- Call `pianobar.set_station_mode` on selection

## Phase 3: Multi-Select UI

### 3.1 QuickMix Manager Popup

Reference: [`/Users/khawes/stash/pianobar-websockets/webui/src/components/quickmix-modal.ts`](/Users/khawes/stash/pianobar-websockets/webui/src/components/quickmix-modal.ts)

Create new component: `src/components/quickmix-popup.ts`

- Display all stations with checkboxes
- Pre-select currently included stations
- Call `pianobar.set_quick_mix` with selected station IDs

## Phase 4: Input/Confirmation Dialogs

### 4.1 Rename Station Dialog

Reference: [`/Users/khawes/stash/pianobar-websockets/webui/src/components/rename-station-modal.ts`](/Users/khawes/stash/pianobar-websockets/webui/src/components/rename-station-modal.ts)

Create new component: `src/components/rename-dialog.ts`

- Text input for new name
- Current station pre-selected
- Call `pianobar.rename_station` on confirm

### 4.2 Delete Station Dialog

Create new component: `src/components/confirm-dialog.ts`

- Reusable confirmation dialog
- Confirmation prompt with station name
- Destructive action styling (red button)
- Call `pianobar.delete_station` on confirm

## Phase 5: Complex Management UI

### 5.1 Seeds and Feedback Manager

Reference: [`/Users/khawes/stash/pianobar-websockets/webui/src/components/station-seeds-modal.ts`](/Users/khawes/stash/pianobar-websockets/webui/src/components/station-seeds-modal.ts)

Create new component: `src/components/station-info-popup.ts`

- Call `pianobar.get_station_info` to get seeds and feedback
- Display artist seeds, song seeds, station seeds
- Display feedback history (thumbs up/down)
- Allow deletion of seeds (`pianobar.delete_seed`)
- Allow deletion of feedback (`pianobar.delete_feedback`)

### 5.2 Add Music Search

Reference: [`/Users/khawes/stash/pianobar-websockets/webui/src/components/add-music-modal.ts`](/Users/khawes/stash/pianobar-websockets/webui/src/components/add-music-modal.ts)

Create new component: `src/components/add-music-popup.ts`

- Search input field
- Call search service (TBD - may need addition to pianobar-ha)
- Display results and allow selection
- Call `pianobar.add_seed` with selected music ID

## Updated Overflow Menu Structure

Matching [pianobar-websockets webui info-menu](/Users/khawes/stash/pianobar-websockets/webui/src/components/info-menu.ts):

```
[Song Actions]
- Why this song?              → explain_song
- Show Upcoming Songs         → get_upcoming popup
- Song Ratings                → existing rating popup

[Station Actions]
- Station Mode                → station mode popup
- Manage Seeds & Feedback     → station info popup

[Divider]

- QuickMix Settings           → quickmix popup
- Create Station              → create station modal
- Add Music to Station        → add music popup
- Rename Station              → rename dialog
- Delete Station              → confirm dialog (destructive)

[Divider]

- Select Station              → existing station popup
- More Information            → existing HA more info
- Connect/Disconnect          → existing power toggle
```

## Files to Modify

- [`src/components/overflow-menu.ts`](src/components/overflow-menu.ts) - Add all new menu items
- [`src/pianobar-media-player-card.ts`](src/pianobar-media-player-card.ts) - Handle events, render new popups

## Files to Create

- `src/components/create-station-modal.ts`
- `src/components/upcoming-songs-popup.ts`
- `src/components/station-mode-popup.ts`
- `src/components/quickmix-popup.ts`
- `src/components/rename-dialog.ts`
- `src/components/confirm-dialog.ts`
- `src/components/station-info-popup.ts`
- `src/components/add-music-popup.ts`

## Reference Implementation

All component designs should reference the pianobar-websockets webui:

- **Base path:** `/Users/khawes/stash/pianobar-websockets/webui/src/components/`
- **Modal base:** `modal-base.ts` - shared modal styling/behavior
- **Info menu:** `info-menu.ts` - menu structure reference

