<?php
    $file = "photos/".$_GET['url'];
    $fileData = exif_read_data($file);

    header("Content-Type: " . $fileData['MimeType']);
    header("Content-Length: " . $fileData['FileSize']);

    readfile($file)
?>