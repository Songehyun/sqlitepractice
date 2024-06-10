const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run("CREATE TABLE users (name TEXT, age INTEGER)");

  const stmt = db.prepare("INSERT INTO users (name, age) VALUES (?, ?)");

  const users = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "한국인", age: 35 },
  ];

  for (let user of users) {
    stmt.run(user.name, user.age);
  }

  stmt.finalize();

  db.each("SELECT rowid AS id, name, age FROM users", (err, row) => {
    console.log(`${row.id}: ${row.name}, ${row.age}`);
  });
});

db.close();
