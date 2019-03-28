const sqliteService = require("../../services/organization_service_sqlite");
const postgresService = require( "../../services/organization_service");
const express = require( "express");

const router = express.Router();

const db = process.env.DATABASE;
const svc = db === "sqlite" ? sqliteService : postgresService;

router.get("/", (req, res) => {
    svc
      .getAll()
      .then(resp => {
        res.send(resp);
      })
      .catch(err => {
        res.status("404").json({ error: err.toString() });
      });
  
});

// Used to keep org data in a google sheet
// router.get('/', (req, res) => {
//   const url = 'https://spreadsheets.google.com/feeds/list/16npDyyzNjgZ2h5uZmRNs2T2RRUCJtHB_1eHpmxUr1SI/3/public/values?alt=json'
//   fetch(url)
//     .then(data => data.json())
//     .then(orgs => res.json(orgs.feed.entry))
//     .catch(err => {
//       console.error(err)
//       res.status('404').json({ 'error': 'Error loading orgs' })
//     })
// })

module.exports = router;
