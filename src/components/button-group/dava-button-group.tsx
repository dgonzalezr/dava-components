import { Component, Event, EventEmitter, h, Listen, State } from '@stencil/core';

@Component({
  tag: 'dava-button-group',
  styleUrl: './dava-button-group.scss',
  scoped: true,
})
export class DavaButtonGroup {
  private btnGroupRef: HTMLDivElement;

  @State() buttons: HTMLDavaButtonElement[];

  @Event() davaChange: EventEmitter<HTMLDavaButtonElement>;

  @Listen('davaClick')
  onDavaButtonClick(event: UIEvent) {
    const buttonElem: HTMLDavaButtonElement = event.target as HTMLDavaButtonElement;
    this.setActive(buttonElem);
  }

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
