import { LitElement, html, css, nothing, PropertyValues, TemplateResult, CSSResultGroup } from 'lit';
import { property, state } from 'lit/decorators.js';

export interface AnchorPosition {
  left: number;
  top: number;
  bottom: number;
  right: number;
}

/**
 * Base class for all popup/menu/dialog components.
 * Provides common state management, positioning logic, and event handling.
 */
export abstract class BasePopup extends LitElement {
  // Common public properties
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) externalOpen = false;
  @property({ type: Object }) anchorPosition?: AnchorPosition;

  // Common state
  @state() protected isOpen = false;
  @state() protected top = 0;
  @state() protected left = 0;

  // Click outside handling
  protected ignoreNextClickOutside = false;

  // Base styles that all popups share
  static get baseStyles(): CSSResultGroup {
    return css`
      :host {
        position: relative;
        display: inline-block;
      }

      .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99998;
      }

      .popup-container {
        position: fixed;
        background: var(--pmc-card-background);
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        z-index: 99999;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.2s, visibility 0.2s;
      }

      .popup-container.open {
        opacity: 1;
        visibility: visible;
      }
    `;
  }

  // Lifecycle hooks
  connectedCallback(): void {
    super.connectedCallback();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    document.addEventListener('click', this.handleClickOutside);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleClickOutside);
  }

  firstUpdated(): void {
    if (this.externalOpen && !this.isOpen) {
      this.openPopupExternal();
    }
  }

  updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('externalOpen') && this.externalOpen && !this.isOpen) {
      this.openPopupExternal();
    }
    if (changedProperties.has('anchorPosition') && this.isOpen && this.anchorPosition) {
      this.updatePosition();
    }
  }

  // Click outside handler
  protected handleClickOutside(event: MouseEvent): void {
    if (this.ignoreNextClickOutside) {
      this.ignoreNextClickOutside = false;
      return;
    }
    if (this.isOpen && !event.composedPath().includes(this)) {
      this.closePopup();
    }
  }

  // Open popup from external control
  protected openPopupExternal(): void {
    this.ignoreNextClickOutside = true;
    requestAnimationFrame(() => {
      this.openPopup();
    });
  }

  // Open popup
  protected openPopup(): void {
    if (!this.disabled) {
      this.updatePosition();
      this.isOpen = true;
    }
  }

  // Close popup and dispatch event
  protected closePopup(): void {
    this.isOpen = false;
    this.dispatchEvent(new CustomEvent('popup-closed', { bubbles: true, composed: true }));
  }

  // Update popup position based on anchor
  protected updatePosition(): void {
    if (this.anchorPosition) {
      const dimensions = this.getPopupDimensions();
      const position = this.calculatePosition(dimensions);
      this.left = position.left;
      this.top = position.top;
    }
  }

  // Calculate position based on anchor and dimensions
  protected calculatePosition(dimensions: { width: number; height: number }): { left: number; top: number } {
    if (!this.anchorPosition) {
      return { left: 0, top: 0 };
    }

    const { width, height } = dimensions;
    const padding = 8;
    const gap = 4;

    // Position below anchor by default
    let left = this.anchorPosition.left;
    let top = this.anchorPosition.bottom + gap;

    // Clamp to screen edges
    left = Math.max(padding, Math.min(left, window.innerWidth - width - padding));
    
    // If not enough space below, show above
    if (top + height > window.innerHeight - padding) {
      top = this.anchorPosition.top - gap - height;
      top = Math.max(padding, top);
    } else {
      top = Math.min(top, window.innerHeight - height - padding);
    }

    return { left, top };
  }

  // Get popup dimensions (can be overridden by subclasses for better estimates)
  protected getPopupDimensions(): { width: number; height: number } {
    return {
      width: 350,
      height: Math.min(400, window.innerHeight - 100)
    };
  }

  // Render backdrop
  protected renderBackdrop(): TemplateResult | typeof nothing {
    return this.isOpen 
      ? html`<div class="backdrop" @click=${this.closePopup}></div>` 
      : nothing;
  }

  // Abstract method: subclasses must implement popup content
  protected abstract renderPopupContent(): TemplateResult;

  // Get additional classes for popup container (can be overridden)
  protected getPopupClasses(): string {
    return '';
  }

  // Get additional styles for popup container (can be overridden)
  protected getPopupStyles(): Record<string, string> {
    return {
      left: `${this.left}px`,
      top: `${this.top}px`,
    };
  }

  // Default render (can be overridden for custom structure)
  render(): TemplateResult | typeof nothing {
    if (!this.externalOpen) {
      return nothing;
    }

    const classes = `popup-container ${this.isOpen ? 'open' : ''} ${this.getPopupClasses()}`.trim();
    const styles = Object.entries(this.getPopupStyles())
      .map(([key, value]) => `${key}: ${value}`)
      .join('; ');

    return html`
      ${this.renderBackdrop()}
      <div class="${classes}" style="${styles}">
        ${this.renderPopupContent()}
      </div>
    `;
  }
}

