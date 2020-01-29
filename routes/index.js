module.exports = (app) => {

    //Route til GET
    app.get("/", (req, res) => {
        //Render til EJS side
        res.render('../views/pages/index', {
            title: '',
        });
    });    
}