import { css } from 'lit';

export const cardStyles = css`
  :host {
    --pmc-primary-color: var(--primary-color, #03a9f4);
    --pmc-primary-text-color: var(--primary-text-color, #212121);
    --pmc-secondary-text-color: var(--secondary-text-color, #727272);
    --pmc-disabled-text-color: var(--disabled-text-color, #bdbdbd);
    --pmc-background-color: var(--card-background-color, #fff);
    --pmc-border-radius: var(--ha-card-border-radius, 12px);
    --pmc-artwork-size: 80px;
    --pmc-icon-size: 24px;
    --pmc-button-size: 40px;
    --pmc-card-height: 120px;
  }

  ha-card {
    position: relative;
    overflow: hidden;
    border-radius: var(--pmc-border-radius);
    min-height: var(--pmc-card-height);
  }

  /* Add padding at bottom when progress bar is shown */
  ha-card.has-progress {
    padding-bottom: var(--pmc-progress-height, 4px);
  }

  /* Extra padding when showing time text */
  ha-card.has-progress.show-time {
    padding-bottom: calc(var(--pmc-progress-height, 4px) + 20px);
  }

  /* Shrink card when reserve space is off - let content determine height */
  ha-card.no-reserve {
    min-height: auto;
  }

  ha-card.no-reserve .card-content {
    min-height: auto;
    justify-content: flex-start;
    padding-top: 12px;
    padding-bottom: 4px;
  }

  /* Artwork container - positioned on right, scales to card height */
  .artwork-container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    display: flex;
    justify-content: flex-end;
  }

  /* Artwork image - fills height, maintains aspect ratio */
  .artwork-image {
    height: 100%;
    width: auto;
    object-fit: cover;
    object-position: center;
  }

  /* Gradient overlay - fades artwork into background color */
  /* Covers the FULL card (like mini-media-player), gradient goes from right (transparent) to left (solid) */
  .artwork-gradient {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    pointer-events: none;
  }

  /* Default layout: content on left, artwork faded on right */
  .card-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    padding: 16px 16px 8px 16px;
    /* Keep content out of artwork area */
    padding-right: 36%;
    min-height: calc(var(--pmc-card-height) - 32px);
    justify-content: center;
  }

  .media-info {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  /* Full-cover artwork mode */
  .fullcover-background {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    z-index: 0;
  }

  .fullcover-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0.4) 50%,
      rgba(0, 0, 0, 0.2) 100%
    );
    z-index: 1;
  }

  :host([artwork-mode="full-cover"]) ha-card {
    min-height: 200px;
    aspect-ratio: 1 / 1;
    display: flex;
    flex-direction: column;
  }

  :host([artwork-mode="full-cover"]) .card-content {
    padding-right: 16px;
    min-height: 120px;
    justify-content: flex-start;
    /* Color is set via inline style using extracted fgColor */
  }

  :host([artwork-mode="full-cover"]) .fullcover-background {
    width: 100%;
    height: 100%;
  }

  /* Title, artist, album inherit color from card-content's inline style */
  :host([artwork-mode="full-cover"]) .title {
    color: inherit;
  }

  :host([artwork-mode="full-cover"]) .artist,
  :host([artwork-mode="full-cover"]) .album {
    color: inherit;
    opacity: 0.8;
  }

  /* Minimal mode */
  :host([mode="minimal"]) ha-card {
    min-height: 80px;
    --pmc-card-height: 80px;
  }

  :host([mode="minimal"]) .card-content {
    padding: 12px 16px;
    min-height: 56px;
  }

  /* Media info text - sizes match standard HA media player card */
  .title {
    font-size: 16.8px;
    font-weight: 400;
    line-height: 26.88px;
    color: inherit;
    margin: 0 0 4px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .artist {
    font-size: 16.8px;
    font-weight: 400;
    line-height: 26.88px;
    color: inherit;
    opacity: 0.8;
    margin: 0 0 4px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .album {
    font-size: 16.8px;
    font-weight: 400;
    line-height: 26.88px;
    color: inherit;
    opacity: 0.6;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .station-info {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.85rem;
    opacity: 0.8;
    margin: 4px 0 0 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .station-info ha-icon {
    --mdc-icon-size: 16px;
    flex-shrink: 0;
  }

  .station-info span {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .station-info.clickable {
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .station-info.clickable:hover {
    opacity: 1;
  }

  /* Overflow menu positioning */
  .overflow-menu {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 3;
  }

  /* Controls section */
  .controls-section {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 0 16px 8px;
  }

  :host([artwork-mode="full-cover"]) .controls-section {
    padding: 8px 16px 16px;
    /* Color is set via inline style using extracted fgColor */
    margin-top: auto;
  }

  .controls-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .controls-spacer {
    flex: 1;
  }

  /* Unavailable state */
  .unavailable {
    opacity: 0.5;
    pointer-events: none;
  }

  .unavailable-text {
    font-size: 0.875rem;
    color: var(--pmc-secondary-text-color);
    text-align: center;
    padding: 16px;
  }

  /* Icon button base */
  .icon-button {
    background: none;
    border: none;
    padding: 8px;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
    color: inherit;
  }

  .icon-button:hover {
    background-color: rgba(128, 128, 128, 0.2);
  }

  .icon-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button ha-icon {
    --mdc-icon-size: var(--pmc-icon-size);
  }

  /* Has artwork state - use extracted colors */
  ha-card.has-artwork {
    transition: background-color 0.3s ease;
  }

  ha-card.has-artwork .icon-button:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }

  /* Tall artwork style - vertical layout like webui */
  :host([artwork-mode="tall"]) ha-card {
    min-height: auto;
    display: flex;
    flex-direction: column;
  }

  :host([artwork-mode="tall"]) .artwork-container {
    position: relative;
    top: auto;
    right: auto;
    bottom: auto;
    width: 80%;
    max-width: none;
    aspect-ratio: 1 / 1;
    margin: 16px auto 0;
  }

  :host([artwork-mode="tall"]) .artwork-image {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }

  :host([artwork-mode="tall"]) .artwork-gradient {
    display: none;
  }

  :host([artwork-mode="tall"]) .card-content {
    padding: 16px;
    padding-right: 16px;
    min-height: auto;
    text-align: center;
  }

  :host([artwork-mode="tall"]) .media-info {
    align-items: center;
  }

  :host([artwork-mode="tall"]) .title,
  :host([artwork-mode="tall"]) .artist,
  :host([artwork-mode="tall"]) .album {
    text-align: center;
    white-space: normal;
    overflow: visible;
    text-overflow: clip;
  }

  :host([artwork-mode="tall"]) .station-info {
    justify-content: center;
  }

  :host([artwork-mode="tall"]) .controls-section {
    align-items: center;
    padding: 8px 16px 16px;
  }

  :host([artwork-mode="tall"]) .controls-row {
    justify-content: center;
  }

  :host([artwork-mode="tall"]) .controls-spacer {
    display: none;
  }

  :host([artwork-mode="tall"]) pmc-volume-slider {
    width: 100%;
    max-width: 280px;
  }

  :host([artwork-mode="tall"]) pmc-progress-bar {
    max-width: 100%;
  }

  /* Station pill button for tall artwork */
  :host([artwork-mode="tall"]) .station-pill {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 16px;
    padding: 10px 20px;
    border-radius: 24px;
    background: var(--secondary-background-color, rgba(128, 128, 128, 0.2));
    cursor: pointer;
    transition: background 0.2s;
    max-width: 280px;
    width: fit-content;
  }

  :host([artwork-mode="tall"]) .station-pill:hover {
    background: var(--primary-color, rgba(128, 128, 128, 0.3));
    opacity: 0.9;
  }

  :host([artwork-mode="tall"]) .station-pill ha-icon {
    --mdc-icon-size: 20px;
  }

  :host([artwork-mode="tall"]) .station-pill span {
    font-size: 0.9rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 200px;
  }

  /* Artwork placeholder for tall artwork */
  :host([artwork-mode="tall"]) .artwork-placeholder-tall {
    width: 80%;
    max-width: none;
    aspect-ratio: 1 / 1;
    margin: 16px auto 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--secondary-background-color, rgba(128, 128, 128, 0.1));
    border-radius: 8px;
  }

  :host([artwork-mode="tall"]) .artwork-placeholder-tall ha-icon {
    --mdc-icon-size: 80px;
    opacity: 0.4;
  }
`;

export const editorStyles = css`
  :host {
    display: block;
  }

  .card-config {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .tabs {
    display: flex;
    border-bottom: 1px solid var(--divider-color);
    margin-bottom: 16px;
  }

  .tab {
    padding: 8px 16px;
    cursor: pointer;
    border: none;
    background: none;
    font-size: 0.875rem;
    color: var(--secondary-text-color);
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
  }

  .tab:hover {
    color: var(--primary-text-color);
  }

  .tab.active {
    color: var(--primary-color);
    border-bottom-color: var(--primary-color);
  }

  .tab-content {
    display: none;
  }

  .tab-content.active {
    display: block;
  }

  .form-row {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 16px;
  }

  .form-row label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--primary-text-color);
  }

  .form-row .helper-text {
    font-size: 0.75rem;
    color: var(--secondary-text-color);
  }

  ha-entity-picker,
  ha-select,
  ha-textfield {
    width: 100%;
  }

  ha-formfield {
    display: block;
    padding: 8px 0;
  }

  .mode-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin-bottom: 16px;
  }

  .mode-card {
    padding: 12px;
    border: 2px solid var(--divider-color);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    background: none;
    text-align: left;
  }

  .mode-card:hover {
    border-color: var(--primary-color);
  }

  .mode-card.selected {
    border-color: var(--primary-color);
    background: rgba(var(--rgb-primary-color), 0.1);
  }

  .mode-card .mode-name {
    font-weight: 500;
    margin-bottom: 4px;
  }

  .mode-card .mode-description {
    font-size: 0.75rem;
    color: var(--secondary-text-color);
  }
`;

