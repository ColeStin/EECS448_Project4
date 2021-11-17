//document ready funciton
$(document).ready(function(){
    loadPage();
    //$("#postModal").modal("toggle");
    //this is the generation of the select2 statment that is the PET TYPE select on the make a post modal
    $('.animalType').select2({
        placeholder : {
            id: '-1',
            text: 'Select Animal Type'
          },
        width : "100%" //100% width of parent object
    });

});

function loadPage(){
    //ajax call to get contents of page
    $.ajax({
        url:'call.php',
        type: 'POST',
        datatype: "json",
        data: {'function': 'getContentsOfPage'}, //specifies which function is to be used in the call.php file
        complete: function (response) { //catches the response of the server
            recieveData = JSON.parse(response.responseText) //parses JSON data from server
            Object.keys(recieveData).forEach(key => { //goes through each row and extracts the row, then sends it to the generate post function
                var row = recieveData[key]
                generatePost(row.petName,row.petType.trim(), row.petBreed.trim(), row.description, row.ownerName, row.zipCode, row.ContactNumber, row.portrait)
              });
        },
        error: function (response) {
            console.log(response) //if the server cannot complete something and throws something back, it will display
        }
    });
}

//generate individual posts of pets
//col-sm-12 col-md-6 col-xl-4 sizing
//have a picture with height of 200pxs
//have a section for description about pet
//have contact information
function generatePost(petName, petType, petBreed, description, ownerName, zipCode, contactNumber, portrait){    //takes every attribute displayed. 
                                                                                                                //will generate a singular post in the postContainer div
    console.log("generating post");
    $("#postContainer").append( `
    <div class='col-sm-12 col-md-6 col-xl-4'>
        <div class='row postContainer container'>
            <div class='portrait col-sm-12 col-md-8'>
            <img src="getPhoto.php?url=`+portrait+`" alt="`+portrait+`" id="`+portrait+`"> 
            </div>
            <div class='petInformation col-sm-12 col-md-4'>
            <!-- this div is for the pets information -->
                <div class='row petDescriptionBox'>
                    <div class='petName'>
                        Name: `+petName+`
                    </div>
                    <div class='petType'>
                        Type: `+petType+`
                    </div>
                    <div class='petBreed'>
                        Breed: `+petBreed+`
                    </div>
                    <div class='petDescription'>
                        Description: `+description+`
                    </div>
                    <div class='ownerInfromation'>
                        Owner Information: <br> `+ownerName+`<br>`+contactNumber+`<br>`+zipCode+`<br>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `); //line generation of <img> tag gets a photo by calling getPhoto.php function and sends the variable url with the portraits extension
        // server will send back image to webpage for image to be displayed at correct placement


}

//this function takes in the img name and the sendPacket for the image 
//it makes 2 seperate ajax calls, one that will post the image to the server
//another that posts information to the SQL DB
function createPost(sendPacket, imgName){
    console.log('creating post');
    var senddata = createSendData(); //generates data to send to SQL DB
    senddata.imgName = imgName; //since img name needs to be in the DB table, it adds the name to the send data (goes to SQL call)
    //calls and inputs photo to files system
    $("#createPost").click(function(){ //the packages are only send when the user presses "submit" button because this function is ran every time an image is submitted
        console.log("creating post to click")
        if(goodToSendData()){ //function to check and make sure data is good to send
            console.log("sending data is good");
            $.ajax({ //this is to upload the photo individually
                url:'uploadPhoto.php',
                type: 'POST',
                datatype: "script",
                contentType: false, 
                cache: false,
                processData: false,
                data: sendPacket,
                complete: function (response) {
                    console.log(response);
                },
                error: function () {
                    console.log("error")
                }
            });
            $.ajax({ //this is to upload the data of the post 
                url:'postToSQL.php',
                type: 'POST',
                datatype: "json",
                data: senddata,
                complete: function (response) {
                    $("#postModal").modal("toggle"); //only after the information is accepted and the server does not have an issue with the data does the modal close
                },
                error: function () {
                    alert("there was an issue with posting this information")
                }
            });
        }
    });
    
    
}

//this function creates a dictionary to send to the server of information that will be posted to the DB
//it will return a dictionary with all information availible
function createSendData(){
    var data = {};
    data.petName = $("#petName").val();
    data.petType = $('#animalType :selected').text();
    data.petBreed = $("#petBreed").val();
    data.petDescription = $("#petDescription").val();
    data.ownerName = $("#ownerName").val();
    data.zipCode = $("#zipCode").val();
    data.contactNumber = $("#contactNumber").val();
    data.imgName = ""; //need to have a present key because after returning the dictionary
    console.log(data); //to verify the data is send correctly
    return data;
}

//this function checks to make sure all vital data (to make a post/be a useful post) pulled from the form is valid
function goodToSendData(){
    //returns true if the data is good and false if the data is bad
    if($("#petName").val() == ""){
        return false;
    }
    if($("#animalType").select2('data').id == ""){
        return false;
    }
    if($("#petBreed").val() == ""){
        return false;
    }
    if($("#contactNumber").val() == ""){
        return false;
    }
    return true;
}


//this function is called when an image is uploaded to the form, it will start the process of being able to create a post
//it takes the image data and creates a new FormData object to store the img and send to the server, 
$("#img").change(function() {
    console.log(this.files[0])
    $("#imagePreview").removeClass('d-none');
    img_data = new FormData();
    img_data.append("file", this.files[0])
    console.log(img_data)
    createPost(img_data, this.files[0].name); //sends the img object and the image name to the create post function
  });
  
//this function simply allows for the user to open the modal and use it with a fresh start (clears the form and toggles it to show state)
function startCreatingPost(){
    $("#petName").val("");
    $("#animalType").val('cat').change(); //resets petType to Cat (default)
    $("#petBreed").val("");
    $("#petDescription").val("");
    $("#ownerName").val("");
    $("#zipCode").val("");
    $("#contactNumber").val("");
    $("#img").val("")
    $("#postModal").modal("toggle");
}