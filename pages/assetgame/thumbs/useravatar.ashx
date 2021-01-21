<?php
require $_SERVER["DOCUMENT_ROOT"] . '/Hexine/api/private/database.php';
if ($_GET['userId'] == null) {
	die("Error: Invalid request");
}
$user = $database->findRow("public_users", ["Id" => $_GET['userId']], ["Id"]);
if ($user && $user->rowCount() > 0){
	$user = $user->fetch(PDO::FETCH_OBJ);
}else {
	die("Error: User does not exist");
}
?>
<div id="UserAvatar" class="thumbnail-holder" data-reset-enabled-every-page="" data-3d-thumbs-enabled="" data-url="/thumbs/useravatar.ashx?userId=<?=$user->Id?>" style="width:352px; height:352px;">
    <span class="thumbnail-span" data-retry-url="/thumbs/jsonavatar.ashx?userId=<?=$user->Id?>" style="width:inherit; height:inherit;">
		<img style="width:inherit; height:inherit;" />
	</span>
	<span class="thumbnail-span-original hidden" data-3d-url="/avatar-thumbnail-3d/json?userId=<?=$user->Id?>" data-orig-retry-url="/thumbs/useravatar.ashx?userId=<?=$user->Id?>" ><img alt='<?=$user->Name?>' class='' src='/Game/Tools/Avatar.ashx?userId=<?=$user->Id."&t=".time()?>'/></span>

    <!--span class="enable-three-dee btn-control btn-control-lg">3D</span-->
</div>
