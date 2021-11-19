<?php
    echo "creating post"; //so the code/client knows this funtion was called correctly
    $petName = $_POST['petName']; 
    $petType = $_POST['petType'];
    $petBreed = $_POST['petBreed'];
    $description = $_POST['petDescription'];
    $ownerName = $_POST['ownerName'];
    $zipCode = $_POST['zipCode'];
    $ContactNumber = $_POST['contactNumber'];
    $portrait = $_POST['imgName'];
    $dateLost = $_POST['dateLost'];
    echo $dateLost;
    //after all variables are set, the server information is specified to connect to DB
    $serverName = "s21.winhost.com";
    $connection_info = array("Database"=>"DB_147588_findlostpets", "UID"=>"DB_147588_findlostpets_user", "PWD"=>"5@PitU9!8!ua3!f");
    $conn = sqlsrv_connect($serverName, $connection_info); //a connection is established
    if($conn){ //if there is a connection, it crafts a SQL query and posts it to the DB
        $sql = "   
           INSERT INTO Pet (petName, petType, petBreed, description, ownerName, zipCode, ContactNumber, portrait, dateLost)
           VALUES('".$petName."','".$petType."','".$petBreed."','".$description."','".$ownerName."','".$zipCode."','".$ContactNumber."','".$portrait."', '".$dateLost."');";
           echo $sql;
            $sqlCall = sqlsrv_query($conn, $sql);
    }
    else{ //if there is not a connection
        echo "connection unsuccessful";
    }

    sqlsrv_close($conn); //closes the connection
    exit;
?>