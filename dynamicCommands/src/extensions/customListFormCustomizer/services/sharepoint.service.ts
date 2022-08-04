import { FormCustomizerContext } from "@microsoft/sp-listview-extensibility";
import {
    SPHttpClient,
    SPHttpClientResponse
} from '@microsoft/sp-http';
import { item, itemData } from "../models/item.model";
import { ISPFXContext, spfi, SPFI, SPFx } from "@pnp/sp";
import { LogLevel, PnPLogging } from "@pnp/logging";

export default class SharePointService {
    // Added for the item to show in the form; use with edit and view form
    private static item: item;

    // Added for item's etag to ensure integrity of the update; used with edit form
    private static etag?: string;

    private static _sp: SPFI = null;

    public static Init(context: FormCustomizerContext) {
        if (this._sp === null && context != null) {
            this._sp = spfi().using(SPFx((context as unknown) as ISPFXContext)).using(PnPLogging(LogLevel.Info));
        }
    }

    public static async getitem(context: FormCustomizerContext): Promise<itemData> {
        await context.spHttpClient
            .get(context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('${context.list.title}')/items(${context.itemId})`, SPHttpClient.configurations.v1, {
                headers: {
                    accept: 'application/json;odata.metadata=none'
                }
            })
            .then(res => {
                if (res.ok) {
                    // store etag in case we'll need to update the item
                    this.etag = res.headers.get('ETag');
                    return res.json();
                }
                else {
                    return Promise.reject(res.statusText);
                }
            })
            .then(item => {
                this.item = item;
                return Promise.resolve();
            });

        return { _item: this.item, _etag: this.etag };
    }

    public static async createItem(context: FormCustomizerContext, itemData: itemData): Promise<SPHttpClientResponse> {
        return context.spHttpClient
            .post(context.pageContext.web.absoluteUrl + `/_api/web/lists/getByTitle('${context.list.title}')/items`, SPHttpClient.configurations.v1, {
                headers: {
                    'content-type': 'application/json;odata.metadata=none'
                },
                body: JSON.stringify({
                    Title: itemData._item.Title
                })
            });
    }

    public static async updateItem(context: FormCustomizerContext, itemData: itemData): Promise<SPHttpClientResponse> {
        return context.spHttpClient
            .post(context.pageContext.web.absoluteUrl + `/_api/web/lists/getByTitle('${context.list.title}')/items(${context.itemId})`, SPHttpClient.configurations.v1, {
                headers: {
                    'content-type': 'application/json;odata.metadata=none',
                    'if-match': itemData._etag,
                    'x-http-method': 'MERGE'
                },
                body: JSON.stringify({
                    Title: itemData._item.Title
                })
            });
    }
}