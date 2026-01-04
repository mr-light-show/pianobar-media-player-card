import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('pmc-volume-slider')
export class VolumeSlider extends LitElement {
  @property({ type: Number }) volume = 0.5;
  @property({ type: Boolean }) muted = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) sliderColor = 'currentColor';

  @state() private _dragging = false;

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
    }

    .volume-button {
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
      flex-shrink: 0;
    }

    .volume-button:hover:not(:disabled) {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .volume-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .volume-button ha-icon {
      --mdc-icon-size: 24px;
    }

    .slider-container {
      flex: 1;
      position: relative;
      height: 24px;
      display: flex;
      align-items: center;
    }

    /* Custom slider track */
    .slider-track {
      position: absolute;
      left: 0;
      right: 0;
      height: 4px;
      border-radius: 2px;
      opacity: 0.3;
    }

    /* Custom slider fill (progress) */
    .slider-fill {
      position: absolute;
      left: 0;
      height: 4px;
      border-radius: 2px;
    }

    /* Custom slider thumb */
    .slider-thumb {
      position: absolute;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      transform: translateX(-50%);
      pointer-events: none;
      transition: transform 0.1s;
    }

    .slider-container:hover .slider-thumb {
      transform: translateX(-50%) scale(1.2);
    }

    /* Invisible native input for interaction */
    input[type="range"] {
      position: absolute;
      width: 100%;
      height: 24px;
      margin: 0;
      opacity: 0;
      cursor: pointer;
      z-index: 1;
    }

    input[type="range"]:disabled {
      cursor: not-allowed;
    }

    .slider-container.disabled {
      opacity: 0.5;
    }

    .volume-value {
      font-size: 0.75rem;
      color: inherit;
      min-width: 36px;
      text-align: right;
      flex-shrink: 0;
    }
  `;

  private _getVolumeIcon(): string {
    if (this.muted || this.volume === 0) {
      return 'mdi:volume-off';
    }
    if (this.volume < 0.3) {
      return 'mdi:volume-low';
    }
    if (this.volume < 0.7) {
      return 'mdi:volume-medium';
    }
    return 'mdi:volume-high';
  }

  private _handleVolumeChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = parseFloat(target.value);
    this.dispatchEvent(
      new CustomEvent('volume-change', {
        detail: { volume: value },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleMuteToggle() {
    this.dispatchEvent(
      new CustomEvent('mute-toggle', { bubbles: true, composed: true })
    );
  }

  render() {
    const volumePercent = Math.round(this.volume * 100);
    const thumbPosition = `${this.volume * 100}%`;

    return html`
      <button
        class="volume-button"
        @click=${this._handleMuteToggle}
        ?disabled=${this.disabled}
        title=${this.muted ? 'Unmute' : 'Mute'}
      >
        <ha-icon .icon=${this._getVolumeIcon()}></ha-icon>
      </button>
      <div class="slider-container ${this.disabled ? 'disabled' : ''}">
        <div class="slider-track" style="background: ${this.sliderColor}"></div>
        <div class="slider-fill" style="background: ${this.sliderColor}; width: ${thumbPosition}"></div>
        <div class="slider-thumb" style="background: ${this.sliderColor}; left: ${thumbPosition}"></div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          .value=${String(this.volume)}
          @input=${this._handleVolumeChange}
          ?disabled=${this.disabled}
        />
      </div>
      <span class="volume-value">${volumePercent}%</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pmc-volume-slider': VolumeSlider;
  }
}
