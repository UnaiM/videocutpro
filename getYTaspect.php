<?php

header('content-type: text/plain');
$uPixels = 0;
$uAspect = 0;
$adaptive_fmts = '';
$size = '';
parse_str(file_get_contents('http://youtube.com/get_video_info?video_id=' . $_GET['id']));
foreach (explode(',', $adaptive_fmts) as $fmt) {
  parse_str($fmt);
  $uSize = explode('x', $size);
  if (count($uSize) >= 2) {
    $uPix = $uSize[0] * $uSize[1];
    if ($uPix > $uPixels) {
      $uPixels = $uPix;
      $uAspect = $uSize[0] / $uSize[1];
    }
  }
}
echo $uAspect;

?>
