<?php
    $funciton = $_POST['function']; //gets type of function that is specified
    if($funciton=="getContentsOfPage"){
        getContentsOfPage(); //calls getContentsOfPage is called if 
    }


    function getContentsOfPage(){
        $serverName = "s21.winhost.com"; //connection information is crafted
        $connection_info = array("Database"=>"DB_147588_findlostpets", "UID"=>"DB_147588_findlostpets_user", "PWD"=>"5@PitU9!8!ua3!f");
        $conn = sqlsrv_connect($serverName, $connection_info); //a connection to DB is established
        if($conn){ //if there is a connection
            $sql = "
            SELECT [petName]
                ,[petType]
                ,[petBreed]
                ,[description]
                ,[ownerName]
                ,[zipCode]
                ,[ContactNumber]
                ,[portrait]
                ,[dateLost]
            FROM [DB_147588_findlostpets].[dbo].[Pet]
            "; //the sql query is always the same when getting post information
            $sqlCall = sqlsrv_query($conn, $sql); //posts the query to DB
            
            $rows = []; //predefines a variable that it will send back to the client
            while($row = sqlsrv_fetch_array($sqlCall)) //this will get every row of the sql return statement individually
            {
                $rows[] = $row; //adds the row to the variable that will be sent
            }
            echo json_encode($rows);
        }
        else{ //if there is no connection
            echo "connection unsuccessful";
        }
        

        sqlsrv_close($conn); //closes connection
        exit;
    }
?>