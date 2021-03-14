import { logarTempoDeExecucao } from '../helpers/decorators/TempoDeExecucao';
import { MeuObjeto } from './MeuObjeto';
import { Negociacao } from './Negociacao';

export class Negociacoes implements MeuObjeto<Negociacoes> {
    private _negociacoes: Array<Negociacao> = [];

    adiciona(negociacao: Negociacao): void {
        this._negociacoes.push(negociacao);
    }

    @logarTempoDeExecucao()
    paraArray(): Array<Negociacao> {
        // Programação defensiva, retorna uma cópia para não ter a referência
        // Mantem-se a tipagem por ter sido definida na função
        return ([] as Array<Negociacao>).concat(this._negociacoes);
    }

    paraTexto(): void {
        console.log(JSON.stringify(this._negociacoes));
    }

    igual(negociacoes: Negociacoes): boolean {
        return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes);
    }
}
