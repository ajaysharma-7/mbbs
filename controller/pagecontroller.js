
exports.homePage = (req, res) => {
    try {
        res.render("index.ejs")
    } catch (error) {
        console.log(error)
    }
}
exports.contactPage = (req, res) => {
    try {
        res.render("contact-us.ejs")
    } catch (error) {
        console.log(error)
    }
}
exports.aboutPage = (req, res) => {
    try {
        res.render("about-us.ejs")
    } catch (error) {
        console.log(error)
    }
}
exports.galleryPage = (req, res) => {
    try {
        res.render("Gallery.ejs")
    } catch (error) {
        console.log(error)
    }
}
exports.mbbsPage = (req, res) => {
    try {
        res.render("mbbs.ejs")
    } catch (error) {
        console.log(error)
    }
}

exports.mbbsInArmeniaPage = (req, res) => {
    try {
        res.render("mbbs-in-armenia.ejs")
    } catch (error) {
        console.log(error)
    }
}

exports.mbbsIngeorgiaPage = (req, res) => {
    try {
        res.render("mbbs-in-georgia.ejs")
    } catch (error) {
        console.log(error)
    }
}

exports.mbbsInabroadPage = (req, res) => {
    try {
        res.render("mbbs-in-abroad.ejs")
    } catch (error) {
        console.log(error)
    }
}
exports.universitiesPage = (req, res) => {
    try {
        res.render("universities.ejs")
    } catch (error) {
        console.log(error)
    }
}
exports.yerevanuniversityPage = (req, res) => {
    try {
        res.render("yerevan-haybusak-university.ejs")
    } catch (error) {
        console.log(error)
    }
}
exports.mkhitarGoshPage = (req, res) => {
    try {
        res.render("Mkhitar-Gosh-Armenian-university.ejs")
    } catch (error) {
        console.log(error)
    }
}
exports.gladzorUniversityPage = (req, res) => {
    try {
        res.render("Gladzor-university.ejs")
    } catch (error) {
        console.log(error)
    }
}
exports.progressMedicalUniversityPage = (req, res) => {
    try {
        res.render("progress-medical-university.ejs")
    } catch (error) {
        console.log(error)
    }
}
exports.eastWestUniversityPage = (req, res) => {
    try {
        res.render("east-west-university.ejs")
    } catch (error) {
        console.log(error)
    }
}