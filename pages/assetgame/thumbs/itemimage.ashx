<?php
require $_SERVER["DOCUMENT_ROOT"] . '/Hexine/api/global_functions.php';
$params = json_decode($_GET['params'], true);
if ($params == false) {
	die("Error: Failed to parse JSON");
}

header('Content-Type: text/plain');
$sizes = array(
	"small"  => 0,
	""  => 1,
	"big"  => 2
);
$list = $_GET['jsoncallback'].'([';
$count = count($params);
for($i = 0; $i < $count; ++$i) {
	$item = $itemApi->GetAssetInfo($params[$i]['assetId'], false, true);
	//sets the thumbnail url based on the isStatic parameter. This really saves on load time for the catalog.
	//this determines if the thumbnail has finished rendering
	if (file_exists($_SERVER['DOCUMENT_ROOT'].'/thumbnails/assets/'.$params[$i]['assetId']) or isset($item['TargetId'])) {
		if ($params[$i]['isStatic'] == 1) {
			$thumbnailUrl = '/thumbnails/assets/'.$params[$i]['assetId'];
		}
		else
		{
			$thumbnailUrl = $item['ThumbnailUrl'];
		}
		$isFinal = true;
	}else {
		//$thumbnailUrl = 'http://'.$_SERVER['SERVER_NAME'].'/Game/Tools/ThumbnailAsset.ashx?aid='.$params[$i]['assetId'].'&fmt=png&wd=320&ht=320';
		$thumbnailUrl = $item['ThumbnailUrl'];
		$isFinal = false;
	}
	
	if (isset($renderExclusions[$item['AssetTypeId']]) /*or file_get_contents('http://'.$_SERVER['SERVER_NAME'].'/thumbnails/assets/'.$params[$i]['assetId']) == file_get_contents('http://'.$_SERVER['SERVER_NAME'].'/thumbs/invisible.png')*/){
		//if the item shouldn't be rendered or didn't render properly, display its 2D counterpart
		if (isset($imageRenders[$item['AssetTypeId']])) {
			$thumbnailUrl = '/Asset?id='.$params[$i]['assetId'];
		}elseif (isset($renderIcons[$item['AssetTypeId']])) {
			$thumbnailUrl = $renderIcons[$item['AssetTypeId']];
		}else {
			$thumbnailUrl = '/Thumbs/unknown.png';
		}
		$isFinal = true;
	}
	
	if ($params[$i]['noOverlays'] == true) {
	$array = array (
		'id' => $item['AssetId'],
		'name' => $item['Name'],
		'url' => '/Item.aspx?id='.$params[$i]['assetId'],
		'thumbnailFinal' => $isFinal,
		'thumbnailUrl' => $thumbnailUrl,
		'bcOverlayUrl' => null,
		'limitedOverlayUrl' => null,
		'deadlineOverlayUrl' => null,
		'limitedAltText' => null,
		'newOverlayUrl' => null,
		'imageSize' => $sizes[$params[$i]['imageSize']],
		'saleOverlayUrl' => null,
		'iosOverlayUrl' => null,
		'transparentBackground' => true
	);
	}else {
	$array = array (
		'id' => $item['AssetId'],
		'name' => $item['Name'],
		'url' => '/Item.aspx?id='.$params[$i]['assetId'],
		'thumbnailFinal' => $isFinal,
		'thumbnailUrl' => $thumbnailUrl,
		'bcOverlayUrl' => MembershipLabel($item['MinimumMembershipLevel'], $sizes[$params[$i]['imageSize']]),
		'limitedOverlayUrl' => overlayUrlDependent($item['IsLimited'], 'limited', $sizes[$params[$i]['imageSize']]),
		'deadlineOverlayUrl' => overlayUrlDependent(0, 'deadline', $sizes[$params[$i]['imageSize']]), //This will probably remain unused
		'limitedAltText' => $item['Remaining'].' remaining',
		'newOverlayUrl' => overlayUrlDependent($item['IsNew'], 'new', $sizes[$params[$i]['imageSize']]),
		'imageSize' => $sizes[$params[$i]['imageSize']],
		'saleOverlayUrl' => overlayUrlDependent(0, 'new', $sizes[$params[$i]['imageSize']]), //This too will remain unused
		'iosOverlayUrl' => overlayUrlDependent(0, 'new', $sizes[$params[$i]['imageSize']]), //So will this if I decide not to make a mobile client
		'transparentBackground' => true
	);
	}
	if ($i !== 0) {
		$list = $list . ',';
	}
	$json = json_encode($array, JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
	$json = str_replace('"null"', 'null', $json);
	$list = $list.$json;
}
echo($list . '])');
?>