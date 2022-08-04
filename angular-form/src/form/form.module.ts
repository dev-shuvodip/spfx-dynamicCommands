import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { createCustomElement } from '@angular/elements';



@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [],
  entryComponents: [FormComponent]
})
export class FormModule {
  constructor(private injector: Injector) { }

  ngDoBootstrap() {
    const customFormComponent = createCustomElement(FormComponent, { injector: this.injector });
    customElements.define('form-custom', customFormComponent);
  }
}
