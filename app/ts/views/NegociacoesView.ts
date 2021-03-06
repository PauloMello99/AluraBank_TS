import { View } from './View';
import { Negociacoes } from '../models/Negociacoes';

export class NegociacoesView extends View<Negociacoes> {
    template(model: Negociacoes): string {
        function formatDate(date: Date): string {
            return `${date.getDate()}/${
                date.getMonth() + 1
            }/${date.getFullYear()}`;
        }

        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                        <th>VOLUME</th>
                    </tr>
                </thead>

                <tbody>
                    ${model
                        .paraArray()
                        .map(
                            neg =>
                                `
                                <tr>
                                <td>${formatDate(neg.data)}</td>
                                <td>${neg.quantidade}</td>
                                <td>${neg.valor}</td>
                                <td>${neg.volume}</td>
                                </tr>
                            `
                        )
                        .join('')}
                </tbody>
                <tfoot>
                </tfoot>
            </table>
       `;
    }
}
