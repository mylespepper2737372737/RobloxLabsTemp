<?php
require $_SERVER["DOCUMENT_ROOT"] . '/Hexine/api/global_functions.php';
$params = json_decode($_GET['params'], true);
if ($params == false) {
	die("Error: Failed to parse JSON");
}

$GLOBALS['Id'] = $params[0]['userId'];
$user = new UserInf();

//this determines if the thumbnail has finished rendering
if (file_exists($_SERVER['DOCUMENT_ROOT'].'/thumbnails/users/'.$params[0]['userId'])) {
	$isFinal = true;
	//$thumbUrl = 'http://' . $_SERVER['SERVER_NAME'] . '/Game/Tools/Avatar.ashx?userId='.$user->Id;
}else {
	$isFinal = false;
	//$thumbUrl = 'http://' . $_SERVER['SERVER_NAME'] . '/Images/Spinners/ajax_loader_blue_300.gif';
}

$array = array (
  'id' => $user->Id,
  'name' => $user->Name,
  'url' => '/User.aspx?ID='.$user->Id,
  'thumbnailFinal' => $isFinal,
  'thumbnailUrl' => '/Game/Tools/Avatar.ashx?userId='.$user->Id.'&t='.time(),
  'bcOverlayUrl' => MembershipLabel($user->MembershipLevel, 1),
  'substitutionType' => 0
);

header('Content-Type: text/plain');
echo($_GET['jsoncallback'].'(['.json_encode($array, JSON_UNESCAPED_SLASHES).'])');
?>