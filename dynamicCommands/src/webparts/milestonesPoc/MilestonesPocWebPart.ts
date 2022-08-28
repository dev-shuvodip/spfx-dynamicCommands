import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './MilestonesPocWebPart.module.scss';
import * as strings from 'MilestonesPocWebPartStrings';

import '../../../../angular-form/dist/angular-form/main';
import '../../../../angular-form/dist/angular-form/polyfills';
require('../../../../angular-form/dist/angular-form/styles.css');

export interface IMilestonesPocWebPartProps {
  description: string;
}

export default class MilestonesPocWebPart extends BaseClientSideWebPart<IMilestonesPocWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.milestonesPoc}">
          <form-custom></form-custom>
      </div>`;
  }

  protected onInit(): Promise<void> {
    window['webPartContext'] = this.context;
    return super.onInit();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
