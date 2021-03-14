import { domInject, throttle } from '../helpers/decorators/index';
import { Negociacao, NegociacaoParcial, Negociacoes } from '../models/index';
import { NegociacoesView, MensagemView } from '../views/index';
import {
    HandlerFunction,
    NegociacaoService,
} from '../services/NegociacaoService';
import { imprime } from '../helpers/utils';

export default class NegociacaoController {
    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;

    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');

    private _negociacaoService = new NegociacaoService();

    constructor() {
        this._negociacoesView.update(this._negociacoes);
    }

    @throttle()
    adiciona(): void {
        const data = new Date(this._inputData.val().replace(/-/g, ','));

        if (this._diaUtil(data)) {
            this._mensagemView.update(
                'Negociações só podem ser registradas em dias úteis'
            );
            return;
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);
        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso!');

        imprime(negociacao, this._negociacoes);
    }

    private _diaUtil(data: Date) {
        return (
            data.getDay() == DiaSemana.SABADO ||
            data.getDay() == DiaSemana.DOMINGO
        );
    }

    @throttle()
    async importaDados() {
        const isResponseOk: HandlerFunction = (res: Response): Response => {
            if (res.ok) {
                return res;
            } else {
                throw new Error(res.statusText);
            }
        };

        try {
            const negociacoesParaImportar = await this._negociacaoService.obterNegociacoes(
                isResponseOk
            );
            const negociacoesJaImportadas = this._negociacoes.paraArray();

            negociacoesParaImportar
                .filter(
                    negociacao =>
                        !negociacoesJaImportadas.some(jaImportada =>
                            jaImportada.igual(negociacao)
                        )
                )
                .forEach(negociacao => this._negociacoes.adiciona(negociacao));

            this._negociacoesView.update(this._negociacoes);
        } catch (error) {
            this._mensagemView.update(error.message);
        }
    }
}

enum DiaSemana {
    DOMINGO,
    SEGUNDA,
    TERCA,
    QUARTA,
    QUINTA,
    SEXTA,
    SABADO,
}
