import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { createCustomElement } from '@angular/elements';
import { HttpClientModule } from '@angular/common/http';
import { ChartComponent } from './chart/chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';

@NgModule({
  declarations: [
    FormComponent,
    ChartComponent,
    DoughnutChartComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule
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
