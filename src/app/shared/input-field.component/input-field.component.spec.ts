import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InputFieldComponent } from './input-field.component';

describe('InputFieldComponent', () => {
  let component: InputFieldComponent;
  let fixture: ComponentFixture<InputFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputFieldComponent],
    });
    fixture = TestBed.createComponent(InputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use values from inputs to render DOM properly', () => {
    const styling = { 'background-color': 'blue' };

    component.labelFor = 'test-label';
    component.labelText = 'test-labelText';
    component.labelClassName = 'test-labelClassName';
    component.labelNgStyle = styling;

    component.inputType = 'password';
    component.inputId = 'test-inputId';
    component.inputName = 'test-inputName';
    component.inputPlaceholder = 'test-inputPlaceholder';
    component.inputClassName = 'test-inputClassName';
    component.inputNgStyle = styling;

    component.fieldNgStyle = styling;
    component.fieldClassName = 'field';

    fixture.detectChanges();

    const element: DebugElement = fixture.debugElement;
    const field = element.query(By.css('div')).nativeElement;
    const label = element.query(By.css('label')).nativeElement;
    const input = element.query(By.css('input')).nativeElement;

    expect(field.className).toEqual(component.fieldClassName);

    expect(label.htmlFor).toEqual(component.labelFor);
    expect(label.textContent).toContain(component.labelText);
    expect(label.className).toEqual(component.labelClassName);
    expect(label.style['background-color']).toEqual(
      styling['background-color']
    );

    expect(input.type).toEqual(component.inputType);
    expect(input.id).toEqual(component.inputId);
    expect(input.name).toEqual(component.inputName);
    expect(input.placeholder).toEqual(component.inputPlaceholder);
    expect(input.className).toEqual(component.inputClassName);
    expect(input.style['background-color']).toEqual(
      styling['background-color']
    );
  });

  it('should emit custom event of target id and target value when .onChange(event) is being called', () => {
    spyOn(component.inputChange, 'emit').and.callThrough();

    const element = {
      target: { id: 'input-id', value: 'input-value' },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
    component.onChange(element);

    expect(component.inputChange.emit).toHaveBeenCalledWith(element.target);
  });
});
