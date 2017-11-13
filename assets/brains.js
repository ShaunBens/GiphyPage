$(function() { //document ready fnction


    // Initial array of search terms
    var bttfs = ["Back to the future", "Time Travel", "The Delorean"];

    // Function for displaying the input buttons
    function renderButtons() {

        // Deleting the buttons prior to adding new giphy buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#btnPlaceholder").empty();

        // Looping through the array of giphs
        for (var i = 0; i < bttfs.length; i++) {

            // Then dynamicaly generating buttons for each gif in the array.
            // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
            var a = $("<button>");
            // adding a button type
            a.attr("type", "button");
            // Adding a class
            a.addClass("btn btn-default newGifs");
            // Adding a data-attribute with a value of the gif at index i
            a.attr("data-name", bttfs[i]);
            a.attr("id", "newSearch");
            // Providing the button's text with a value of the gif at index i
            a.text(bttfs[i]);
            // Adding the button to the HTML
            $("#btnPlaceholder").append(a);

        }
        // Clearing the form field after hitting submit or "enter"
        var form = document.getElementById("doneso");
        form.reset();

    }



    function getGiphData() {


        // Storing our giphy API URL for our search input

        var bttf = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=4cseRuHdDTY6vskqe2n7nlA6JJXhOhHB&q=" + bttf + "&limit=10&offset=0&lang=en";



        // Perfoming an AJAX GET request to our queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            $("#searchResults").empty();
            var results = response.data; //Shows results of gif
            if (results == "") {
                alert("No Gif available for that search term");
            }

            for (var i = 0; i < results.length; i++) {

                // Creating a div to hold the gif
                var giphDiv = $("<div>");
                giphDiv.addClass("giphDiv");


                var imgURL = results[i].images.fixed_height.url;
                // Creating an element to hold the gif image
                var gifImage = $("<img>");
                gifImage.addClass("newGif");
                gifImage.attr("src", results[i].images.fixed_height_still.url);
                gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                gifImage.attr("data-animate", imgURL);
                gifImage.attr("data-state", "still");


                // prepending the gif
                giphDiv.append(gifImage);

                // Storing the rating data
                var rated = results[i].rating;

                // Creating an element to have the rating displayed
                var pOne = $("<p>").text("Rating: " + rated);

                // Displaying the rating
                giphDiv.append(pOne);

                $("#searchResults").prepend(giphDiv);
            }

        });
    }


    // This function handles events where one button is clicked
    $("#searchbtn").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var newBttf = $("#inputText").val().trim();
        // The giphy from the textbox is then added to our array
        bttfs.push(newBttf);

        // calling renderButtons which handles the processing of our gif array
        renderButtons();
        // Return false stops the page from refreshing
        return false;



    });


    // Adding a click event listener to all elements with a class of "btn btn-default"
    $(document).on("click", "#newSearch", getGiphData);

    // Adding a click event listener to our gifs to animate them and then freeze them...

    // for some reason the freeze part is not working and I can't find the solution.
    $(document).on("click", ".newGif", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            console.log("switch to annimate");
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            console.log("switch to still");
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    // Calling the renderButtons function at least once to display the initial list of gif buttons
    renderButtons();


});
