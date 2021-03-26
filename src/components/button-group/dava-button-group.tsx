import { Component, Event, EventEmitter, h, Listen, State } from '@stencil/core';

@Component({
  tag: 'dava-button-group',
  styleUrl: './dava-button-group.scss',
  scoped: true,
})
export class DavaButtonGroup {
  // Own Properties
  // ====================

  private btnGroupRef: HTMLDivElement;

  // State() variables
  // Inlined decorator, alphabetical order
  // =======================================

  @State() buttons: HTMLDavaButtonElement[];

  // Events section
  // Requires JSDocs for public API documentation
  // ==============================================

  /**
   * Callback to be called when the button group section change
   *
   * @type {EventEmitter<HTMLDavaButtonElement>}
   * @memberof DavaButtonGroup
   */
  @Event() davaChange: EventEmitter<HTMLDavaButtonElement>;

  // Listeners
  // ==============

  @Listen('davaClick')
  onDavaButtonClick(event: UIEvent) {
    const buttonElem: HTMLDavaButtonElement = event.target as HTMLDavaButtonElement;
    this.setActive(buttonElem);
  }

  // Local methods
  // Internal business logic.
  // These methods cannot be called from the host element.
  // =======================================================

  private getChildButtons = () => {
    const buttons = this.btnGroupRef.querySelectorAll('dava-button');
    return Array.from(buttons);
  };

  private setActive = (buttonElem: HTMLDavaButtonElement) => {
    this.getChildButtons().map(
      (button) => (button.active = button === buttonElem),
    );
    this.davaChange.emit(buttonElem);
  };

  // render() function
  // Always the last one in the class.
  // ===================================

  render() {
    return (
      <div
        class="dava-btn-group"
        ref={(el: HTMLDivElement) => (this.btnGroupRef = el)}>
        <slot />
      </div>
    );
  }
}
