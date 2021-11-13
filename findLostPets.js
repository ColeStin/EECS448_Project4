//document ready funciton
$(document).ready(function(){
    loadPage()
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
    <div class='col-sm-12 col-md-6'>
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