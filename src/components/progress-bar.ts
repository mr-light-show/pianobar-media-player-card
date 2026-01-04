import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('pmc-progress-bar')
export class ProgressBar extends LitElement {
  @property({ type: Number }) duration = 0;
  @property({ type: Number }) position = 0;
  @property({ type: String }) positionUpdatedAt = '';
  @property({ type: Boolean }) showTime = false;

  private _animationFrameId: number | null = null;
  private _currentPosition = 0;

  static styles = css`
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400&display=swap');

    :host {
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: auto;
      z-index: 3;
    }

    .progress-container {
      position: relative;
      width: 100%;
    }

    /* Time display above progress bar */
    .time-display {
      display: flex;
      justify-content: space-between;
      font-family: 'Roboto Mono', ui-monospace, 'SF Mono', Monaco, monospace;
      font-variant-numeric: tabular-nums;
      font-size: 0.75rem;
      color: inherit;
      padding: 0 8px 4px;
    }

    /* Progress bar wrapper */
    .progress-bar-wrapper {
      position: relative;
      height: var(--pmc-progress-height, 4px);
    }

    /* Progress bar track (background) */
    .progress-track {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: currentColor;
      opacity: 0.2;
    }

    /* Progress bar fill */
    .progress-fill {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      background: currentColor;
      width: 0;
      transition: width 0.1s linear;
      z-index: 1;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._startAnimation();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stopAnimation();
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('position') || changedProperties.has('positionUpdatedAt')) {
      this._currentPosition = this.position;
    }
  }

  private _startAnimation() {
    const animate = () => {
      if (this.duration > 0 && this.positionUpdatedAt) {
        const updatedAt = new Date(this.positionUpdatedAt).getTime();
        const now = Date.now();
        const elapsed = (now - updatedAt) / 1000;
        this._currentPosition = Math.min(this.position + elapsed, this.duration);
        this.requestUpdate();
      }
      this._animationFrameId = requestAnimationFrame(animate);
    };
    this._animationFrameId = requestAnimationFrame(animate);
  }

  private _stopAnimation() {
    if (this._animationFrameId) {
      cancelAnimationFrame(this._animationFrameId);
      this._animationFrameId = null;
    }
  }

  private _formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  render() {
    const progress = this.duration > 0 ? (this._currentPosition / this.duration) * 100 : 0;

    return html`
      <div class="progress-container">
        ${this.showTime
          ? html`
              <div class="time-display">
                <span>${this._formatTime(this._currentPosition)}</span>
                <span>${this._formatTime(this.duration)}</span>
              </div>
            `
          : nothing}
        <div class="progress-bar-wrapper">
          <div class="progress-track"></div>
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pmc-progress-bar': ProgressBar;
  }
}
