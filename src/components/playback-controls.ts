import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('pmc-playback-controls')
export class PlaybackControls extends LitElement {
  @property({ type: Boolean }) playing = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) showPower = false;
  @property({ type: Boolean }) isOn = true;

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .control-button {
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

    .control-button:hover:not(:disabled) {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .control-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .control-button ha-icon {
      --mdc-icon-size: 24px;
    }

    .control-button.power-off {
      opacity: 0.5;
    }
  `;

  private _handlePower() {
    this.dispatchEvent(
      new CustomEvent('power-toggle', { bubbles: true, composed: true })
    );
  }

  private _handlePlayPause() {
    this.dispatchEvent(
      new CustomEvent('play-pause', { bubbles: true, composed: true })
    );
  }

  private _handleNext() {
    this.dispatchEvent(
      new CustomEvent('next-track', { bubbles: true, composed: true })
    );
  }

  render() {
    return html`
      ${this.showPower
        ? html`
            <button
              class="control-button ${this.isOn ? '' : 'power-off'}"
              @click=${this._handlePower}
              title=${this.isOn ? 'Turn off' : 'Turn on'}
            >
              <ha-icon icon="mdi:power"></ha-icon>
            </button>
          `
        : nothing}
      <button
        class="control-button"
        @click=${this._handlePlayPause}
        ?disabled=${this.disabled}
        title=${this.playing ? 'Pause' : 'Play'}
      >
        <ha-icon .icon=${this.playing ? 'mdi:pause' : 'mdi:play'}></ha-icon>
      </button>
      <button
        class="control-button"
        @click=${this._handleNext}
        ?disabled=${this.disabled}
        title="Next track"
      >
        <ha-icon icon="mdi:skip-next"></ha-icon>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pmc-playback-controls': PlaybackControls;
  }
}
