System.register(["../helpers/decorators/index", "../models/index", "../views/index", "../services/NegociacaoService", "../helpers/utils"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __moduleName = context_1 && context_1.id;
    var index_1, index_2, index_3, NegociacaoService_1, utils_1, NegociacaoController, DiaSemana;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (index_3_1) {
                index_3 = index_3_1;
            },
            function (NegociacaoService_1_1) {
                NegociacaoService_1 = NegociacaoService_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this._negociacoes = new index_2.Negociacoes();
                    this._negociacoesView = new index_3.NegociacoesView('#negociacoesView');
                    this._mensagemView = new index_3.MensagemView('#mensagemView');
                    this._negociacaoService = new NegociacaoService_1.NegociacaoService();
                    this._negociacoesView.update(this._negociacoes);
                }
                adiciona() {
                    const data = new Date(this._inputData.val().replace(/-/g, ','));
                    if (this._diaUtil(data)) {
                        this._mensagemView.update('Negociações só podem ser registradas em dias úteis');
                        return;
                    }
                    const negociacao = new index_2.Negociacao(data, parseInt(this._inputQuantidade.val()), parseFloat(this._inputValor.val()));
                    this._negociacoes.adiciona(negociacao);
                    this._negociacoesView.update(this._negociacoes);
                    this._mensagemView.update('Negociação adicionada com sucesso!');
                    utils_1.imprime(negociacao, this._negociacoes);
                }
                _diaUtil(data) {
                    return (data.getDay() == DiaSemana.SABADO ||
                        data.getDay() == DiaSemana.DOMINGO);
                }
                importaDados() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const isResponseOk = (res) => {
                            if (res.ok) {
                                return res;
                            }
                            else {
                                throw new Error(res.statusText);
                            }
                        };
                        try {
                            const negociacoesParaImportar = yield this._negociacaoService.obterNegociacoes(isResponseOk);
                            const negociacoesJaImportadas = this._negociacoes.paraArray();
                            negociacoesParaImportar
                                .filter(negociacao => !negociacoesJaImportadas.some(jaImportada => jaImportada.igual(negociacao)))
                                .forEach(negociacao => this._negociacoes.adiciona(negociacao));
                            this._negociacoesView.update(this._negociacoes);
                        }
                        catch (error) {
                            this._mensagemView.update(error.message);
                        }
                    });
                }
            };
            __decorate([
                index_1.domInject('#data')
            ], NegociacaoController.prototype, "_inputData", void 0);
            __decorate([
                index_1.domInject('#quantidade')
            ], NegociacaoController.prototype, "_inputQuantidade", void 0);
            __decorate([
                index_1.domInject('#valor')
            ], NegociacaoController.prototype, "_inputValor", void 0);
            __decorate([
                index_1.throttle()
            ], NegociacaoController.prototype, "adiciona", null);
            __decorate([
                index_1.throttle()
            ], NegociacaoController.prototype, "importaDados", null);
            exports_1("default", NegociacaoController);
            (function (DiaSemana) {
                DiaSemana[DiaSemana["DOMINGO"] = 0] = "DOMINGO";
                DiaSemana[DiaSemana["SEGUNDA"] = 1] = "SEGUNDA";
                DiaSemana[DiaSemana["TERCA"] = 2] = "TERCA";
                DiaSemana[DiaSemana["QUARTA"] = 3] = "QUARTA";
                DiaSemana[DiaSemana["QUINTA"] = 4] = "QUINTA";
                DiaSemana[DiaSemana["SEXTA"] = 5] = "SEXTA";
                DiaSemana[DiaSemana["SABADO"] = 6] = "SABADO";
            })(DiaSemana || (DiaSemana = {}));
        }
    };
});
