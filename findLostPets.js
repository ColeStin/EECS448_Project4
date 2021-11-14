//document ready funciton
$(document).ready(function(){
    //loadPage();
    $("#exampleModal").modal("toggle");
    $('.animalType').select2({
        placeholder : {
            id: '-1',
            text: 'Select Animal Type'
          },
        width : "100%"

    });

    $("#createPost").click(function(){
        createSendData();
    });
});

function loadPage(){
    $.ajax({
        url:'call.php',
        type: 'POST',
        datatype: "json",
        data: {'function': 'getContentsOfPage'},
        complete: function (response) {
            console.log("here")
            recieveData = JSON.parse(response.responseText)
            console.log(recieveData)
            Object.keys(recieveData).forEach(key => {
                var row = recieveData[key]
                generatePost(row.petName,row.petType.trim(), row.petBreed.trim(), row.description, row.ownerName, row.zipCode, row.ContactNumber)
              });
        },
        error: function () {
            console.log("error")
        }
    });
}

//generate individual posts of pets
//col-sm-12 col-md-6 col-lg-4 col-xl-3 sizing
//have a picture with height of 200pxs
//have a section for information about pet
function generatePost(petName, petType, petBreed, description, ownerName, zipCode, contactNumber){
    console.log("generating post");
    $("#postContainer").append( `
    <div class='col-sm-12 col-md-6 col-xl-4'>
        <div class='row postContainer container'>
            <div class='portrait col-sm-12 col-md-8'>
            <img src="getPhoto.php?url=`+petName+contactNumber+`.jpg" alt="`+petName+contactNumber+`" id="`+petName+contactNumber+`">
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
    `);


}

function createPost(sendPacket, imgName){
    console.log('creating post');
    var senddata = createSendData();
    //calls and inputs photo to files system
    $.ajax({
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
    })
}

function createSendData(){
    var data = {};
    data.petName = $("#petName").val();
    data.petType = $("#animalType").select2('data').id;
    data.petBreed = $("#petBreed").val();
    data.petDescription = $("#petDescription").val();
    data.ownerName = $("#ownerName").val();
    data.zipCode = $("#zipCode").val();
    data.contactNumber = $("#contactNumber").val();
    console.log(data)

}

$("#img").change(function() {
    console.log(this.files[0])
    $("#imagePreview").removeClass('d-none');
    img_data = new FormData();
    img_data.append("file", this.files[0])
    console.log(img_data)
    createPost(img_data, this.files[0].name);
    console.log(newIMG);
  });
  
