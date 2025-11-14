let mCurrentIndex = 0 // Tracks the current image index
let mImages = [] // Array to hold GalleryImage objects
const mUrl = 'images.json' // Replace with actual JSON URL (now pointing to images.json)
const mWaitTime = 5000 // Timer interval in milliseconds

$(document).ready(() => {
  $(".details").hide(); // Hide details initially

  // Call a function here to start the timer for the slideshow
  // (You will add startTimer later)
  startTimer();

  // Select the moreIndicator button and add a click event to:
  // - toggle the rotation classes (rot90 and rot270)
  // - slideToggle the visibility of the .details section
  $(".moreIndicator").click(function () {
    $(this).toggleClass("rot90 rot270");
    $(".details").slideToggle();
  });

  // Select the "Next Photo" button and add a click event to call showNextPhoto
  $("#nextPhoto").click(showNextPhoto);

  // Select the "Previous Photo" button and add a click event to call showPrevPhoto
  $("#prevPhoto").click(showPrevPhoto);

  // Call fetchJSON() to load the initial set of images
  fetchJSON()
})

// Function to fetch JSON data and store it in mImages
function fetchJSON() {
    $.ajax({
        url: mUrl,
        dataType: "json",
        success: function (data) {
            mImages = data.images;  // Store JSON array in mImages

            swapPhoto();            // Display first image
        },
        error: function (xhr, status, error) {
            console.error("JSON Load Error:", error);
        }
    });
}


// Function to swap and display the next photo in the slideshow
// Make sure we have at least one image
function swapPhoto() {
    if (mImages.length === 0) return;

    let img = mImages[mCurrentIndex];

    $("#photo").attr("src", img.imgPath);
    $(".artist").text("Artist: " + img.artist);
    $(".genre").text("Genre: " + img.genre);
    $(".date").text("Album: " + img.albumTitle);
}


// Advances to the next photo, loops to the first photo if the end of array is reached
function showNextPhoto () {
    mCurrentIndex++;

    if (mCurrentIndex >= mImages.length) {
        mCurrentIndex = 0;
    }

    swapPhoto();
}

// Goes to the previous photo, loops to the last photo if mCurrentIndex goes negative
function showPrevPhoto () {
    mCurrentIndex--;

    if (mCurrentIndex < 0) {
        mCurrentIndex = mImages.length - 1;
    }

    swapPhoto();
}

// Starter code for the timer function
 let slideshowTimer = null; // store the timer ID

function startTimer() {
  // Prevent multiple timers from running
  if (slideshowTimer !== null) {
    clearInterval(slideshowTimer);
  }

  // Call showNextPhoto() every mWaitTime milliseconds
  slideshowTimer = setInterval(() => {
    showNextPhoto();
  }, mWaitTime);
}
