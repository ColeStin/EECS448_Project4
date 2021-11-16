<?php
    $file = "photos/".$_GET['url']; //gets the url variable from the POST URL
    $fileData = exif_read_data($file); //reads the data into variable so it can be passed

    header("Content-Type: " . $fileData['MimeType']); //headers are needed to pass data, bare minimun is type and size (length)
    header("Content-Length: " . $fileData['FileSize']); //they are set so that the file can be passed correctly

    readfile($file); //sends back img to client to use
    exit;
?>