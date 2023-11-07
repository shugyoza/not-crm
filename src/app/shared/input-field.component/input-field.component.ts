import { Component, Input, Output, EventEmitter } from '@angular/core'

import { InputFieldEvent } from '../shared.interfaces'

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent {
  @Input() labelFor = ''
  @Input() labelText = ''
  @Input() labelClassName = ''
  @Input() labelNgStyle?: { [key: string]: string }

  @Input() inputType = 'text'
  @Input() inputId = ''
  @Input() inputName = ''
  @Input() inputPlaceholder = ''
  @Input() inputClassName = ''
  @Input() inputNgStyle?: { [key: string]: string }

  @Input() fieldNgStyle?: { [key: string]: string }
  @Input() fieldClassName = 'field'

  @Output() inputChange: EventEmitter<InputFieldEvent> = new EventEmitter()

  public onChange (event: Event): void {
    const { id, value } = event.target as HTMLInputElement

    this.inputChange.emit({
      id,
      value
    })
  }
}
