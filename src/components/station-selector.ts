import { html, css, nothing, TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BasePopup } from './base-popup';
import { Station } from '../types';

@customElement('pmc-station-selector')
export class StationSelector extends BasePopup {
  @property({ type: Array }) stations: Station[] = [];
  @property({ type: String }) currentStationId = '';
  @property({ type: String }) currentStationName = '';
  @property({ type: String }) songStationName = '';
  @property({ type: Boolean }) popupOnly = false; // If true, only render popup (no button)

  static get styles(): CSSResultGroup {
    return [
      BasePopup.baseStyles,
      css`
        .trigger-button {
          background: none;
          border: none;
          padding: 8px;
          cursor: pointer;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background-color 0.2s;
          color: inherit;
          font-size: 14px;
          font-weight: 500;
        }

        .trigger-button:hover:not(:disabled) {
          background-color: rgba(128, 128, 128, 0.2);
        }

        .trigger-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .trigger-button ha-icon {
          --mdc-icon-size: 24px;
        }

        .popup-container {
          padding: 4px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 200px;
          max-width: 300px;
          max-height: calc(100vh - 100px);
          overflow-y: auto;
          transform: translateX(-50%);
        }

        .station-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border: none;
          border-radius: 8px;
          background: transparent;
          color: var(--primary-text-color);
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          font-size: 14px;
          width: 100%;
        }

        .station-button:hover {
          background: var(--pmc-secondary-background);
        }

        .station-button.active {
          background: var(--pmc-primary-color);
          color: var(--pmc-text-primary);
        }

        .station-button.active:hover {
          background: var(--pmc-primary-color);
        }

        .station-button ha-icon {
          --mdc-icon-size: 20px;
          flex-shrink: 0;
        }

        .station-button .station-text {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .station-button .quickmix-badge {
          --mdc-icon-size: 16px;
          flex-shrink: 0;
          color: var(--pmc-primary-color);
        }

        .station-button.active .quickmix-badge {
          color: var(--pmc-text-primary);
        }
      `
    ];
  }

  protected getPopupDimensions(): { width: number; height: number } {
    const menuWidth = 250;
    const itemHeight = 36;
    const menuHeight = Math.min(this.stations.length * itemHeight + 8, window.innerHeight - 100);
    return { width: menuWidth, height: menuHeight };
  }

  private toggleMenu(event: Event): void {
    event.stopPropagation();
    if (this.isOpen) {
      this.closePopup();
    } else {
      // Get button position to use as anchor
      const button = event.currentTarget as HTMLElement;
      const rect = button.getBoundingClientRect();
      this.anchorPosition = {
        left: rect.left + rect.width / 2, // Center of button
        top: rect.top,
        bottom: rect.bottom,
        right: rect.right
      };
      
      this.ignoreNextClickOutside = true;
      requestAnimationFrame(() => {
        this.openPopup();
      });
    }
  }

  private handleStationClick(station: Station): void {
    this.dispatchEvent(
      new CustomEvent('station-change', {
        detail: { stationId: station.id, stationName: station.name },
        bubbles: true,
        composed: true,
      })
    );
    this.closePopup();
  }

  private getCurrentStation(): Station | undefined {
    return this.stations.find(s => s.id === this.currentStationId);
  }

  protected renderPopupContent(): TemplateResult {
    return html`
      ${this.stations.map(station => {
        const isActive = station.id === this.currentStationId;
        const stationIcon = station.isQuickMix ? 'mdi:shuffle' : 'mdi:play-circle-outline';
        const showQuickMixBadge = station.isQuickMixed && !station.isQuickMix;

        return html`
          <button
            class="station-button ${isActive ? 'active' : ''}"
            @click=${() => this.handleStationClick(station)}
          >
            <ha-icon icon="${stationIcon}"></ha-icon>
            <span class="station-text">${station.name}</span>
            ${showQuickMixBadge
              ? html`<ha-icon class="quickmix-badge" icon="mdi:shuffle"></ha-icon>`
              : nothing}
          </button>
        `;
      })}
    `;
  }

  render(): TemplateResult | typeof nothing {
    const currentStation = this.getCurrentStation();
    const isQuickMix = currentStation?.isQuickMix ?? false;

    // Determine display name for tooltip
    let displayName = this.currentStationName || 'Select Station';
    if (isQuickMix && this.songStationName) {
      displayName = this.songStationName;
    }

    // Determine icon: shuffle for QuickMix, radio otherwise
    const icon = isQuickMix ? 'mdi:shuffle' : 'mdi:radio';

    // If popup only mode, use base class render
    if (this.popupOnly) {
      return super.render();
    }

    // Otherwise, render button + popup
    return html`
      ${this.renderBackdrop()}
      ${html`
        <button
          class="trigger-button"
          @click=${this.toggleMenu}
          ?disabled=${this.disabled || this.stations.length === 0}
          title="${displayName}"
        >
          <ha-icon icon="${icon}"></ha-icon>
        </button>
      `}
      <div
        class="popup-container ${this.isOpen ? 'open' : ''}"
        style="left: ${this.left}px; top: ${this.top}px;"
      >
        ${this.renderPopupContent()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pmc-station-selector': StationSelector;
  }
}
