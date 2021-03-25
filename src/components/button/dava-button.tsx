import { Component, Event, EventEmitter, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'dava-button',
  styleUrl: './dava-button.scss',
  shadow: true,
})
export class DavaButton {
  @State() private hasFocus: boolean;

  @Prop({ reflect: true }) active: boolean;

  @Prop() disabled: boolean;

  @Prop() appearance: 'default' | 'outline' = 'default';

  @Event() davaFocus: EventEmitter;
  @Event() davaBlur: EventEmitter;
  @Event() davaClick: EventEmitter;

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
