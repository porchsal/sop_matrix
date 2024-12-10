const express = require("express");
const router = express.Router();
const sitesQueries = require("../queries/sites_queries");

router.get("/", sitesQueries.getAllSites);