const tablesService = require('./tablesService');
const itemPerPage = 6;

exports.showPage = async (req, res) => {
    try {
        //validate info from query string
        let productPage = req.query.productPage;
        if(isNaN(productPage) || productPage <= 0 || productPage == null){
            productPage = 1;
        }
        let productName = req.query.productName;
        const originalUrl = req.originalUrl;

        //choose service
        let products;
        let maxNumberOfPages;
        if(productName){
            maxNumberOfPages = Math.ceil(await tablesService.countProductsOfName(productName) / itemPerPage);
            products = await tablesService.listProductsOfName(itemPerPage, productPage - 1, productName);
        }
        else{
            maxNumberOfPages = Math.ceil(await tablesService.countTotalProducts() / itemPerPage);
            products = await tablesService.listProducts(itemPerPage,productPage - 1);
        }

        //pass data to view
        res.render('tables', {title: "Data tables", tablesActive: req.app.locals.activeSideBarClass, products, productPage, maxNumberOfPages, originalUrl});
    }
    catch (err) {
        res.render('error', {err});
    }

}