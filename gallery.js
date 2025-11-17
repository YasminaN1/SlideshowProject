let mCurrentIndex = 0 // number: Tracks the current image index
let mImages = [] // array: Holds GalleryImage objects
const mUrl = 'images.json' // string/consant: URL to JSON data
const mWaitTime = 5000 // number/constant: Timer interval in milliseconds

$(document).ready(() => { // function: runs when DOM is ready
  $(".details").hide(); // jQuery function: hide details initially

  startTimer(); // function: start slideshow timer

  $(".moreIndicator").click(function () { // function: click event handler
    $(this).toggleClass("rot90 rot270"); // jQuery function: toggle rotation classes
    $(".details").slideToggle(); // jQuery function: toggle details visibility
  });

  $("#nextPhoto").click(showNextPhoto); // function: click event to show next photo
  $("#prevPhoto").click(showPrevPhoto); // function: click vent to show previous photo

  fetchJSON(); // function: load iniial images from JSON
})

// function: fetch JSON data and store in imgs
function fetchJSON() {
    $.ajax({
        url: mUrl, // string: JSON URL
        dataType: "json", // string: data type
        success: function (data) { // function: callback on success
            mImages = data.images;  // array: storeJSON array in imgs
            swapPhoto();            // function: display first image
        },
        error: function (xhr, status, error) { // function: callback on error
            console.error("JSON Load Error:", error); // function: log error
        }
    });
}

// function: display current photo and details
function swapPhoto() {
    if (mImages.length === 0) return; // check array length

    let img = mImages[mCurrentIndex]; // object: curent image object

    $("#photo").attr("src", img.imgPath); // jQury function: update photo
    $(".artist").text("Artist: " + img.artist); //  update text
    $(".genre").text("Genre: " + img.genre);   //  update text
    $(".date").text("Album: " + img.albumTitle); // update text
}

// function: advance to next photo
function showNextPhoto () {
    mCurrentIndex++; // number: increment index

    if (mCurrentIndex >= mImages.length) { // check array length
        mCurrentIndex = 0;
    }

    swapPhoto(); // function: update photo
}

// function: go to previous photo
function showPrevPhoto () {
    mCurrentIndex--; 

    if (mCurrentIndex < 0) { 
        mCurrentIndex = mImages.length - 1;
    }

    swapPhoto(); // function: update photo
}

let slideshowTimer = null; // variable: stores timer id

// function: start/restart the slideshow timer
function startTimer() {
  if (slideshowTimer !== null) { // check if timer exists
    clearInterval(slideshowTimer); 
  }

  // function: set new timer to call next photo
  slideshowTimer = setInterval(() => {
    showNextPhoto(); // function: call next photo
  }, mWaitTime); 
}
