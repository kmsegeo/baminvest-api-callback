const db = require('../config/database');

const Particulier = {

    table_name: 't_particulier',

    async findById(id) {
        const query_string = `SELECT * FROM ${this.table_name} WHERE r_i=$1`;
        const res = await db.query(query_string, [id]);
        return res.rows[0];
    },

    async setAtsgoIdClient(particulier_id, atsgo_id_client) {
        const query_string = `UPDATE ${this.table_name} SET r_atsgo_id_client=$1 WHERE r_i=$2 RETURNING *`;
        const res = await db.query(query_string, [atsgo_id_client, particulier_id]);
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