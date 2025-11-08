export class DataBase {
    // Hashtag é o jeito node de deixar uma propriedade privada. Agora novas instancias da classe nao podem acessar essa propriedade (equivalente a private)
    #database = {};

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

        return data;
    }
}