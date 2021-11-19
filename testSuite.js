//this will be the center of the test suite for the code, there will most likely be a testSuite.php file so we can check server relations and SQL connections
//maybe : have a test table to check information flow from the sql db

//this function will run after the "Run Test Suite" button is clicked and will call all the functions corresponding with different
//tests and compile all the results to display in console
$("#runTestSuite").click(function(){
        testSuite();
});

function testSuite() {
        var senddata = createSendData(); //generates data to send to SQL DB
        senddata.imgName = "test.jpg"; //since img name needs to be in the DB table, it adds the name to the send data (goes to SQL call)
        jQuery.ajax({
                type: 'POST',
                url: 'testSuite.php',
                dataType: 'json',
                data: senddata,

                complete: function (response) {
                        testResults = response.responseText;
                        if(testResults.includes("Connection to Server Successful$")) {
                                console.log("Test 1: Attempt to connect to Server: Successful")
                        }
                        else {
                                console.log("Test 1: Attempt to connect to Server: Failed")
                        }

                        if(testResults.includes("Data Transfer to Server Successful$")) {
                                console.log("Test 2: Attempt to transfer data to Server: Successful")
                        }
                        if(testResults.includes("Data Transfer to Server Failed$")) {
                                console.log("Test 2: Attempt to transfer data to Server: Failed")
                        }

                        if(testResults.includes("Data Received from Server$")) {
                                console.log("Test 3: Attempt to receive data from server: Successful")
                        }
                        else {
                                console.log("Test 3: Attempt to receive data from server: Failed");
                        }

                        if(testResults.includes("Connection to Database Successful$")) {
                                console.log("Test 4: Attempt to connect to database: Successful")
                        }
                        if(testResults.includes("Connection to Database Failed$")) {
                                console.log("Test 4: Attempt to connect to database: Failed")
                        }

                        if(testResults.includes("Database Query Successful$")) {
                                console.log("Test 5: Attempt to query database: Successful")
                        }
                        if(testResults.includes("Database Query Failed$")) {
                                console.log("Test 5: Attempt to query database: Failed")
                        }

                        if(testResults.includes("Database Query Returns Correct Value$")) {
                                console.log("Test 6: Check if database query returns correct value: Successful")
                        }
                        else {
                                console.log("Test 6: Check if database query returns correct value: Failed")
                        }
                }
        })
}

//modified version of createSendData in order to create test data without user input
function createTestData(){
        var data = {};
        data.petName = "testName"
        data.petType = "testType"
        data.petBreed = "testType"
        data.petDescription = "testType"
        data.ownerName = "testType"
        data.zipCode = "testType"
        data.contactNumber = "testType"
        data.imgName = "test.jpg";
        return data;
    }

//needed tests:
//  Client/Server relations
// 1. test whether we can communicate with the server
// 2. if able to communicate with server, check if we are able to send a data package
// 3. if able to send data package, check if we are able to recieve data package
//  Server/SQL relations
// 4. call php script to run a connection test on SQL DB
// 5. call php script to run a SQL query if a connection can be established
// 6. call php script to run SQL Query that will return data and try to catch data