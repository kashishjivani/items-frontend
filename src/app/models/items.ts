import { Timestamp } from "rxjs";

export interface Items {
    id: number;
    name: string;
    active: boolean;
    date: Date;
    price: number;
}