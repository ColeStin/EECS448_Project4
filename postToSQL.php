<?php
    echo "creating post";
    $petName = $_POST['petName'];
    $petType = $_POST['petType'];
    $petBreed = $_POST['petBreed'];
    $description = $_POST['petDescription'];
    $ownerName = $_POST['ownerName'];
    $zipCode = $_POST['zipCode'];
    $ContactNumber = $_POST['contactNumber'];
    $portrait = $_POST['imgName'];

    $serverName = "s21.winhost.com";
    $connection_info = array("Database"=>"DB_147588_findlostpets", "UID"=>"DB_147588_findlostpets_user", "PWD"=>"5@PitU9!8!ua3!f");
    $conn = sqlsrv_connect($serverName, $connection_info);
    if($conn){
        $sql = "
           INSERT INTO Pet (petName, petType, petBreed, description, ownerName, zipCode, ContactNumber, portrait)
           VALUES('".$petName."','".$petType."','".$petBreed."','".$description."','".$ownerName."','".$zipCode."','".$ContactNumber."','".$portrait."');";
            $sqlCall = sqlsrv_query($conn, $sql);
    }
    else{
        echo "connection unsuccessful";
    }

    sqlsrv_close($conn);
    exit;
?>