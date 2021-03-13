class Negociacoes {
    private _negociacoes: Array<Negociacao> = [];

    adiciona(negociacao: Negociacao): void {
        this._negociacoes.push(negociacao);
    }

    paraArray(): Array<Negociacao> {
        // Programação defensiva, retorna uma cópia para não ter a referência
        // Mantem-se a tipagem por ter sido definida na função
        return [].concat(this._negociacoes);
    }
}
