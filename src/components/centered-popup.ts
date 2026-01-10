import { BasePopup } from './base-popup';

/**
 * CenteredPopup extends BasePopup to provide popups that center on screen
 * instead of anchoring to an element.
 */
export abstract class CenteredPopup extends BasePopup {
  // Override positioning to center on screen
  protected calculatePosition(dimensions: { width: number; height: number }): { left: number; top: number } {
    // Center the popup on screen
    const left = window.innerWidth / 2;
    const top = window.innerHeight / 2;
    
    return { left, top };
  }

  // Override to add centering transform
  protected getPopupStyles(): Record<string, string> {
    return {
      left: `${this.left}px`,
      top: `${this.top}px`,
      transform: 'translate(-50%, -50%)',
    };
  }

  // Override updatePosition to not require anchorPosition
  protected updatePosition(): void {
    const dimensions = this.getPopupDimensions();
    const position = this.calculatePosition(dimensions);
    this.left = position.left;
    this.top = position.top;
  }

  // Override openPopup to not require anchor
  protected openPopup(): void {
    if (!this.disabled) {
      this.updatePosition();
      this._createPortal();
      this.isOpen = true;
      this._updatePortalContent();
    }
  }
}
