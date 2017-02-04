const pgp = require("pg-promise")();

module.exports = config => {
  config = {
    database: config.database || process.env.DATABASE_URL,
    table: config.table || "store"
  };

  const db = pgp(config.database);

  return {
    get: function(id) {
      return db.one(`
        SELECT data FROM ${config.table} WHERE id = $1
      `, [id])
      .then(result => result.data);
    },

    save: function(id, data) {
      return db.none(`
        INSERT INTO ${config.table} (id, data)
        VALUES ($1, $2)
        ON CONFLICT (id) DO UPDATE
        SET data = EXCLUDED.data
      `, [id, data]);
    },

    all: function() {
      return db.manyOrNone(`
        SELECT data FROM ${config.table};
      `)
      .then(result => result.map(row => row.data));
    }
  };
}
