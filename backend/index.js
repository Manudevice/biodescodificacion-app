const express = require("express");
const neo4j = require("neo4j-driver");
const app = express();
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "password"));

app.get("/api/dobles", async (req, res) => {
  const session = driver.session();
  const result = await session.run(`
    MATCH (p1:Persona), (p2:Persona)
    WHERE p1.nombre = p2.nombre AND p1 <> p2
    RETURN p1.nombre, p2.nombre
  `);
  res.json(result.records.map(r => r.toObject()));
});

app.listen(5000, () => console.log("Backend running on port 5000"));