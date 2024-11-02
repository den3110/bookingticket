import connection from "../database/init.js";
import moment from "moment";
import axios from "axios";

export const fullsearch = async (req, res) => {
  // if(req.body.data.roundtrip != "none") {
  //     connection.query("SELECT * FROM flight where `origin`=? and `destination`=? and `dayflight`=? and `daydestination`=? and `seatclass`=?",[req.body.data.origin, req.body.data.destination, req.body.data.dt,req.body.data.roundtrip ,req.body.data.sc], (err, rows, fields)=> {
  //         if(err) {
  //             throw err
  //         }
  //         return res.json(rows)
  //     })
  // }
  // else {
  //     connection.query("SELECT * FROM flight where `origin`=? and `destination`=? and `dayflight`=? and `seatclass`=?",[req.body.data.origin, req.body.data.destination, req.body.data.dt, req.body.data.sc], (err, rows, fields)=> {
  //         if(err) {
  //             throw err
  //         }
  //         return res.json(rows)
  //     })

  // }
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log(clientIp)
  const roundTrip = req.body.data.roundtrip !== "none" ? true : false;
  const fromPlace = req.body.data.origin;
  const toPlace = req.body.data.destination;
  const departDate = moment(req.body.data.dt, "DD-MM-YYYY").format(
    "YYYY-MM-DD[T]07:00:00"
  );
  const returnDate = roundTrip
    ? moment(req.body.data.roundtrip, "DD-MM-YYYY").format(
        "YYYY-MM-DD[T]07:00:00"
      )
    : moment(req.body.data.dt, "DD-MM-YYYY").format("YYYY-MM-DD[T]07:00:00");
  const adult = parseInt(req.body.data.ps.split(".")[0]);
  const child = parseInt(req.body.data.ps.split(".")[1]);
  const infant = parseInt(req.body.data.ps.split(".")[2]);
  const timeIndayRecommentRequestFrom = "09:00";
  const timeIndayRecommentRequestTo = "16:00";
  let ticketClass;
  switch (req.body.data.sc) {
    case "ECONOMY":
      ticketClass = "y";
      break;
    case "PREMIUM_ECONOMY":
      ticketClass = "b";
      break;
    case "BUSINESS":
      ticketClass = "c";
      break;
    case "FIRST":
      ticketClass = "f";
      break;
    default:
      ticketClass = null;
      break;
  }
  const version = "2.0";
  const flightType = req.body.data.roundTrip ? "Transist" : "Direct";
  const payload = {
    requestFrom: {
      roundTrip: roundTrip,
      ticketClass: ticketClass,
      fromPlace: fromPlace,
      toPlace: toPlace,
      departDate: departDate,
      returnDate: returnDate,
      adult: adult,
      child: child,
      infant: infant,
      timeIndayRecomment: timeIndayRecommentRequestFrom,
      version,
      flightType,
    },
    requestTo: {
      roundTrip: roundTrip,
      ticketClass: ticketClass,
      fromPlace: toPlace,
      toPlace: fromPlace,
      departDate: departDate,
      returnDate: returnDate,
      adult: adult,
      child: child,
      infant: infant,
      timeIndayRecomment: timeIndayRecommentRequestTo,
      version,
      flightType,
    },
    roundTrip,
    noCache: false,
  };
  const response = await axios({
    url: "https://apiportal.ivivu.com/flightinbound//gate/apiv1/GetSessionFlight",
    method: "POST",
    data: payload,
  });
  const payloadFlight = {
    roundTrip,
    fromPlace,
    toPlace,
    departDate,
    returnDate,
    adult,
    child,
    infant,
    timeIndayRecomment: timeIndayRecommentRequestFrom,
    ticketClass,
    version,
    flightType,
    sources: response?.data,
    noCache: false,
  };
  const response2 = await axios({
    url: "https://apiportal.ivivu.com/flightinbound/gate/apiv1/GetFlightDepart",
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Host: "apiportal.ivivu.com",
      "X-Forwarded-For": clientIp,
    },
    // proxy: {
    //   host: "103.116.52.132", // Địa chỉ IP của proxy
    //   port: 8888,
    //   protocol: "http",
    // },
    data: JSON.stringify(payloadFlight),
  });
  //   console.log(response2?.data);

  return res.json({ data: [], d: response2?.data });
};
