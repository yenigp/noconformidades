// myscript.js
// This example uses Node 8's async/await syntax.

const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const mypw = "oracle"

async function run() {

  let connection;

  try {
    connection = await oracledb.getConnection( {
      user          : "system",
      password      : mypw,
      connectString : "localhost/XE"
    });

    const result = await connection.execute(
      `SELECT * FROM EGRAL.NOM_PAIS`,
    );
    console.log(result.rows);

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();
