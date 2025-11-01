// Streams são formas de ler ou escrever dados aos poucos, sem precisar te-los por completo pra isso

// --- stdin é tudo que é digitado pelo usuario no terminal da aplicação. Ja o out é a saida desse terminal.
// --- Ambos são streams. Stdin é uma readable Stream e stdout uma Writable Stream. 
// --- Já o pipe é uma forma de conecta-los e passar o dado através. Ja que nao o temos por completo ainda 
// process.stdin.pipe(process.stdout);


// --- chunk = pedaço de dado sendo passado na stream (lendo ou escrevendo)


// Criando uma stream do zero:

import { Readable } from 'node:stream';

class OneToHundredStream extends Readable {
    index = 1
    
    // --- Toda stream readable tem o metodo _read() obrigatorio. é ele quem retorna os dados dessa stream.
    _read() {
        const i = this.index++;

        if(i > 100) {
            this.push(null);
        } else {
            // --- Dentro de streams nao podemos trabalhar com string ou numeros. O formato permitido é o buffer
            // --- Entao temos que converter usando o Buffer.from();
            // --- Antes de enviar o dado para ser transformado em buffer, temos que converter para string, unico formato permitido.
            const buf = Buffer.from(String(i));

            this.push(buf);
        }
    }
}

// --- Criando uma nova isntancia e ligando ela atraves do pipe com o processo de saida no terminal (stdout)
new OneToHundredStream()
    .pipe(process.stdout);

