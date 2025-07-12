import { Material } from "./materiales.model";
import { Boli } from "./bolis.model";

export interface Stock {
    materiales: Material[];
    bolis: Boli[];
}