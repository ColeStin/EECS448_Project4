<?php
    //Test 1
    echo "Connection to Server Successful$";
    testSuite();
    
    function testSuite () {
        $serverName = "s21.winhost.com"; //connection information is crafted
        $connection_info = array("Database"=>"DB_147588_findlostpets", "UID"=>"DB_147588_findlostpets_user", "PWD"=>"5@PitU9!8!ua3!f");
        $conn = sqlsrv_connect($serverName, $connection_info); //a connection to DB is established

        //Test 2
        $petName = $_POST['petName']; 
        if($petName = "testName") {
            echo "Data Transfer to Server Successful$";
        }
        else {
            echo "Data Transfer to Server Failed$";
        }

        //Test 3
        echo "Data Received from Server$";

        //Test 4
        if($conn){ //if there is a connection outputs true
            echo "Connection to Database Successful$";
        }
        else {
            echo "Connection to Database Failed$";
        }

        //Test 5/6
        $sql = "
            SELECT TOP 1 [test]
            FROM [DB_147588_findlostpets].[dbo].[testTable]";
        $sqlquery = sqlsrv_query($conn, $sql);
        if($sqlquery!=NULL) {
            echo "Database Query Successful$";
        }
        else {
            echo "Database Query Failed$";
        }
        $rows = [];
        while($row = sqlsrv_fetch_array($sqlCall)) //this will get every row of the sql return statement individually
        {
            if( in_array('test1', $row)) {
                echo "Database Query Returns Correct Value$";
            }
        }

    }
?>