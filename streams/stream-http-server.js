import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1;

        console.log(transformed);

        callback(null, Buffer.from(String(transformed)));
    }
}

const server = http.createServer(async (req, res) => {
    /* 
    Existe também o caso em que queremos trablhar com os dados da Stream 
    somente quando tivermos todos eles. A gente cria um array de buffers,
    vai populando ele com os pedacinhos de buffers e quando finalizar
    utiliza os dados

    Pra isso utilizamos uma sintaxe de await dentro do for de chunks da stream.
    Assim ele só deixa executar o código de baixo quando todos os chunks
    tiverem populado o array de buffers.
    */
    const buffers = [];

    for await(const chunk of req) {
        buffers.push(chunk);
    }

    // Buffer.concat faz a junção de varios chunks
    const fullStreamContent = Buffer.concat(buffers).toString();

    console.log(fullStreamContent);

    return res.end(fullStreamContent);

    // return req
    //     .pipe(new InverseNumberStream())
    //     .pipe(res);
});

server.listen(3334);