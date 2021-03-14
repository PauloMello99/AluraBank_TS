import { Imprimivel } from '../models/Imprimivel';

export function imprime(...objetos: Imprimivel[]) {
    objetos.forEach(obj => obj.paraTexto());
}
