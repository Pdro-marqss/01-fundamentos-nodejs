import fs from 'node:fs/promises';

// Instanciando uma classe interna do Javascript, URL, para capturar a url do arquivo db.json e ter o path dele
const databasePath = new URL('../db.json', import.meta.url);

export class DataBase {
    // Hashtag é o jeito node de deixar uma propriedade privada. Agora novas instancias da classe nao podem acessar essa propriedade (equivalente a private)
    #database = {};

    constructor() {
        fs.readFile(databasePath, 'utf8')
        .then(data => {
            this.#database = JSON.parse(data);
        })
        .catch(() => {
            this.#persist();
        });
    }

    // Metodo que escreve no arquivo de banco local
    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database));
    }

    select(table) {
        const data = this.#database[table] ?? [];
        
        return data;
    }

    insert(table, data) {
        if(Array.isArray(this.#database[table])) {
            this.#database[table].push(data);
        } else {
            this.#database[table] = [data];
        }

        this.#persist();

        return data;
    }
}