var express = require('express');
var router = express.Router();
const myQuery = require('../tools/sqlQuery')
/* GET home page. */

router.get('/book',async function(req, res, next) {
  console.log(req.query.page)
  let page =  req.query.page || 1
  let order = req.query.order || 'id'
  let books = await myQuery(`select * from bookdetail order by ${order} desc limit ${page-1},12`)
  res.render('shop-list.ejs', { books:books,currentPage:page,order });
});
router.get('/home',async function(req, res, next) {
  console.log(req.query.page)
  let page =  req.query.page || 1
  let order = req.query.order || 'id'
  let books = await myQuery(`select * from bookdetail order by ${order} desc limit ${page-1},12`)
  res.render('shop-list.ejs', { books:books,currentPage:page,order });
});
router.get('/detail',async function(req, res, next) {
  let id =  req.query.id
  let book = await myQuery(`select * from bookdetail where id = ? `,[id])
  res.render('single-product.ejs', {book:book[0]});
});
router.post('/search',async function(req, res, next) {
  let page =  req.query.page || 1
  let order = req.query.order || 'id'
  let key = req.body.key;
  let books = await myQuery(`select * from bookdetail where author like "%${key}%" or title like "%${key}%" or detail like "%${key}%" order by ${order} desc `)
  res.render('shop-list.ejs', { books:books,currentPage:page,order });
});
module.exports = router;
