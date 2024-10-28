import express from "express"
import { add_flight } from "../controller/add_flight.js"
import { add_hotel } from "../controller/add_hotel.js"
import { admin } from "../controller/admin.js"
import { airport_autocomplete } from "../controller/airport_autocomplete.js"
import { auto } from "../controller/auto.js"
import { bookingticket } from "../controller/bookingticket.js"
import { code_aiport } from "../controller/code_airport.js"
import { delete_ } from "../controller/delete_.js"
import { detail } from "../controller/detail.js"
import { entities_hotel } from "../controller/entities_hotel.js"
import { fullsearch } from "../controller/fullsearch.js"
import { getcustomer } from "../controller/get_customer.js"
import { login } from "../controller/login.js"
import { prebooking } from "../controller/prebooking.js"
import { result_hotel } from "../controller/result_hotel.js"
import { search_airport } from "../controller/search_airport.js"
import { search_combo } from "../controller/search_combo.js"
import { search_hotel } from "../controller/search_hotel.js"
import { signup } from "../controller/signup.js"
import { signupOauth2 } from "../controller/signupOauth2.js"
import { suggest } from "../controller/suggest.js"
import { suggest2 } from "../controller/suggest2.js"
import { suggest_travel } from "../controller/suggest_travel.js"
import { payment } from "../controller/payment.js"
import { payment_intent } from "../controller/payment_intent.js"
import fetchImage from "../controller/fetchImage.js"
const router = express.Router()
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource')
})
router.post("/api/v1/flight/search", search_airport)
router.post("/api/v1/hotel/search", search_hotel)
router.get("/api/v1/hotel/autocomplete", suggest_travel)
router.get("/api/v1/airport/autocomplete", airport_autocomplete)
router.get("/api/v2/airport/codeairport", code_aiport )
router.post("/api/v4/airport/fullsearch", fullsearch)
router.post("/v2/api/result/hotel", result_hotel)
router.post("/v2/api/entities/hotel", entities_hotel)
router.post("/v2/api/result/search/combo", search_combo)
router.post("/v4/api/prebooking", prebooking)
router.post("/v2/api/suggest/result", suggest)
router.post("/signup",signup)
router.post("/login", login)
router.post("/suggest2", suggest2)
router.post("/admin", admin)
router.post("/booking/ticket", bookingticket)
router.post("/detail", detail)
router.post("/delete", delete_)
router.post("/add_flight", add_flight)
router.post("/add_hotel", add_hotel)
router.post("/auto", auto)
router.post("/api/v1/get/customer/book", getcustomer)
router.post("/api/v1/make/user", signupOauth2)
router.post("/api/v1/payment/create-checkout-session", payment)
router.post("/api/v1/payment/status", payment_intent)
router.get('/flight/inbound/images/logo-flight/:logoAriline', fetchImage);

export default router
