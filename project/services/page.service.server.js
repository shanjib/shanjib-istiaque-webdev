var app = require("../../express");
var pageModel = require("../model/page/page.model.server");

app.post("/api/website/:websiteId/page", createPage);
app.get("/api/website/:websiteId/page", findPagesByWebsiteId);
app.get("/api/page/:pageId", findPageById);
app.put("/api/page/:pageId", updatePage);
app.delete("/api/website/:websiteId/page/:pageId", deletePage);

function createPage(req, res)
{
    var websiteId = req.params.websiteId;
    var page = req.body;
    pageModel
        .createPage(websiteId, page)
        .then(function (page) {
            res.json(page);
        }, function (err) {
            res.sendStatus(400).send(err);
        });
}

function findPagesByWebsiteId(req, res)
{
    var websiteId = req.params.websiteId;
    pageModel
        .findAllPagesForWebsite(websiteId)
        .then(function (websites) {
            res.json(websites);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findPageById(req, res)
{
    var pageId = req.params.pageId;
    pageModel
        .findPageById(pageId)
        .then(function (page) {
            res.json(page);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function updatePage(req, res)
{
    var pageId = req.params.pageId;
    var page = req.body;
    pageModel
        .updatePage(pageId, page)
        .then(function (status) {
            res.send(status);
        }, function (err) {
            res.sendStatus(400).send(err);
        });
}

function deletePage(req, res)
{
    var pageId = req.params.pageId;
    var websiteId = req.params.websiteId;
    pageModel
        .deletePage(websiteId, pageId)
        .then(function (status) {
            res.send(status);
        }, function (err) {
            res.sendStatus(400).send(err);
        });
}
