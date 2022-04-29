const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        'SELECT * FROM warehouse ORDER BY WhCode LIMIT ?,? ',
        [offset, config.listPerPage]
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function getSingle(id) {
    const data = await db.query('SELECT * FROM warehouse WHERE WhCode = ?', [id]);
    const meta = { page: 1 };
    return {
        data,
        meta
    }
}

function validateCreate(warehouse) {
    let data = [];

    console.log(warehouse);

    if (!warehouse) {
        data.push('No object is provided');
    }

    if (!warehouse.WhCode) {
        data.push('WhCode is empty');
    }

    if (!warehouse.WhName) {
        data.push('WhCode is empty');
    }

    if (warehouse.WhCode && warehouse.WhCode.length > 255) {
        messages.push('warehouse cannot be longer than 255 characters');
    }

    if (warehouse.WhName && warehouse.WhName.length > 255) {
        messages.push('warehouse name cannot be longer than 255 characters');
    }

    if (data.length) {
        let error = new Error(data.join());
        error.statusCode = 400;

        throw error;
    }
}

async function create(warehouse) {
    validateCreate(warehouse);

    const result = await db.query(
        'INSERT INTO warehouse (WhCode, WhName) VALUES (?, ?)',
        [warehouse.WhCode, warehouse.WhName]
    );

    let message = 'Error in creating warehouse';

    if (result.affectedRows) {
        message = 'warehouse created successfully';
    }

    return { message };
}

async function update(id, warehouse) {
    const result = await db.query(
        `UPDATE warehouse SET WhName=? WHERE WhCode=?`,
        [warehouse.WhName, id]
    );

    let message = 'Error in updating warehouse';

    if (result.affectedRows) {
        message = 'warehouse updated successfully';
    }

    return { message };
}

async function remove(id) {
    const result = await db.query(
        `DELETE FROM warehouse WHERE WhCode=?`,
        [id]
    );

    let message = 'Error in deleting warehouse';

    if (result.affectedRows) {
        message = 'warehouse deleted successfully';
    }

    return { message };
}

module.exports = {
    getMultiple,
    getSingle,
    create,
    update,
    remove
}