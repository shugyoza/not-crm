import { Component } from '@angular/core'

import { InputFieldEvent } from 'src/app/shared/shared.interfaces'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public email = ''
  public password = ''
  public confirmPassword = ''

  public onChange(event: InputFieldEvent): void {
    const { id, value } = event

    switch (id) {
      case 'email':
        this.email = value
        break
      case 'password':
        this.password = value
        break
      case 'confirmPassword':
        this.confirmPassword = value
        break
    }
  }

  public onClick(): void {
    console.log('onClick()')
  }
}
