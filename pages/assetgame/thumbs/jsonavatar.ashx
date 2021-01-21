<?php
require $_SERVER["DOCUMENT_ROOT"] . '/Hexine/api/global_functions.php';
require $_SERVER["DOCUMENT_ROOT"] . '/Hexine/api/RCC/thumbnailers.php';

if ($_GET['userId'] == null) {
	die("Error: Invalid request");
}
$user = $database->findRow("public_users", ["Id" => $_GET['userId']], ["Id"]);
if ($user && $user->rowCount() > 0){
	$user = $user->fetch(PDO::FETCH_OBJ);
}else {
	die("Error: User does not exist");
}

$subType = 0;
//this determines if the thumbnail has finished rendering
if (file_exists($_SERVER['DOCUMENT_ROOT'].'/thumbnails/users/'.$_GET['userId'])) {
	$Final = true;
}else {
	/*if (renderAvatar($_GET['userId']) == true) {
		$subType = 1;
	}*/
	file_get_contents('http://' . $_SERVER['SERVER_NAME'] . '/Game/Tools/Avatar.ashx?userId=' . $_GET['userId'].'&t='.time());
	$Final = false;
}

$array = array (
  'Url' => '/Game/Tools/Avatar.ashx?userId='.$_GET['userId'].'&t='.time(),
  'Final' => $Final,
  'SubstitutionType' => $subType
);

header('Content-Type: text/plain');
echo(json_encode($array, JSON_UNESCAPED_SLASHES));
?>