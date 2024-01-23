import { Item } from "./Item";

export interface Folder {
    id: number;
    name: string;
    parentFolderId: number;
    subFolders: Folder[];
    items: Item[];
}
