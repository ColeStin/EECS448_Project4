//this will be the center of the test suite for the code, there will most likely be a testSuite.php file so we can check server relations and SQL connections
//maybe : have a test table to check information flow from the sql db

//this function will run after the "Run Test Suite" button is clicked and will call all the functions corresponding with different
//tests and compile all the results to display in console
$("#runTestSuite").click(function(){

});

//needed tests:
//  Client/Server relations
// 1. test whether we can communicate with the server
// 2. if able to communicate with server, check if we are able to send a data package
// 3. if able to send data package, check if we are able to recieve data package
//  Server/SQL relations
// 4. call php script to run a connection test on SQL DB
// 5. call php script to run a SQL query if a connection can be established
// 6. call php script to run SQL Query that will return data and try to catch data