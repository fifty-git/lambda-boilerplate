'use strict';

const mysql = require('./index');

module.exports = {
  getTag: async (tagId) => {
    try {
      const results = await mysql.query({
        sql: `SELECT * FROM cart_tags
        WHERE tag_id = ?`,
        timeout: 1000000,
        values: [tagId],
      });
      await mysql.end();
      return { error: false, results } || false;
    } catch (error) {
      console.log('DEMO SELECT SQL FAIL', error);
      return { error: true, message: error };
    }
  },

  insertTag: async (data) => {
    const queryData = {
      tag_name: data.tagName,
      tag_description: data.tagDescription,
      tag_priority: data.tagPriority,
      tag_color: data.tagColor,
    };

    const results = await mysql
      .query('INSERT INTO cart_tags SET ?', queryData)
      .catch((err) => ({ error: true, message: err }));
    await mysql.end();
    return { error: false, insertId: results.insertId };
  },

  updateTag: async (data) => {
    try {
      const result = await mysql.query({
        sql: `UPDATE cart_tags
        SET tag_description = ?
        WHERE tag_id = ?`,
        timeout: 100000,
        values: [data.tagDescription, data.tagId],
      });
      await mysql.end();
      return { error: false, affectedRows: result.affectedRows };
    } catch (error) {
      return { error: true, message: error };
    }
  },
};
