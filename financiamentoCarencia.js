import { Financiamento } from "./financiamento.js";
import { Parcela } from './parcela.js';

export class FinanciamentoCarencia extends Financiamento {
    #carencia;
    #taxaJuros;
    #parcelas = [];

    constructor(valor, entrada, taxa, prazo,carencia) {
        super(valor, entrada, taxa, prazo);
        this.#taxaJuros = taxa;
        this.#parcelas = super.getParcelas();
        this.#carencia = carencia;
    }
    calcularParcelasMensais() {
        let saldo = this.#parcelas[0].getSaldo();
        for (let i = 0; i < this.#carencia; i++) {
            const numero = this.#parcelas.length
            saldo += Financiamento.calculaJuros(saldo, this.#taxaJuros);
            this.#parcelas.push(new Parcela(numero, 0, 0, 0, saldo));

        }
        super.calcularParcelasMensais();
    }
}