const db = require("../config/db");
const tinyLinkModel = new Object();

tinyLinkModel.create = async (data) => {
    const query = `
        INSERT INTO tinylink(
            long_url, short_url, custom_code, deleted, click, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
        RETURNING *;
        `;

    const values = [
        data.longUrl,
        data.shortUrl,
        data.customCode,
        false,
        0
    ];

    const result = await db.pool.query(query, values);
    return result.rows[0];
};

module.exports = tinyLinkModel;
