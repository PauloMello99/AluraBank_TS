export function logarTempoDeExecucao(emSegundos: boolean = false) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const metodoOriginal = descriptor.value;
        descriptor.value = function (...args: any[]) {
            let unidade = 'ms';
            let divisor = 1;
            if (emSegundos) {
                unidade = 's';
                divisor = 1000;
            }

            const t1 = performance.now();
            const retorno = metodoOriginal.apply(this, args);
            const t2 = performance.now();
            console.log(`
                \n- Método: ${propertyKey}
                \n- Argumentos: ${JSON.stringify(args)}
                \n- Retorno: ${JSON.stringify(retorno)}
                \n- Tempo: ${((t2 - t1) / divisor).toFixed(3)}${unidade}
            `);
            return retorno;
        };
    };
}
