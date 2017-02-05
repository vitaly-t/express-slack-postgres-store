const pgp = require("pg-promise")();

module.exports = config => {
  config = {
    database: config.database || process.env.DATABASE_URL,
    table: config.table || "store"
  };

  const db = pgp(config.database);

  return {    
    get: function(id) {
      return db.one('SELECT data FROM $1~ WHERE id = $2', [config.table, id], a => a.data);
    },

    save: function(id, data) {
      return db.none(`
        INSERT INTO $1~ (id, data)
        VALUES ($2, $3)
        ON CONFLICT (id) DO UPDATE
        SET data = EXCLUDED.data
      `, [config.table, id, data]);
    },

    all: function() {
      return db.map('SELECT data FROM $1~', config.table, row => row.data);
    }
  };
};
