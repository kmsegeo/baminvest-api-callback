const db = require('../config/database');

const Particulier = {

    table_name: 't_particulier',

    async findById(id) {
        const query_string = `SELECT * FROM ${this.table_name} WHERE r_i=$1`;
        const res = await db.query(query_string, [id]);
        return res.rows[0];
    },

    async setAtsgoClientData(particulier_id, numeroCompteTitre, numeroCompteEspece) {
        const query_string = `UPDATE ${this.table_name} SET r_ncompte_titre=$1, r_ncompte_espece=$2 WHERE r_i=$3 RETURNING *`;
        const res = await db.query(query_string, [numeroCompteTitre, numeroCompteEspece, particulier_id]);
        return res.rows[0];
    },

}

const Entreprise = {

    table_name: 't_entreprise',

    async findById(id) {
        const query_string = `SELECT * FROM ${this.table_name} WHERE r_i=$1`;
        const res = await db.query(query_string, [id]);
        return res.rows[0];
    },

}

module.exports = {
    Particulier,
    Entreprise,
}