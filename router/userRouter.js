const router = require("express").Router()
const pageController = require("../controller/pagecontroller")

router.get("/", pageController.homePage)
router.get("/contact-us", pageController.contactPage)
router.get("/about-us", pageController.aboutPage)
router.get("/gallery", pageController.galleryPage)
router.get("/mbbs", pageController.mbbsPage)
router.get("/country/mbbs-in-armenia", pageController.mbbsInArmeniaPage)
router.get("/country/mbbs-in-georgia", pageController.mbbsIngeorgiaPage)
router.get("/country/mbbs-in-abroad", pageController.mbbsInabroadPage)
router.get("/universities", pageController.universitiesPage)

router.get("/university/yerevan-haybusak-university", pageController.yerevanuniversityPage)
router.get("/university/mkhitar-gosh-armenian-russian-international-university", pageController.mkhitarGoshPage)
router.get("/university/gladzor-university", pageController.gladzorUniversityPage)
router.get("/university/progress-medical-university", pageController.progressMedicalUniversityPage)
router.get("/university/east-west-university", pageController.eastWestUniversityPage)
module.exports = router