<?php
//checks if the file has any errors, and if it does, returns error code
    if ( 0 < $_FILES['file']['error'] ) {
        echo 'Error: ' . $_FILES['file']['error'] . '<br>';
    }
    else {
        //if file has no errors, it takes the files sent, gets the file path and saves to the extension specified
        move_uploaded_file($_FILES['file']['tmp_name'], 'photos/' . $_FILES['file']['name']);
        echo "file moved";
    }
    exit;

?> 