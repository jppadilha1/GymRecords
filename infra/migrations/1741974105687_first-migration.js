/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("tbUser", {
    id: { type: "integer", primaryKey: true },
    username: { type: "varchar(155)", notNull: true },
    email: { type: "varchar(255)", notNull: true },
    password: { type: "varchar(255)", notNull: true },
  });
};

exports.down = (pgm) => {};
