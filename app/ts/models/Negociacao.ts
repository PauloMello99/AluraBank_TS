import { MeuObjeto } from './MeuObjeto';

export class Negociacao implements MeuObjeto<Negociacao> {
    constructor(
        readonly data: Date,
        readonly quantidade: number,
        readonly valor: number
    ) {}

    get volume() {
        return this.quantidade * this.valor;
    }

    paraTexto(): void {
        console.log(`
        \nData: ${this.data}
        \nQuantidade: ${this.quantidade}
        \nValor: ${this.valor}
        \nVolume: ${this.volume}
        `);
    }

    igual(negociacao: Negociacao): boolean {
        return (
            this.data.getDate() == negociacao.data.getDate() &&
            this.data.getMonth() == negociacao.data.getMonth() &&
            this.data.getFullYear() == negociacao.data.getFullYear()
        );
    }
}
