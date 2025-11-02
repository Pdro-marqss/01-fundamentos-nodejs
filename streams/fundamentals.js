// Streams são formas de ler ou escrever dados aos poucos, sem precisar te-los por completo pra isso

// --- stdin é tudo que é digitado pelo usuario no terminal da aplicação. Ja o out é a saida desse terminal.
// --- Ambos são streams. Stdin é uma readable Stream e stdout uma Writable Stream. 
// --- Já o pipe é uma forma de conecta-los e passar o dado através. Ja que nao o temos por completo ainda 
// process.stdin.pipe(process.stdout);
// --- Existem 4 principais tipos de Streams. As de leitura Readable, as de escrita Writable, as de transformação
// Transform, e as Duplex (conseguem faz a funcao de leitura e escrita em uma só, mas nao de transformaçao).


// --- chunk = pedaço de dado sendo passado na stream (lendo ou escrevendo)


// Criando uma stream do zero:

import { Readable, Transform, Writable } from 'node:stream';

// Stream de leitura
class OneToHundredStream extends Readable {
    index = 1
    
    // --- Toda stream readable tem o metodo _read() obrigatorio. é ele quem retorna os dados dessa stream.
    _read() {
        const i = this.index++;

        // setTimeout simula o dado sendo recebido aos poucos
        setTimeout(() => {
            if(i > 100) {
                this.push(null);
            } else {
                // --- Dentro de streams nao podemos trabalhar com string ou numeros. O formato permitido é o buffer
                // --- Entao temos que converter usando o Buffer.from();
                // --- Antes de enviar o dado para ser transformado em buffer, temos que converter para string, unico formato permitido.
                const buf = Buffer.from(String(i));
    
                this.push(buf);
            }
        }, 1000);
    }
}

// Existe também a Stream de Transformação
class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1;
        const transformedInBufferType = Buffer.from(String(transformed));

        // Primeiro parametro do callback é um erro e o segundo o valor transformado
        callback(null, transformedInBufferType);
    }
}  

// Stream de escrita
class MultiplyByTenStream extends Writable {
    // Uma stream de escrita só processa o dado, nunca retorna nada ou muda nada.
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10);
        callback();
    }
}

// --- Criando uma nova isntancia e ligando ela atraves do pipe com o processo de saida no terminal (stdout)
// new OneToHundredStream()
//     .pipe(process.stdout);

// --- Agora usando uma stream de escrita feita do zero ao inves do stdout
// --- Entao le-se que estamos lendo dados de uma stream retornando dados de 1 a 100 e escrevendo eles dentro da stream
// --- de escrita que multiplica eles por 10. O dado é passado pelo pipe
// new OneToHundredStream()
//     .pipe(new MultiplyByTenStream());

// --- Agora usando também o Transform para converter o dado da leitura para a escrita
// --- A stream Transform é usada sempre como intermeio entre outras 2, para a comunicação delas.
// --- Enquanto leitura só le, e escrita só escreve, a de transform le os dados de uma stream de leitura e escreve em uma stream de escrita
new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream());
