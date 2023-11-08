import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'

import { RegisterComponent } from './register.component'

describe('RegisterComponent', () => {
  let component: RegisterComponent
  let fixture: ComponentFixture<RegisterComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
    fixture = TestBed.createComponent(RegisterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have the email updated when .onChange() got called with an object that has id = "email"', () => {
    const inputEvent = {
      id: 'email',
      value: 'test@email.com',
    }
    component.onChange(inputEvent)
    fixture.detectChanges()

    expect(component.email).toEqual(inputEvent.value)
  })

  it('should have the password updated when .onChange() got called with an object that has id = "password"', () => {
    const inputEvent = {
      id: 'password',
      value: 'test@password',
    }
    component.onChange(inputEvent)
    fixture.detectChanges()

    expect(component.password).toEqual(inputEvent.value)
  })

  it('should have the confirmPassword updated when .onChange() got called with an object that has id = "confirmPassword"', () => {
    const inputEvent = {
      id: 'confirmPassword',
      value: 'test@password',
    }
    component.onChange(inputEvent)
    fixture.detectChanges()

    expect(component.confirmPassword).toEqual(inputEvent.value)
  })
})
