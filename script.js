//Start of Js Code
$(document).ready(() => {

        $('#displaymovie').hide();
        $('.se-pre-con').hide();

        //Submit button function
    
        $('#submitbtn').click((event) => {
            let title = $('#searchtitle').val();
            let year = $('#searchyear').val();
            let id = $('#searchid').val();
            if(year.length == 0 && id.length == 0)
            {
                bytitle(title);
            }
            else if(year.length != 0 && id.length == 0)
            {
                byyear(title,year);
            }
            else if(year.length == 0 && id.length != 0)
            {
                byid(id);
            }
            else if(year.length != 0 && id.length != 0)
            {
    
                byall(title,year,id);
            }
            else 
            {
                alert("Please fill Required input ID or Title !");
            }
            
            event.preventDefault();
        });
        $("#resetbtn").click((e)=>{
           
           e.preventDefault();
        });
        
});
let enableDisableButton= () =>{
        let title=$("#title").val().trim();
        let imdbId=$("#imdbId").val().trim();
        if(title.length > 0 || imdbId.length >0){
            $("#submit").prop("disabled", false);
            if($("#input-alert").is(":visible")){
                $("#input-alert").hide();
            }
            if($("#title").hasClass("is-invalid")){
                $("#title").removeClass("is-invalid");
            } 
            if($("#imdbId").hasClass("is-invalid")){
                $("#imdbId").removeClass("is-invalid");
            }

            if($("#input-hint").is(":hidden")){
                $("#input-hint").show();
            }
            if($("#movie").is(":visible")){
                if(!($("#movie").hasClass("d-none"))){
                    $("#movie").toggleClass("d-none");
                }
            }
            removeNoDisplayClass();
        }
        else{
            $("#submit").prop("disabled", true);
            $("#input-hint").hide();
            $("#input-alert").show();
            $("#title,#imdbId").addClass("is-invalid");
        }

    } 

//Clear Search Function

 let clearSearch =()=>{  
                    $('#mPoster').empty();
                    $('#mTitle').empty();
                    $('#mReleased').empty();
                    $('#mYear').empty();
                    $('#mActors').empty();
                    $('#mDirector').empty();
                    $('#mWriter').empty();
                    $('#mGenre').empty();
                    $('#mRated').empty();
                    $('#mProduction').empty();
                    $('#mRuntime').empty();
                    $('#mLanguage').empty();
                    $('#mCountry').empty();
                    $('#mAwards').empty();
                    $('#mPlot').empty();
                    $('#mimdbRating').empty();
                    $('#mimdbVotes').empty();
                    $('#mimdbID').empty();
                    $('#mType').empty();
                    $('#mDVD').empty();
                    $('#mWebsite').empty();
                    $('#mRatings').empty();
                    $('#mBoxOffice').empty();
                    $('#mResponse').empty();
                    $('#mMetascore').empty();



    }



//Search movie by their Title

function bytitle(title) {
      $.ajax({
            type: 'GET', // request type GET
            dataType: 'json', // requesting datatype
            url: 'https://www.omdbapi.com/?i=tt3896198&apikey=8e176998'+'&t='+title, 
            success: (data) => { 
            
                   console.log(data); 


            //Clear the previous search
            
                 clearSearch();


                   let $err = $(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
                      <strong>${data.Title}</strong>
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>`);
                    $('#error').append($err);
                    console.log(data.Poster);


                    //Pushing Data to html

                 if(data.Poster=="N/A")
                    {
                        $('#mPoster').attr("src","images/demo-img.png");
                    }
                    else 
                    {
                        $('#mPoster').attr("src",data.Poster);
                    }


                    $('#mTitle').append("Title : ",data.Title);
                    $('#mReleased').append("Released : ",data.Released);
                    $('#mYear').append("Year : ",data.Year);
                    $('#mActors').append("Actors : ",data.Actors);
                    $('#mDirector').append("Director : ",data.Director);
                    $('#mWriter').append("Writer : ",data.Writer);
                    $('#mGenre').append("Genre : ",data.Genre);
                    $('#mRated').append("Rated : ",data.Rated);
                    $('#mProduction').append("Production : ",data.Production);
                    $('#mRuntime').append("Runtime : ",data.Runtime);
                    $('#mLanguage').append("Language : ",data.Language);
                    $('#mCountry').append("Country : ",data.Country);
                    $('#mAwards').append("Awards : ",data.Awards);
                    $('#mPlot').append("Plot : ",data.Plot);
                    $('#mimdbRating').append("IMDBRating : ",data.imdbRating);
                    $('#mimdbVotes').append("IMDBVotes : ",data.imdbVotes);
                    $('#mimdbID').append("IMDB-id : ",data.imdbID);
                    $('#mType').append("Type : ",data.Type);
                    $('#mDVD').append("DVD : ",data.DVD);
                    $('#mWebsite').append("Website : ",data.Website);
                    $('#mRatings').append("Ratings : ");
                    let l = data.Ratings;
                    for(let j=0;j<l.length;j++)
                    {
                        for(i in l[j])
                        {
                            $('#mRatings').append(`${i} : ${l[j][i]}</br>`);
                            console.log(i);
                        }
                    }
                    
                    $('#mBoxOffice').append("BoxOffice : ",data.BoxOffice);
                    $('#mResponse').append("Response : ",data.Response);
                    $('#mMetascore').append("Metascore : ",data.Metascore);

                    
                    $('#displaymovie').show();

                    console.log("done");
                 },
            error: (data) => { 

                alert("some error occured")//for time out and errors

            },

            beforeSend: () => {
                //Loader
                $('.se-pre-con').show();
                // Wait for window load
                    $(window).load(function() {
        // Animate loader off screen
                     $(".se-pre-con").fadeOut("slow");;
             });

            },
            complete: () => {

               
                alert("data fetched success")
                $('.se-pre-con').hide();

            },
            timeout:3000
        }); // end of AJAX request
 }










//To Get data by Title and Year

function byyear(title,year) {
      $.ajax({
            type: 'GET', // request type GET
            dataType: 'json', // requesting datatype
            url: 'https://www.omdbapi.com/?&t='+title+`&y=`+year+`&apikey=8e176998`,
          
            success: (data) => { 
                
    if(data.Year == year)
                {
                     let $err = $(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
                      <strong>${data.Title}</strong>
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>`);
                    $('#error').append($err);
                   console.log(data); 




//Clear the previous search
            clearSearch();
           //Pushing Data to html
                    if(data.Poster=="N/A")
                    {
                        $('#mPoster').attr("src","images/demo-img.png");
                    }
                    else 
                    {
                        $('#mPoster').attr("src",data.Poster);
                    }


                    $('#mTitle').append("Title : ",data.Title);
                    $('#mReleased').append("Released : ",data.Released);
                    $('#mYear').append("Year : ",data.Year);
                    $('#mActors').append("Actors : ",data.Actors);
                    $('#mDirector').append("Director : ",data.Director);
                    $('#mWriter').append("Writer : ",data.Writer);
                    $('#mGenre').append("Genre : ",data.Genre);
                    $('#mRated').append("Rated : ",data.Rated);
                    $('#mProduction').append("Production : ",data.Production);
                    $('#mRuntime').append("Runtime : ",data.Runtime);
                    $('#mLanguage').append("Language : ",data.Language);
                    $('#mCountry').append("Country : ",data.Country);
                    $('#mAwards').append("Awards : ",data.Awards);
                    $('#mPlot').append("Plot : ",data.Plot);
                    $('#mimdbRating').append("IMDBRating : ",data.imdbRating);
                    $('#mimdbVotes').append("IMDBVotes : ",data.imdbVotes);
                    $('#mimdbID').append("IMDB-id : ",data.imdbID);
                    $('#mType').append("Type : ",data.Type);
                    $('#mDVD').append("DVD : ",data.DVD);
                    $('#mWebsite').append("Website : ",data.Website);
                    $('#mRatings').append("Ratings : ");
                    let l = data.Ratings;
                    for(let j=0;j<l.length;j++)
                    {
                        for(i in l[j])
                        {
                            $('#mRatings').append(`${i} : ${l[j][i]}</br>`);
                            console.log(i);
                        }
                    }
                    
                    $('#mBoxOffice').append("BoxOffice : ",data.BoxOffice);
                    $('#mResponse').append("Response : ",data.Response);
                    $('#mMetascore').append("Metascore : ",data.Metascore);

                    
                    $('#displaymovie').show();

                    console.log("done");
                }
                else
                {
                    let $err = $(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
                      <strong>Please Enter valid year of this movie !</strong>
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>`);
                    $('#error').append($err);
                }
               
            },
            error: (data) => { // in case of error response

                alert("some error occured")

            },

            beforeSend: () => { 

                 $('.se-pre-con').show();
                // Wait for window load
                    $(window).load(function() {
        // Animate loader off screen
                     $(".se-pre-con").fadeOut("slow");;
             });

            },
            complete: () => {

               
                alert("data fetched success")
                $('.se-pre-con').hide();

            },
            timeout:3000
        }); // end of AJAX request
}

//Search movie by ID 

function byid(id) {
  
      $.ajax({
            type: 'GET', // request type GET
            dataType: 'json', // requesting datatype
            async: true,
            url: 'https://www.omdbapi.com/?&apikey=8e176998'+'&i='+id, 
            success: (data) => { 
                
                    
                   console.log(data); 

        //Clear the previous search
            clearSearch();


                let $err = $(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
                      <strong>${data.Title}</strong>
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>`);
                    $('#error').append($err);

//Pushing Data to html
                
                   if(data.Poster=="N/A")
                    {
                        $('#mPoster').attr("src","images/demo-img.png");
                    }
                    else 
                    {
                        $('#mPoster').attr("src",data.Poster);
                    }

                    $('#mTitle').append("Title : ",data.Title);
                    $('#mReleased').append("Released : ",data.Released);
                    $('#mYear').append("Year : ",data.Year);
                    $('#mActors').append("Actors : ",data.Actors);
                    $('#mDirector').append("Director : ",data.Director);
                    $('#mWriter').append("Writer : ",data.Writer);
                    $('#mGenre').append("Genre : ",data.Genre);
                    $('#mRated').append("Rated : ",data.Rated);
                    $('#mProduction').append("Production : ",data.Production);
                    $('#mRuntime').append("Runtime : ",data.Runtime);
                    $('#mLanguage').append("Language : ",data.Language);
                    $('#mCountry').append("Country : ",data.Country);
                    $('#mAwards').append("Awards : ",data.Awards);
                    $('#mPlot').append("Plot : ",data.Plot);
                    $('#mimdbRating').append("IMDBRating : ",data.imdbRating);
                    $('#mimdbVotes').append("IMDBVotes : ",data.imdbVotes);
                    $('#mimdbID').append("IMDB-id : ",data.imdbID);
                    $('#mType').append("Type : ",data.Type);
                    $('#mDVD').append("DVD : ",data.DVD);
                    $('#mWebsite').append("Website : ",data.Website);
                    $('#mRatings').append("Ratings : ");
                    let l = data.Ratings;
                    for(let ar=0;ar<l.length;ar++)
                    {
                        for(i in l[ar])
                        {
                            $('#mRatings').append(`${i} : ${l[ar][i]}</br>`);
                            console.log(i);
                        }
                    }
                    
                    $('#mBoxOffice').append("BoxOffice : ",data.BoxOffice);
                    $('#mResponse').append("Response : ",data.Response);
                    $('#mMetascore').append("Metascore : ",data.Metascore);

                    
                    $('#displaymovie').show();

                    console.log("done");
 },
            error: (data) => {

                alert("some error occured")

            },

            beforeSend: () => { 

               $('.se-pre-con').show();
                // Wait for window load
                    $(window).load(function() {
        // Animate loader off screen
                     $(".se-pre-con").fadeOut("slow");;
             });

            },
            complete: () => {

               
                alert("data fetched success")
                $('.se-pre-con').hide();

            },
            timeout:3000
        }); // end of AJAX request
 }


//Search movie by all inputs

function byall(title,year,id) {
            $.ajax({
            type: 'GET', // request type GET
            dataType: 'json', // requesting datatype
            url: `https://www.omdbapi.com/?&i=`+id+`&t=`+title+`&y=`+year+`&apikey=8e176998`,
            success: (data) => { 


//Clear the previous search
            clearSearch();
                   


//Pushing Data to html
         if(data.Year == year && data.imdbID == id)
                {
                   console.log(data); 
                    let $err = $(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
                      <strong>${data.Title}</strong>
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>`);
                    $('#error').append($err);


                     

                   if(data.Poster=="N/A")
                    {
                        $('#mPoster').attr("src","images/demo-img.png");
                    }
                    else 
                    {
                        $('#mPoster').attr("src",data.Poster);
                    }

                    $('#mTitle').append("Title : ",data.Title);
                    $('#mReleased').append("Released : ",data.Released);
                    $('#mYear').append("Year : ",data.Year);
                    $('#mActors').append("Actors : ",data.Actors);
                    $('#mDirector').append("Director : ",data.Director);
                    $('#mWriter').append("Writer : ",data.Writer);
                    $('#mGenre').append("Genre : ",data.Genre);
                    $('#mRated').append("Rated : ",data.Rated);
                    $('#mProduction').append("Production : ",data.Production);
                    $('#mRuntime').append("Runtime : ",data.Runtime);
                    $('#mLanguage').append("Language : ",data.Language);
                    $('#mCountry').append("Country : ",data.Country);
                    $('#mAwards').append("Awards : ",data.Awards);
                    $('#mPlot').append("Plot : ",data.Plot);
                    $('#mimdbRating').append("IMDBRating : ",data.imdbRating);
                    $('#mimdbVotes').append("IMDBVotes : ",data.imdbVotes);
                    $('#mimdbID').append("IMDB-id : ",data.imdbID);
                    $('#mType').append("Type : ",data.Type);
                    $('#mDVD').append("DVD : ",data.DVD);
                    $('#mWebsite').append("Website : ",data.Website);
                    $('#mRatings').append("Ratings : ");
                    let l = data.Ratings;
                    for(let j=0;j<l.length;j++)
                    {
                        for(i in l[j])
                        {
                            $('#mRatings').append(`${i} : ${l[j][i]}</br>`);
                            console.log(i);
                        }
                    }
                    
                    $('#mBoxOffice').append("BoxOffice : ",data.BoxOffice);
                    $('#mResponse').append("Response : ",data.Response);
                    $('#mMetascore').append("Metascore : ",data.Metascore);

                    
                    $('#displaymovie').show();

                    console.log("done");
                }
                else
                {
                    let $err = $(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
                      <strong>Please Enter valid year and ID !</strong>
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>`);
                    $('#error').append($err);
                    

                }
               
            },
            error: (data) => { // in case of error response

                alert("some error occured")

            },

            beforeSend: () => { $('.se-pre-con').show();
                // Wait for window load
                    $(window).load(function() {
        // Animate loader off screen
                     $(".se-pre-con").fadeOut("slow");;
             });

            },
            complete: () => {

               
                alert("data fetched success")
                $('.se-pre-con').hide();

            },
            timeout:3000
        }); // end of AJAX request
}
