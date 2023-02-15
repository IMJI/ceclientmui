import Product from "./Product";
import Status from "./Status";
import Tax from "./Tax";

class Outgoing {
    id: number;
    product: Product;
    tax: Tax;
    status: Status;
    date: Date;
    count: number;
    cost: number;
}

export default Outgoing;