/*
Arquivo da aula sobre buffers

Buffer é uma representacao de um espaco na memoria do computador usado para transitar dados de forma extremamente rapida.
Forma se salvar e ler da memoria de forma performatica. 
É mais performatico ler um pedaço de uma informacao de forma binaria (buffer é binario) do que uma string por exemplo.
*/


// Buffer.from() transforma o conteudo passado no from em buffer.
const buf = Buffer.from("ok");

console.log(buf);

