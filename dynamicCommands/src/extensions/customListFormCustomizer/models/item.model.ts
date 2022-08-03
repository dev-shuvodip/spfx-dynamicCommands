export interface item {
    Title?: string;
    RequestID: string;
    ReceivedDate: string;
    Status: string;
    Approved: boolean;
}

export interface metadata {
    _item: item;
    _etag?: string;
}