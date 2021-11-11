//document ready funciton
$(document).ready(function(){
    for (let i = 0; i < 12; i++) {
        generatePost('Fido', 'Fido Breed', "Leslie Knope, ya know, from parks and rec");
      }
});

//generate individual posts of pets
//col-sm-12 col-md-6 col-lg-4 col-xl-3 sizing
//have a picture with height of 200pxs
//have a section for information about pet
function generatePost(name, description, ownerInfo){
    console.log("generating post");
    $("#postContainer").append( `
    <div class='col-sm-12 col-md-6 col-lg-4 col-xl-3'>
        <div class='row postContainer container'>
            <div class='pictureOfPet col-sm-12 col-md-8'>

            </div>
            <div class='petInformation col-sm-12 col-md-4'>
            <!-- this div is for the pets information -->
                <div class='row petDescriptionBox'>
                    <div class='petName'>
                        Name: `+name+`
                    </div>

                    <div class='petDescription'>
                        Description: `+description+`
                    </div>
                    <div class='ownerInfromation'>
                        Owner Information: `+ownerInfo+`
                    </div>
                </div>
            </div>
        </div>

    </div>
    `);


}
