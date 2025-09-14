

type XReadMessage = {
    id: string;
    message: Record<string,string>;
}

export type XReadStream = {
    name: string;
    messages: XReadMessage[];
}
