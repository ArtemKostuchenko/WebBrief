
const mainPage = async (req, res) => {
    res.render('main', {
        layout: false
    });
}

const loginPage = async (req, res) => {
    res.render('login', {
        layout: false
    });
}

module.exports = { mainPage, loginPage };