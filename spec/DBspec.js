const DB = require("../server/src/main/DBManager");
const mysql = require('mysql2');

createConnection = () => {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin"
  });
}

async function connectAndCreate(con) {
  await con.connect(async function (err) {
    if (err) throw err;
    console.log("Connected!");
  });
  await con.promise().query("CREATE DATABASE mydbTest");
  console.log("Database created");
}

async function dropAndClose(con) {
  await con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });
  await con.promise().query("DROP DATABASE mydbTest");
  console.log("Database deleted");
}


describe("DB Unit Testing", function () {



  beforeAll(async function () {
    //create connection & mydb
    var con = createConnection();
    await connectAndCreate(con);
  });

  afterAll(async function () {
    //create connection & drop mydb
    con = createConnection();
    await dropAndClose(con);
  });


  let sequelize;
  beforeEach(async function () {
    sequelize = await DB.initDB('mydbTest');
  });


  it("init", async function () {
    //Testing connection
    await sequelize.authenticate().catch(err => fail('Unable to connect to the database:', err));
  });


  it("add user", async function () {
    await DB.add('user', {
      id: 0,
      username: "admin",
      password: "admin",
      permissions: "ADMIN"
    });
    await DB.getById('user', 0).then((result) => {
      expect(result.id).toBe(0);
      expect(result.username).toBe("admin");
      expect(result.password).toBe("admin");
      expect(result.permissions).toBe("ADMIN");
    });
  });

    it("add employee", async function () {

      await DB.add('user', {
        id: 1,
        username: "manager",
        password: "manager",
        permissions: "MANAGER",
      });
      await DB.getById('user', 1).then((result) => {
        expect(result.id).toBe(1);
        expect(result.username).toBe("manager");
        expect(result.password).toBe("manager");
        expect(result.permissions).toBe("MANAGER");
      });

      await DB.add('employee', {
        id: 1,
        firstName: "Noa",
        lastName: "Cohen",
        contactDetails: '0508888888'
      });
      await DB.getById('employee', 1).then((result) => {
        expect(result.id).toBe(1);
        expect(result.firstName).toBe("Noa");
        expect(result.lastName).toBe("Cohen");
        expect(result.contactDetails).toBe("0508888888");
      });

    });
   







  });


