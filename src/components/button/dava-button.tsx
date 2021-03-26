import { Component, Event, EventEmitter, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'dava-button',
  styleUrl: './dava-button.scss',
  shadow: true,
})
export class DavaButton {
  // State() variables
  // Inlined decorator, alphabetical order
  // =======================================

  @State() private hasFocus: boolean;

  // Public Property API
  // ========================

  /** If true, the button element will be shown as being active */
  @Prop({ reflect: true }) active: boolean;
  /** Set if the button is disabled. */
  @Prop() disabled: boolean;
  /** The base styling to apply to the button. */
  @Prop() appearance: 'default' | 'outline' = 'default';

  // Events section
  // Requires JSDocs for public API documentation
  // ==============================================

  /**
   * Callback to be called when the button has focus
   *
   * @type {EventEmitter}
   * @memberof DavaButton
   */
  @Event() davaFocus: EventEmitter;

  /**
   * Callback to be called when the button loses focus
   *
   * @type {EventEmitter}
   * @memberof DavaButton
   */
  @Event() davaBlur: EventEmitter;

  /**
   * Callback to be called when the button is clicked
   *
   * @type {EventEmitter}
   * @memberof DavaButton
   */
  @Event() davaClick: EventEmitter;

  // Local methods
  // Internal business logic.
  // These methods cannot be called from the host element.
  // =======================================================

  private handleFocus = () => {
    this.hasFocus = true;
    this.davaFocus.emit();
  };

  private handleBlur = () => {
    this.hasFocus = false;
    this.davaBlur.emit();
  };

  private handleClick = () => {
    this.davaClick.emit();
  };

  // render() function
  // Always the last one in the class.
  // ===================================

  render() {
    return (
      <button
        part="base"
        class={{
          'dava-btn': true,
          'has-focus': this.hasFocus,
          active: this.active,
          disabled: this.disabled,
          [`btn__${this.appearance}`]: true,
        }}
        onBlur={this.handleBlur}
        onClick={this.handleClick}
        onFocus={this.handleFocus}
        disabled={this.disabled}>
        <span class="dava-btn__text">
          <slot />
        </span>
      </button>
    );
  }
}
