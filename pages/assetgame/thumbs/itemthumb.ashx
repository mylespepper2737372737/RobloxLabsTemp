<?php
require $_SERVER["DOCUMENT_ROOT"] . '/Hexine/api/global_functions.php';

if ($_GET['assetId'] == null) {
	die("Error: Invalid request");
}

//$item = json_decode(file_get_contents("http://" . $_SERVER['SERVER_NAME'] . "/AssetInfo?id=".$_GET['assetId']."&rbxAsset=1"), true);
$asset = $itemApi->GetAssetInfo($assetId, false, true);
?>
<div id="Asset<?=$_GET['assetId']?>" class="thumbnail-holder" data-reset-enabled-every-page="" data-url="/thumbs/itemthumb.ashx?assetId=<?=$item['AssetId']?>" style="width:352px; height:352px;">
    <span class="thumbnail-span" data-retry-url="/thumbs/jsonavatar.ashx?userId=<?=$item['AssetId']?>" style="width:inherit; height:inherit;">
		<img style="width:inherit; height:inherit;" />
	</span>
	<span class="thumbnail-span-original hidden" data-orig-retry-url="/thumbs/itemthumb.ashx?assetId=<?=$item['AssetId']?>" ><img alt='<?=$item['Name']?>' class='' src='/Game/Tools/ThumbnailAsset.ashx?aid=<?=$item['AssetId']?>&fmt=png&wd=420&ht=420?>'/></span>

    <!--span class="enable-three-dee btn-control btn-control-lg">3D</span-->
</div>
