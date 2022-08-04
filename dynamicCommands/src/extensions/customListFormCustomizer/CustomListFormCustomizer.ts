import { Log } from '@microsoft/sp-core-library';
import {
  BaseFormCustomizer
} from '@microsoft/sp-listview-extensibility';

import * as strings from 'CustomListFormCustomizerStrings';
import styles from './CustomListFormCustomizer.module.scss';
import { FormDisplayMode } from '@microsoft/sp-core-library';
import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';
import { item, itemData, metadata } from './models/item.model';
import SharePointService from './services/sharepoint.service';

import '../../../../angular-form/dist/angular-form/main';
import '../../../../angular-form/dist/angular-form/polyfills';
require('../../../../angular-form/dist/angular-form/styles.css');

/**
 * If your form customizer uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ICustomListFormCustomizerProperties {
  // This is an example; replace with your own property
}

const LOG_SOURCE: string = 'CustomListFormCustomizer';

export default class CustomListFormCustomizer
  extends BaseFormCustomizer<ICustomListFormCustomizerProperties> {

  private _metadata: metadata;

  // Added for the item to show in the form and for item's etag to ensure integrity of the update; use with edit and view form
  private _itemData: itemData;

  public async onInit(): Promise<void> {
    // Add your custom initialization to this method. The framework will wait
    // for the returned promise to resolve before rendering the form.
    Log.info(LOG_SOURCE, 'Activated CustomListFormCustomizer with properties:');
    Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2));

    // init SharePoint Service
    SharePointService.Init(this.context);

    if (this.displayMode === FormDisplayMode.New) {
      // we're creating a new item so nothing to load
      this._itemData = {
        _item: {
          RequestID: '',
          ReceivedDate: '',
          Status: '',
          Approved: false
        },
        _etag: ''
      }
      return Promise.resolve();
    }

    // load item to display on the form
    this._itemData = await SharePointService.getitem(this.context);
  }

  public render(): void {
    this._metadata = {
      _itemId: this.context.itemId,
      _listId: this.context.list.guid.toString(),
      _displayMode: this.displayMode.toString()
    }

    // render view form
    if (this.displayMode === FormDisplayMode.Display) {
      this.domElement.innerHTML =
        `<div class="${styles.customListFormCustomizer}">
          <form-custom metadata='${JSON.stringify(this._metadata)}'></form-custom>
          <label for="title">${strings.Title}</label>
          <br />
          ${this._itemData?._item.Title}
          <br />
          <br />
          <input type="button" id="cancel" value="${strings.Close}" />
        </div>`;

      document.getElementById('cancel').addEventListener('click', this._onClose.bind(this));
    }
    // render new/edit form
    else {
      this.domElement.innerHTML =
        `<div class="${styles.customListFormCustomizer}">
            <form-custom metadata='${JSON.stringify(this._metadata)}'></form-custom>
                <label for="title">${strings.Title}</label><br />
                <input type="text" id="title" value="${this._itemData?._item.Title || ''}"/>
                <br />
                <br />
                <input type="button" id="save" value="${strings.Save}" />
                <input type="button" id="cancel" value="${strings.Cancel}" />
                <br />
                <br />
                <div class="${styles.error}"></div>
          </div>`;

      document.getElementById('save').addEventListener('click', this._onSave.bind(this));
      document.getElementById('cancel').addEventListener('click', this._onClose.bind(this));
    }
  }

  public onDispose(): void {
    // This method should be used to free any resources that were allocated during rendering.
    super.onDispose();
  }

  private _onSave = async (): Promise<void> => {
    // disable all input elements while we're saving the item
    this.domElement.querySelectorAll('input').forEach(el => el.setAttribute('disabled', 'disabled'));
    // reset previous error message if any
    this.domElement.querySelector(`.${styles.error}`).innerHTML = '';

    let request: Promise<SPHttpClientResponse>;
    const title: string = (document.getElementById('title') as HTMLInputElement).value;

    switch (this.displayMode) {
      case FormDisplayMode.New: {
        const newItem: item = {
          RequestID: '',
          ReceivedDate: '',
          Status: '',
          Approved: false
        };
        newItem.Title = title;
        request = SharePointService.createItem(this.context, newItem);
        break;
      }
      case FormDisplayMode.Edit: {
        this._itemData._item.Title = title;
        request = SharePointService.updateItem(this.context, this._itemData);
      }
    }

    const res: SPHttpClientResponse = await request;

    if (res.ok) {
      // You MUST call this.formSaved() after you save the form.
      this.formSaved();
    }
    else {
      const error: { error: { message: string } } = await res.json();

      this.domElement.querySelector(`.${styles.error}`).innerHTML = `An error has occurred while saving the item. Please try again. Error: ${error.error.message}`;
      this.domElement.querySelectorAll('input').forEach(el => el.removeAttribute('disabled'));
    }
  }

  private _onClose = (): void => {

    // You MUST call this.formClosed() after you close the form.
    this.formClosed();
  }
}