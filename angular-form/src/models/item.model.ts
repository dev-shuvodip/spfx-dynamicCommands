export interface item {
    Title?: string;
    RequestID: string;
    ReceivedDate: string;
    Status: string;
    Approved: boolean;
}

export interface metadata {
    _id: number;
    _listId: string;
    _displayMode: string;
}

export interface itemData {
    _item: item;
    _etag: string;
}