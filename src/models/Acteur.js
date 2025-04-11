const db = require('../config/database');

const Acteur = {  

  tableName: 't_acteur',

  async findByEmail(email) {

    const queryString = `
      SELECT 
        r_i,
        r_nom_complet, 
        r_email, 
        r_telephone_prp, 
        r_telephone_scd, 
        r_adresse, 
        r_statut,
        r_date_creer, 
        r_date_modif, 
        r_date_activation,
        e_type_acteur,
        e_signataire,
        e_entreprise,
        e_represantant,
        e_particulier,
        profil_investisseur,
        r_langue,
        r_mdp 
      FROM ${this.tableName} 
      WHERE r_email = $1`;
      
    const res = await db.query(queryString, [email]);
    return res.rows[0];
  },

  async findByTelephone(telephone) {

    const queryString = `
      SELECT 
        r_i,
        r_nom_complet, 
        r_email, 
        r_telephone_prp, 
        r_telephone_scd, 
        r_adresse, 
        r_statut,
        r_date_creer, 
        r_date_modif, 
        r_date_activation,
        e_type_acteur,
        e_signataire,
        e_entreprise,
        e_represantant,
        e_particulier,
        profil_investisseur,
        r_langue,
        r_mdp 
      FROM ${this.tableName} 
      WHERE r_telephone_prp = $1`;
      
    const res = await db.query(queryString, [telephone]);
    return res.rows[0];
  },
  
  async activeCompteByEmail(email) {
    const queryString = `UPDATE ${this.tableName} SET r_statut=$1, r_date_activation=$2 WHERE r_email=$3 RETURNING r_i,
        r_nom_complet, 
        r_email, 
        r_telephone_prp, 
        r_telephone_scd, 
        r_adresse, 
        r_statut,
        r_date_creer, 
        r_date_modif, 
        r_date_activation,
        e_type_acteur,
        e_signataire,
        e_entreprise,
        e_represantant,
        e_particulier,
        profil_investisseur,
        r_langue`;
    const res = await db.query(queryString, [1, new Date(), email])
    return res.rows[0];
  },

}

module.exports = Acteur;