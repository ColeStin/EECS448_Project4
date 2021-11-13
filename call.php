<?php
    $funciton = $_POST['function'];
    if($funciton=="getContentsOfPage"){
        getContentsOfPage();
    }
    else if($function == "getPhoto"){
        getPhoto($_POST['photoURL']);
    }


    function getContentsOfPage(){
        $serverName = "s21.winhost.com";
        $connection_info = array("Database"=>"DB_147588_findlostpets", "UID"=>"DB_147588_findlostpets_user", "PWD"=>"5@PitU9!8!ua3!f");
        $conn = sqlsrv_connect($serverName, $connection_info);
        if($conn){
            $sql = "
            SELECT TOP (5) [petName]
                ,[petType]
                ,[petBreed]
                ,[description]
                ,[ownerName]
                ,[zipCode]
                ,[ContactNumber]
            FROM [DB_147588_findlostpets].[dbo].[Pet]
            ";
            $sqlCall = sqlsrv_query($conn, $sql);
            
            $rows = [];
            while($row = sqlsrv_fetch_array($sqlCall))
            {
                $rows[] = $row;
            }
            echo json_encode($rows);
        }
        else{
            echo "connection unsuccessful";
        }
        

        sqlsrv_close($conn);
    }
?>