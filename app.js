const express = require("express");
const app = express();
const mongoose = require("mongoose");
const WrapAsync = require("./utils/WrapAsync.js");
const Listening = require("./models/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
const ExpressErrors = require("./utils/ExpressErrors.js");
const Review = require("./models/review.js");
const flash = require("connect-flash");
const session = require("express-session");
var cookieParser = require("cookie-parser");
const { error } = require("console");
app.listen(3000, () => {
  console.log("running on port number 3000");
});
main()
  .then(() => {
    console.log("Connected to MongoDb");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
}

const sesssionoptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxage: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};
app.use(session(sesssionoptions));
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  next();
});
app.get("/", async (req, res) => {
  const alllistings = await Listening.find({});
  let size = alllistings.length;
  res.render("./listings/home1.ejs", { alllistings, size });
});
app.get("/home", async (req, res) => {
  res.render("./listings/home.ejs");
});
app.get("/listings", async (req, res) => {
  const alllistings = await Listening.find({});
  let size = alllistings.length;
  res.render("./listings/index.ejs", { alllistings, size });
});
app.get("/listing/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listening.findById(id).populate("reviews");
  res.render("./listings/show.ejs", { listing });
});
app.get("/listings/new", (req, res) => {
  res.render("./listings/new.ejs");
});
app.post(
  "/listings",
  WrapAsync(async (req, res) => {
    const newlisting = new Listening(req.body.listing);
    await newlisting.save();
    req.flash("success", "New Room Was Added");
    res.redirect("/listings");
  })
);
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listening.findById(id);
  res.render("listings/edit.ejs", { listing });
});
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listening.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect("/listings");
});
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listening.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
});
app.get("/privacy", (req, res) => {
  res.render("./includes/privacy.ejs");
});
app.get("/terms", (req, res) => {
  res.render("./includes/terms.ejs");
});
app.use((err, req, res, next) => {
  let { statusCode, message } = err;
  res.status(statusCode).send(message);
});
app.use(cookieParser());
app.get("/getcookies", (req, res) => {
  res.cookie("name", "Hello Abhilash");
  res.send("cookies saved");
});
app.get("/getcoo", (req, res) => {
  console.dir(req.cookies);
  res.send("home");
});

app.post("/listings/:id/reviews", async (req, res) => {
  let listing = await Listening.findById(req.params.id);
  let newReview = new Review(req.body.review);
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  console.log("review saved");
  res.redirect(`/listing/${listing._id}`);
});
app.delete(
  "/listings/:id/reviews/:reviewId",
  WrapAsync(async (req, res, next) => {
    let { id, reviewId } = req.params;

    try {
      // Find the listing and ensure it exists
      const listing = await Listening.findById(id);
      if (!listing) {
        return res.status(404).send("Listing not found");
      }

      // Remove the review from the listing
      await Listening.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

      // Find and delete the review
      const review = await Review.findByIdAndDelete(reviewId);
      if (!review) {
        return res.status(404).send("Review not found");
      }
      console.log("review deleted");
      // Redirect to the listing page after successful deletion
      res.redirect(`/listing/${id}`);
    } catch (error) {
      next(error); // Pass the error to the error-handling middleware
    }
  })
);

app.use((err,req, res) => {
  res.status(404).render("./listings/error.ejs");
  console.log(err);
});
