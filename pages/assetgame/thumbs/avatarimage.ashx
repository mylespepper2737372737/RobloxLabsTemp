<?php
require $_SERVER['DOCUMENT_ROOT'].'/global.php';
header("content-type: application/json");

if(!isset($_GET['jsoncallback']) || !isset($_GET['params'])){ die("Error: Failed to parse JSON"); }

$callback = $_GET['jsoncallback'];
$params = json_decode($_GET['params']);

$dataToReturn = [];

foreach ($params as $avatarimg)
{
  $userinfo = getUserInfoFromUid($avatarimg->userId);
  if(!$userinfo){ $userId = 0; $userName = "Error"; $membershipLevel = 0; }
  else{ $userId = $userinfo->Id; $userName = $userinfo->Name; $membershipLevel = $userinfo->MembershipLevel; }

  $avatarinfo = 
  [
    'id' => $userId,
    'name' => $userName,
    'url' => '/User.aspx?ID='.$userId,
    'thumbnailFinal' => file_exists($_SERVER['DOCUMENT_ROOT'].'/thumbnails/users/'.$userId),
    'thumbnailUrl' => '/Game/Tools/Avatar.ashx?userId='.$userId.'&t='.time(),
    'bcOverlayUrl' => MembershipLabel($membershipLevel, ($avatarimg->imageSize == 'custom') ? "medium" : $avatarimg->imageSize),
    'substitutionType' => 0
  ];

  array_push($dataToReturn, $avatarinfo);
}

echo($callback.'('.json_encode($dataToReturn, JSON_UNESCAPED_SLASHES).')');