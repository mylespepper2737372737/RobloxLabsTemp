<?php
include_once $_SERVER["DOCUMENT_ROOT"] . '/global.php';

if(isset($_GET['ID']) || isset($_GET['id']))
{ 
    $selfProfile = false; 
    $profileInfo = getUserInfoFromUid($_GET['ID']);
    if(!$profileInfo){ $profileInfo = getUserInfoFromUid($_GET['id']); }
    $userPronoun = $profileInfo->Name." does";
    $addressUserAs = $profileInfo->Name."'s";
}
elseif(isset($_GET['UserName']))
{
    $selfProfile = false; 
    $profileInfo = getUserInfoFromName($_GET['UserName']);
    $userPronoun = $profileInfo->Name." does";
    $addressUserAs = $profileInfo->Name."'s";
}
else
{ 
    requireLogin();
    $selfProfile = true; 
    $profileInfo = getUserInfoFromUid(SESSION["userid"]); 
    $userPronoun = "You do";
    $addressUserAs = "Your";
}

if(!$profileInfo){ die(header("Location: /RobloniumDefaultErrorPage.aspx?code=404")); }

$friends = $pdo->prepare("SELECT COUNT(*) FROM friends WHERE (requesterid = :id OR receiverid = :id2) AND status = 1");
$friends->bindParam(":id", $profileInfo->Id, PDO::PARAM_INT);
$friends->bindParam(":id2", $profileInfo->Id, PDO::PARAM_INT);
$friends->execute();
$friendCount = $friends->fetchColumn();

$friends = $pdo->prepare("SELECT * FROM friends WHERE (requesterid = :id OR receiverid = :id2) AND status = 1 LIMIT 6");
$friends->bindParam(":id", $profileInfo->Id, PDO::PARAM_INT);
$friends->bindParam(":id2", $profileInfo->Id, PDO::PARAM_INT);
$friends->execute();

if(!SESSION || (defined('SESSION') && checkIfFriends(SESSION["userid"], $profileInfo->Id) || SESSION["userid"] == $profileInfo->Id)){ $canSendFR = false; } else { $canSendFR = true; }

$gamesQuery = $pdo->prepare("SELECT * FROM asset WHERE AssetTypeId = 9 AND CreatorId = :id");
$gamesQuery->bindParam(":id", $profileInfo->Id, PDO::PARAM_INT);
$gamesQuery->execute();

// bundle: page___5497acb8bcc6785c0722e3451e13c572_m
$page_config["ScriptIncludes"] = 
[
	$page_config["DefaultScriptBundles"]["master"],
	"/js/modules/jQuery.js",
	"/js/modules/Widgets/DropdownMenu.js",

	"/js/GPTAdScript.js",
	"/js/jquery.simplemodal-1.3.5.js",
	"/js/GenericModal.js",
	"/js/DataPager.js",
	"/js/Sets/SetsPane.js",
	"/js/extensions/string.js",
	"/js/accordion.js",
	"/js/UserPlacesPane.js",
	"/js/ItemPurchase.js",
	"/js/modules/Widgets/ItemImage.js",
	"/js/UserAssetsPane.js",
	"/js/CreateSetPanel.js",
	"/js/GenericConfirmation.js",

	"/js/PlaceProductPromotion.js",
	"/js/GamePass.js",
	"/js/VotingPanel.js",
	"/js/jquery.dotdotdot-1.5.7-packed.js",
	"/js/widgets/Favorites.js",
	"/js/NewGamePage.js",
	"/js/modules/Widgets/AvatarImage.js",
	"/js/LaunchApp.js",
	"/js/fileUploadUnsupported.js",
	"/js/CommentsPane.js",
	"/js/SuperSafePrivacyIndicator.js",

	// for the accordion
	"/js/jquery/jquery-ui-1.9.2.min.js",

  // for friends
  "/js/Friends.js"
];
$page_config["CSSIncludes"] = [
	//$page_config["DefaultStyleBundles"]["main"],
	"/CSS/Pages/RobloxUI.css",
	"/CSS/Pages/User/UserPane.css",
	"/CSS/Pages/Profile/Profile.css",
	//"/CSS/PartialViews/Navigation.css",
	"/CSS/Base/CSS/Ads.css",
	"/CSS/Pages/Badges/Badges.css",
	"/CSS/Pages/Inventory/Inventory.css"
];

require $_SERVER["DOCUMENT_ROOT"] . "/puzzle/Top.php";

?>

<style type="text/css">
  #Body {
  padding: 10px;
  }
</style>
<div>
  <?php if($selfProfile) { ?>
  <div id="ctl00_cphRoblox_rbxHeaderPane_statusBox" class="blank-box" style="width:951px; padding: 8px;word-wrap: break-word;display:block;">
    <span style="font-size:12px;color: #888;word-wrap: normal;">
      Right now I'm:
    </span> &nbsp;&nbsp;
    <span id="ctl00_cphRoblox_rbxHeaderPane_statusRegion" style="font-size:14px;" class="notranslate"><i>"Playing Roblox"</i></span>&nbsp;&nbsp;
    <a href="UserControls/#" id="ctl00_cphRoblox_rbxHeaderPane_updateStatusLink" style="font-size:14px;word-wrap:normal;display:block;" onclick="if (!window.__cfRLUnblockHandlers) return false; document.getElementById('updateStatusBox').style.display='block';document.getElementById('ctl00_cphRoblox_rbxHeaderPane_updateStatusLink').style.display='none'; return false;">&gt; Update My Status</a>
    <div id="updateStatusBox" style="display:none;">
      <input type="text" style="visibility:hidden;position:absolute">
        <span style="position:relative">
        <input name="ctl00$cphRoblox$rbxHeaderPane$txtStatusMessage" type="text" id="ctl00_cphRoblox_rbxHeaderPane_txtStatusMessage" style="margin-bottom:5px;width:560px;height:17px;" maxlength="254" value="Playing Roblox">&nbsp;&nbsp;
      </span>
      <input type="submit" name="ctl00$cphRoblox$rbxHeaderPane$btnUpdateStatus" value="Save" onclick="if (!window.__cfRLUnblockHandlers) return false; javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$cphRoblox$rbxHeaderPane$btnUpdateStatus&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, false))" id="ctl00_cphRoblox_rbxHeaderPane_btnUpdateStatus" class="translate">&nbsp;<input type="button" value="Cancel" onclick="if (!window.__cfRLUnblockHandlers) return false; document.getElementById('updateStatusBox').style.display='none';document.getElementById('ctl00_cphRoblox_rbxHeaderPane_updateStatusLink').style.display='inline';" <br="">
    </div>
  </div>
  <?php } else { ?>
  <div style="width:900px;height:30px;clear:both; display:none;">
    <span id="ctl00_cphRoblox_rbxHeaderPane_nameRegion" style="font-size:20px; font-weight:bold;"><?=$profileInfo->Name?></span>
  </div>
  <?php } ?>
  <div style="clear: both; margin: 0; padding: 0;">
  </div>
  <!--[if IE 6]>
  <table>
    <tr>
      <td width="450px" valign="top">
        <![endif]-->
        <div class="divider-right" style="width: 484px; float: left">
          <h2 class="title">
            <span id="ctl00_cphRoblox_rbxUserPane_lUserRobloxURL"><?=$addressUserAs?> Profile</span>
          </h2>
          <div class="divider-bottom" style="position: relative;z-index:3;padding-bottom: 20px">
            <div style="width: 100%">
              <div id="ctl00_cphRoblox_rbxUserPane_onlineStatusRow">
                <div style="text-align: center;">
                  <span id="ctl00_cphRoblox_rbxUserPane_lUserOnlineStatus" class="UserOfflineMessage">[ Offline ]</span>
                  <br>
                  <a href="/User.aspx?ID=<?=$profileInfo->Id?>">http://<?=$_SERVER['HTTP_HOST']?>/User.aspx?ID=<?=$profileInfo->Id?></a>
                </div>
              </div>
              <div>
                <div>
                  <center>
                    <div style="margin-bottom: 10px;">
                    </div>
                    <a id="ctl00_cphRoblox_rbxUserPane_AvatarImage" disabled="disabled" class=" notranslate" title="<?=$profileInfo->Name?>" class=" notranslate" onclick="return false" style="display:inline-block;height:200px;width:200px;">
                      <div class="roblox-avatar-image image-medium" data-user-id="<?=$profileInfo->Id?>" data-image-size="custom" data-image-size-x="200" data-image-size-y="200" data-no-click="true" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="<?=$profileInfo->Name?>"></div>
                    </a>
                    <br>
                    <div class="UserBlurb" style="margin-top: 10px; overflow-y: auto; max-height: 450px; ">
                      <?=htmlspecialchars($profileInfo->Bio)?>
                    </div>
                    <div id="ProfileButtons" style="<?php if($selfProfile) { echo "display: none; "; }?>margin: 10px auto; width: 256px;">
                      <?php if(!$selfProfile) { ?>
                      <?php if(SESSION &&checkIfFriends(SESSION["userid"], $profileInfo->Id, 2)){ ?>
                      <div class="dropdown">
                        <a id="FriendButton" class="GrayButton button">Friend Options</a>
                        <ul class="dropdown-list">
                          <li>
                            <a class="add-best-friend" data-target-user-id="<?=$profileInfo->Id?>" data-view="Friends" data-page-num="1" data-displayed-user-id="<?=SESSION["userid"]?>">Add Best Friend</a>
                          </li>
                          <li>
                            <a class="remove-friend" data-target-user-name="<?=$profileInfo->Name?>" data-target-user-id="<?=$profileInfo->Id?>" data-view="Friends" data-page-num="1" data-displayed-user-id="<?=SESSION["userid"]?>">Remove Friend</a>
                          </li>
                        </ul>
                      </div>
                      <?php } else { ?>
                      <a id="FriendButton" class="GrayButton <?php if(!$canSendFR){ echo "Disabled"; } ?>" <?php if($canSendFR){ echo 'href="/My/FriendInvitation.aspx?RecipientID='.$profileInfo->Id.'"'; } ?>>Send Friend Request</a>
                      <?php } ?>
                      <div class="SendMessageProfileBtnDiv">
                        <a id="MessageButton" style="margin:0 5px" class="GrayButton " href="/My/PrivateMessage.aspx?RecipientID=<?=$profileInfo->Id?>">Send Message</a>
                      </div>
                      <div class="clear"></div>
                      <script type="text/javascript">
                        function hideDropdowns() {
                            $('.GrayDropdown .Button.Active').removeClass('Active').siblings('.Menu').hide();
                        }
                        
                        $('#ProfileButtons').width($('#FriendButton').outerWidth() + $('#MessageButton').outerWidth() + $('#MoreButton').outerWidth() + 10);
                        $('.GrayDropdown .Button').click(function () {
                            var show = !$(this).hasClass('Active');
                            hideDropdowns();
                            if (show) {
                                $(this).addClass('Active').siblings('.Menu').show();
                            }
                        
                            return false;
                        });
                        $(document).click(function () {
                            hideDropdowns();
                        });
                        $('#MoreButton [original-title]').tipsy();
                        var friendRequestButton = $(".friend-request-button");
                        
                            friendRequestButton.click(function () { window.location = "/Login/Signup.aspx"; });
                        
                      </script>
                      <?php } ?>
                    </div>
                    <div class="ProfileAlertPanel" style="<?php if(!$selfProfile) { echo "display: none; "; }?>margin: 15px auto 0px auto; width: 205px;">
                      <?php if($selfProfile) { ?>
                      <div class="SmallHeaderAlertSpaceLeft">
                        <div class="AlertSpace">
                          <div class="MessageAlert">
                            <a id="ctl00_cphRoblox_rbxUserPane_Alerts1_MessageAlertCaptionHyperLink" class="MessageAlertCaption tooltip-bottom" href="/My/Messages.aspx" original-title="Inbox"><?=$profileInfo->Messages ?? 0?></a>
                          </div>
                          <div class="FriendsAlert">
                            <a id="ctl00_cphRoblox_rbxUserPane_Alerts1_FriendsAlertCaptionHyperLink" class="FriendsAlertCaption tooltip-bottom" href="/Friends.aspx" original-title="Friend Requests"><?=$profileInfo->FriendRequests ?? 0?></a>
                          </div>
                          <div class="RobuxAlert">
                            <a id="ctl00_cphRoblox_rbxUserPane_Alerts1_RobuxAlertCaptionHyperLink" class="RobuxAlertCaption tooltip-bottom" href="/My/Money.aspx?tab=MyTransactions" original-title="ROBUX"><?=$profileInfo->Robux ?? 0?></a>
                          </div>
                          <div class="TicketsAlert">
                            <a id="ctl00_cphRoblox_rbxUserPane_Alerts1_TicketsAlertCaptionHyperLink" class="TicketsAlertCaption tooltip-bottom" href="/My/Money.aspx?tab=MyTransactions" original-title="Tickets"><?=$profileInfo->Tickets ?? 0?></a>
                          </div>
                        </div>
                      </div>
                      <?php } ?>
                      <br>
                    </div>
                    <div style="margin-right: 20px">
                    </div>
                  </center>
                </div>
              </div>
            </div>
          </div>
          <h2 class="title">
            <span>ROBLONIUM Badges</span>
          </h2>
          <div class="divider-bottom" style="padding-bottom: 20px">
            <div style="display: inline-block">
              <table id="ctl00_cphRoblox_rbxUserBadgesPane_dlBadges" cellspacing="0" align="Left" border="0" style="border-collapse:collapse;">
                <tr>
                  <td>
                    <div class="Badge" class="notranslate">
                      <div class="BadgeImage"><a id="ctl00_cphRoblox_rbxUserBadgesPane_dlBadges_ctl04_hlHeader" href="Badges.aspx#Badge4"><img id="ctl00_cphRoblox_rbxUserBadgesPane_dlBadges_ctl04_iBadge" src="http://images.rbxcdn.com/14652f1598ba5520515965b4038214c0.png" alt="This badge is given to the warriors of Robloxia, who have time and time again overwhelmed their foes in battle. To earn this badge, you must rack up 100 knockouts. Anyone with this badge knows what to do in a fight!" style="height:75px;width:75px;border-width:0px;" /></a></div>
                      <div class="BadgeLabel"><a id="ctl00_cphRoblox_rbxUserBadgesPane_dlBadges_ctl04_HyperLink1" href="Badges.aspx#Badge4">Warrior</a></div>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div id="BadgesDisplayPane" class="divider-bottom" style="clear: both; padding-bottom: 20px">
            <h2 class="title"><span>Player Badges</span></h2>
            <div class="" style="min-height:300px;">
              <div id="ctl00_cphRoblox_rbxBadgesDisplay_BadgesUpdatePanel" class="BadgesUpdatePanel">
                <div class="BadgesLoading_Container"></div>
                <div class="BadgesListView_Container">
                  <div class="TileBadges">
                    <a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl0_AssetThumbnailHyperLink" title="You visited my place! (ROBLOX has!) (Creator: mew903)" href="/You-visited-my-place-ROBLOX-has-item?id=94278219" style="display:inline-block;height:75px;width:75px;cursor:pointer;"><img src="http://t0.rbxcdn.com/c991b75efb67ae4e195261f6027c456a" height="75" width="75" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="You visited my place! (ROBLOX has!) (Creator: mew903)" /></a>
                    <div class="AssetDetails" style="display:none;" id="badgeInfo1088076886">
                      <div class="AssetName notranslate"><a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl0_AssetNameHyperLink" title="click to view" href="/You-visited-my-place-ROBLOX-has-item?id=94278219">You visited my place! (ROBLOX has!)</a></div>
                      <div class="AssetCreator"><span class="Label">Creator:</span> <span class="Detail notranslate" ><a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl0_AssetCreatorHyperLink" href="User.aspx?ID=771417">mew903</a></span></div>
                    </div>
                  </div>
                  <div class="TileBadges">
                    <a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl1_AssetThumbnailHyperLink" title="Breakout (Creator: LegoHeroFactory)" href="/Breakout-item?id=89175794" style="display:inline-block;height:75px;width:75px;cursor:pointer;"><img src="http://t2.rbxcdn.com/15c01b957a3e3f1c775b4673fbe214c6" height="75" width="75" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="Breakout (Creator: LegoHeroFactory)" /></a>
                    <div class="AssetDetails" style="display:none;" id="badgeInfo1043084385">
                      <div class="AssetName notranslate"><a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl1_AssetNameHyperLink" title="click to view" href="/Breakout-item?id=89175794">Breakout</a></div>
                      <div class="AssetCreator"><span class="Label">Creator:</span> <span class="Detail notranslate" ><a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl1_AssetCreatorHyperLink" href="User.aspx?ID=9546823">LegoHeroFactory</a></span></div>
                    </div>
                  </div>
                  <div class="TileBadges">
                    <a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl2_AssetThumbnailHyperLink" title="The Law (Creator: LegoHeroFactory)" href="/The-Law-item?id=89175852" style="display:inline-block;height:75px;width:75px;cursor:pointer;"><img src="http://t6.rbxcdn.com/12fd8e5bac42699ae91c9ee097b72f3b" height="75" width="75" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="The Law (Creator: LegoHeroFactory)" /></a>
                    <div class="AssetDetails" style="display:none;" id="badgeInfo1043077949">
                      <div class="AssetName notranslate"><a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl2_AssetNameHyperLink" title="click to view" href="/The-Law-item?id=89175852">The Law</a></div>
                      <div class="AssetCreator"><span class="Label">Creator:</span> <span class="Detail notranslate" ><a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl2_AssetCreatorHyperLink" href="User.aspx?ID=9546823">LegoHeroFactory</a></span></div>
                    </div>
                  </div>
                  <div class="TileBadges">
                    <a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl3_AssetThumbnailHyperLink" title="Welcome to Spleef! (Creator: CloneTrooper1019)" href="/Welcome-to-Spleef-item?id=76285821" style="display:inline-block;height:75px;width:75px;cursor:pointer;"><img src="http://t2.rbxcdn.com/12048869c353206685f857509620561b" height="75" width="75" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="Welcome to Spleef! (Creator: CloneTrooper1019)" /></a>
                    <div class="AssetDetails" style="display:none;" id="badgeInfo1021466069">
                      <div class="AssetName notranslate"><a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl3_AssetNameHyperLink" title="click to view" href="/Welcome-to-Spleef-item?id=76285821">Welcome to Spleef!</a></div>
                      <div class="AssetCreator"><span class="Label">Creator:</span> <span class="Detail notranslate" ><a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl3_AssetCreatorHyperLink" href="User.aspx?ID=2032622">CloneTrooper1019</a></span></div>
                    </div>
                  </div>
                  <div class="TileBadges">
                    <a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl4_AssetThumbnailHyperLink" title="OMG ITS CLONETROOPER1019! (You Met the Creator!) (Creator: CloneTrooper1019)" href="/OMG-ITS-CLONETROOPER1019-You-Met-the-Creator-item?id=76286530" style="display:inline-block;height:75px;width:75px;cursor:pointer;"><img src="http://t3.rbxcdn.com/7b889afcfdbe0609aff1c8da3c765f20" height="75" width="75" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="OMG ITS CLONETROOPER1019! (You Met the Creator!) (Creator: CloneTrooper1019)" /></a>
                    <div class="AssetDetails" style="display:none;" id="badgeInfo1021442851">
                      <div class="AssetName notranslate"><a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl4_AssetNameHyperLink" title="click to view" href="/OMG-ITS-CLONETROOPER1019-You-Met-the-Creator-item?id=76286530">OMG ITS CLONETROOPER1019! (You Met the Creator!)</a></div>
                      <div class="AssetCreator"><span class="Label">Creator:</span> <span class="Detail notranslate" ><a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl4_AssetCreatorHyperLink" href="User.aspx?ID=2032622">CloneTrooper1019</a></span></div>
                    </div>
                  </div>
                  <div class="TileBadges">
                    <a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl5_AssetThumbnailHyperLink" title="House Tipper (Creator: CloneTrooper1019)" href="/House-Tipper-item?id=76286206" style="display:inline-block;height:75px;width:75px;cursor:pointer;"><img src="http://t5.rbxcdn.com/1334fe98c66f0ae85b2af1e39c6ef7cb" height="75" width="75" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="House Tipper (Creator: CloneTrooper1019)" /></a>
                    <div class="AssetDetails" style="display:none;" id="badgeInfo1021442848">
                      <div class="AssetName notranslate"><a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl5_AssetNameHyperLink" title="click to view" href="/House-Tipper-item?id=76286206">House Tipper</a></div>
                      <div class="AssetCreator"><span class="Label">Creator:</span> <span class="Detail notranslate" ><a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl5_AssetCreatorHyperLink" href="User.aspx?ID=2032622">CloneTrooper1019</a></span></div>
                    </div>
                  </div>
                  <div class="TileBadges">
                    <a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl6_AssetThumbnailHyperLink" title="Winner! (Creator: CloneTrooper1019)" href="/Winner-item?id=76285879" style="display:inline-block;height:75px;width:75px;cursor:pointer;"><img src="http://t4.rbxcdn.com/098b55cdf66658b60a4503d9fec1a536" height="75" width="75" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="Winner! (Creator: CloneTrooper1019)" /></a>
                    <div class="AssetDetails" style="display:none;" id="badgeInfo1021442846">
                      <div class="AssetName notranslate"><a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl6_AssetNameHyperLink" title="click to view" href="/Winner-item?id=76285879">Winner!</a></div>
                      <div class="AssetCreator"><span class="Label">Creator:</span> <span class="Detail notranslate" ><a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl6_AssetCreatorHyperLink" href="User.aspx?ID=2032622">CloneTrooper1019</a></span></div>
                    </div>
                  </div>
                  <div class="TileBadges">
                    <a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl7_AssetThumbnailHyperLink" title="You Entered the Game! (Creator: CloneTrooper1019)" href="/You-Entered-the-Game-item?id=52331725" style="display:inline-block;height:75px;width:75px;cursor:pointer;"><img src="http://t0.rbxcdn.com/a99235c4ba78af93c53749755ae0c021" height="75" width="75" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="You Entered the Game! (Creator: CloneTrooper1019)" /></a>
                    <div class="AssetDetails" style="display:none;" id="badgeInfo1021437635">
                      <div class="AssetName notranslate"><a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl7_AssetNameHyperLink" title="click to view" href="/You-Entered-the-Game-item?id=52331725">You Entered the Game!</a></div>
                      <div class="AssetCreator"><span class="Label">Creator:</span> <span class="Detail notranslate" ><a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl7_AssetCreatorHyperLink" href="User.aspx?ID=2032622">CloneTrooper1019</a></span></div>
                    </div>
                  </div>
                  <div class="TileBadges">
                    <a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl8_AssetThumbnailHyperLink" title="Scri͠p͏t҉ȩr ̵B͜ad̴g̢e̢ (Creator: ThePr0grammer)" href="/Scri-p-t-e-r-B-ad-g-e-item?id=83516904" style="display:inline-block;height:75px;width:75px;cursor:pointer;"><img src="http://t2.rbxcdn.com/9317f97d44a962ecbf1c973aed90f6d9" height="75" width="75" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="Scri͠p͏t҉ȩr ̵B͜ad̴g̢e̢ (Creator: ThePr0grammer)" /></a>
                    <div class="AssetDetails" style="display:none;" id="badgeInfo1021250652">
                      <div class="AssetName notranslate"><a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl8_AssetNameHyperLink" title="click to view" href="/Scri-p-t-e-r-B-ad-g-e-item?id=83516904">Scri͠p͏t҉ȩr ̵B͜ad̴g̢e̢</a></div>
                      <div class="AssetCreator"><span class="Label">Creator:</span> <span class="Detail notranslate" ><a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl8_AssetCreatorHyperLink" href="User.aspx?ID=2467279">ThePr0grammer</a></span></div>
                    </div>
                  </div>
                  <div class="TileBadges">
                    <a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl9_AssetThumbnailHyperLink" title="The Muscly Egg of Boing Boing (Creator: CloneTrooper1019)" href="/The-Muscly-Egg-of-Boing-Boing-item?id=50544634" style="display:inline-block;height:75px;width:75px;cursor:pointer;"><img src="http://t7.rbxcdn.com/4ba521fe13b211d1284864a08e4e3034" height="75" width="75" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="The Muscly Egg of Boing Boing (Creator: CloneTrooper1019)" /></a>
                    <div class="AssetDetails" style="display:none;" id="badgeInfo1020729980">
                      <div class="AssetName notranslate"><a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl9_AssetNameHyperLink" title="click to view" href="/The-Muscly-Egg-of-Boing-Boing-item?id=50544634">The Muscly Egg of Boing Boing</a></div>
                      <div class="AssetCreator"><span class="Label">Creator:</span> <span class="Detail notranslate" ><a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl9_AssetCreatorHyperLink" href="User.aspx?ID=2032622">CloneTrooper1019</a></span></div>
                    </div>
                  </div>
                  <div class="TileBadges">
                    <a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl10_AssetThumbnailHyperLink" title="Shiny Red Egg of Confusion (Creator: CloneTrooper1019)" href="/Shiny-Red-Egg-of-Confusion-item?id=54507938" style="display:inline-block;height:75px;width:75px;cursor:pointer;"><img src="http://t1.rbxcdn.com/ed6cafbb12f1c28d7b9508e278673a71" height="75" width="75" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="Shiny Red Egg of Confusion (Creator: CloneTrooper1019)" /></a>
                    <div class="AssetDetails" style="display:none;" id="badgeInfo1020729947">
                      <div class="AssetName notranslate"><a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl10_AssetNameHyperLink" title="click to view" href="/Shiny-Red-Egg-of-Confusion-item?id=54507938">Shiny Red Egg of Confusion</a></div>
                      <div class="AssetCreator"><span class="Label">Creator:</span> <span class="Detail notranslate" ><a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl10_AssetCreatorHyperLink" href="User.aspx?ID=2032622">CloneTrooper1019</a></span></div>
                    </div>
                  </div>
                  <div class="TileBadges">
                    <a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl11_AssetThumbnailHyperLink" title="The Egg of KOOL KILLER VI The Final Inception (Creator: CloneTrooper1019)" href="/The-Egg-of-KOOL-KILLER-VI-The-Final-Inception-item?id=54507390" style="display:inline-block;height:75px;width:75px;cursor:pointer;"><img src="http://t3.rbxcdn.com/ec33656e4ead21a0a7d138ca94b02434" height="75" width="75" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="The Egg of KOOL KILLER VI The Final Inception (Creator: CloneTrooper1019)" /></a>
                    <div class="AssetDetails" style="display:none;" id="badgeInfo1020729944">
                      <div class="AssetName notranslate"><a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl11_AssetNameHyperLink" title="click to view" href="/The-Egg-of-KOOL-KILLER-VI-The-Final-Inception-item?id=54507390">The Egg of KOOL KILLER VI The Final Inception</a></div>
                      <div class="AssetCreator"><span class="Label">Creator:</span> <span class="Detail notranslate" ><a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl11_AssetCreatorHyperLink" href="User.aspx?ID=2032622">CloneTrooper1019</a></span></div>
                    </div>
                  </div>
                  <div class="TileBadges">
                    <a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl12_AssetThumbnailHyperLink" title="You own KOOL KILLER VIP (Creator: CloneTrooper1019)" href="/You-own-KOOL-KILLER-VIP-item?id=52331105" style="display:inline-block;height:75px;width:75px;cursor:pointer;"><img src="http://t7.rbxcdn.com/a9889b93cf114bce809f889a980840e3" height="75" width="75" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="You own KOOL KILLER VIP (Creator: CloneTrooper1019)" /></a>
                    <div class="AssetDetails" style="display:none;" id="badgeInfo1020729941">
                      <div class="AssetName notranslate"><a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl12_AssetNameHyperLink" title="click to view" href="/You-own-KOOL-KILLER-VIP-item?id=52331105">You own KOOL KILLER VIP</a></div>
                      <div class="AssetCreator"><span class="Label">Creator:</span> <span class="Detail notranslate" ><a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl12_AssetCreatorHyperLink" href="User.aspx?ID=2032622">CloneTrooper1019</a></span></div>
                    </div>
                  </div>
                  <div class="TileBadges">
                    <a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl13_AssetThumbnailHyperLink" title="Turkey? (Creator: CloneTrooper1019)" href="/Turkey-item?id=44218791" style="display:inline-block;height:75px;width:75px;cursor:pointer;"><img src="http://t7.rbxcdn.com/dd2325b4b5a45f24ab52a4200e019a66" height="75" width="75" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="Turkey? (Creator: CloneTrooper1019)" /></a>
                    <div class="AssetDetails" style="display:none;" id="badgeInfo1020729937">
                      <div class="AssetName notranslate"><a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl13_AssetNameHyperLink" title="click to view" href="/Turkey-item?id=44218791">Turkey?</a></div>
                      <div class="AssetCreator"><span class="Label">Creator:</span> <span class="Detail notranslate" ><a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl13_AssetCreatorHyperLink" href="User.aspx?ID=2032622">CloneTrooper1019</a></span></div>
                    </div>
                  </div>
                  <div class="TileBadges">
                    <a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl14_AssetThumbnailHyperLink" title="OMG ITS CLONETROOPER1019! (You met The Creator!) (Creator: CloneTrooper1019)" href="/OMG-ITS-CLONETROOPER1019-You-met-The-Creator-item?id=43192401" style="display:inline-block;height:75px;width:75px;cursor:pointer;"><img src="http://t0.rbxcdn.com/d6c2216002d23576f8f610ba932f3478" height="75" width="75" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="OMG ITS CLONETROOPER1019! (You met The Creator!) (Creator: CloneTrooper1019)" /></a>
                    <div class="AssetDetails" style="display:none;" id="badgeInfo1020729936">
                      <div class="AssetName notranslate"><a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl14_AssetNameHyperLink" title="click to view" href="/OMG-ITS-CLONETROOPER1019-You-met-The-Creator-item?id=43192401">OMG ITS CLONETROOPER1019! (You met The Creator!)</a></div>
                      <div class="AssetCreator"><span class="Label">Creator:</span> <span class="Detail notranslate" ><a id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeListView_ctrl14_AssetCreatorHyperLink" href="User.aspx?ID=2032622">CloneTrooper1019</a></span></div>
                    </div>
                  </div>
                </div>
                <div class="BadgesPager_Container" style="clear:both;text-align:center;bottom: 5px;left: 75px;">
                  <span id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeDataPagerFooter"><a disabled="disabled" class="pager previous"></a>&nbsp;
                  <span style="display: inline-block; padding: 5px; vertical-align: top">
                  Page
                  <span id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeDataPagerFooter_ctl01_CurrentPageLabel">1</span>
                  of
                  <span id="ctl00_cphRoblox_rbxBadgesDisplay_BadgeDataPagerFooter_ctl01_TotalPagesLabel">9</span>
                  </span>
                  <a class="pager next" href="javascript:__doPostBack(&#39;ctl00$cphRoblox$rbxBadgesDisplay$BadgeDataPagerFooter$ctl02$ctl00&#39;,&#39;&#39;)"></a>&nbsp;</span>
                </div>
              </div>
              <div style="clear:both;"></div>
            </div>
            <script type="text/javascript">
              $('#' + 'ctl00_cphRoblox_rbxBadgesDisplay_BadgesUpdatePanel').bind('click', function (e) {
                  var target = $(e.target);
                  if (target.parentsUntil('.BadgesUpdatePanel', '.BadgesPager_Container').length > 0 && target[0].tagName == 'A') {
                      //put up loading sign
                      $('.BadgesListView_Container').html("");
              
                      window.setTimeout(function () {
                          if ($('.BadgesListView_Container').html() == "") {
                              $('.BadgesLoading_Container').html('<div style="text-align: center;margin-top: 25px;"><img src="/images/ProgressIndicator4.gif" alt="Loading..." /></div>');
                          }
                      }, 1000);
                  }
              });
            </script>
          </div>
          <style>
            .statsLabel { font-weight:bold; width:200px; text-align:right; padding-right:10px;}
            .statsValue { font-weight:normal; width:200px; text-align:left;}
            .statsTable { width:400px; }
          </style>
          <h2 class="title"><span>Statistics</span></h2>
          <div class="divider-bottom" style="padding-bottom: 20px">
            <table class="statsTable">
              <tr>
                <td class="statsLabel">
                  <acronym title="The number of this user's friends.">Friends</acronym>:
                </td>
                <td class="statsValue">
                  <span id="ctl00_cphRoblox_rbxUserStatisticsPane_lFriendsStatistics"><?=$friendCount?></span>
                </td>
              </tr>
              <tr>
                <td class="statsLabel"><acronym title="The number of posts this user has made to the ROBLONIUM forum.">Forum Posts</acronym>:</td>
                <td class="statsValue"><span id="ctl00_cphRoblox_rbxUserStatisticsPane_lForumPostsStatistics" class="notranslate"><?=getUserPostCount($profileInfo->Id)?></span></td>
              </tr>
              <tr>
                <td class="statsLabel"><acronym title="The number of times this user's place has been visited.">Place Visits</acronym>:</td>
                <td class="statsValue"><span id="ctl00_cphRoblox_rbxUserStatisticsPane_lPlaceVisitsStatistics" class="notranslate">0</span></td>
              </tr>
              <tr>
                <td class="statsLabel"><acronym title="The number of times this user's character has destroyed another user's character in-game.">Knockouts</acronym>:</td>
                <td class="statsValue"><span id="ctl00_cphRoblox_rbxUserStatisticsPane_lKillsStatistics" class="notranslate">0</span></td>
              </tr>
              <!--tr>
                <td class="statsLabel"><acronym title="The all-time highest voting accuracy this user has achieved when voting in contests.">Highest Ever Voting Accuracy</acronym>:</td>
                <td class="statsValue"><span id="ctl00_cphRoblox_rbxUserStatisticsPane_lHighestEverVotingAccuracyStatistics">78</span>%</td>
              </tr-->
            </table>
          </div>
          <div class="divider-bottom" style="padding-bottom: 20px">
            <div>
              <h2 class="title" style="display:block;float: left;">
                <span class="notranslate"><?=$addressUserAs?></span> Sets
              </h2>
              <a data-js-my-button href class="btn-small btn-neutral" id="ToggleBetweenOwnedSubscribedSets" style="float: right; margin-right: 20px; margin-top: 25px" onclick="Roblox.SetsPaneObject.toggleBetweenSetsOwnedSubscribed();return false;" >View Subscribed<span class="btn-text" id="SetsToggleSpan">View Subscribed</span></a>
              <div class="clear"></div>
            </div>
            <div id="OwnedSetsContainerDiv" style="padding-bottom:0;">
              <div id="SetsItemContainer" style="margin-bottom: 30px; margin-left: 15px"></div>
              <div style="clear:both;"></div>
              <div class="SetsPager_Container" style="position: relative">
                <div id="SetsPagerContainer"></div>
              </div>
            </div>
            <div id="SubscribedSetsContainerDiv" style="display:none; padding-top: 50px; padding-bottom: 0px">
              <div id="SubscribedSetsItemContainer" style="margin-bottom: 30px; margin-left: 15px"></div>
              <div style="clear:both;"></div>
              <div class="SetsPager_Container" style="position: relative">
                <div id="SubscribedSetsPagerContainer"></div>
              </div>
            </div>
            <div id="SetsPaneItemTemplate" style="display:none;">
              <div class="AssetThumbnail">
                <img class="$ImageAssetID"></img>
              </div>
              <div class="AssetDetails">
                <div class="AssetName notranslate" >
                  <a href="/My/Sets.aspx?id=$ID">$Name</a>
                </div>
                <div class="AssetCreator">
                  <span class="Label">Creator:&nbsp;</span>
                  <span class="Detail">
                  <a href="/User.aspx?id=$CreatorUserID" class="notranslate">$CreatorName</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <script type="text/javascript">
            if (typeof Roblox === "undefined") {
                Roblox = {};
            }
            
            $(function () {
                Roblox.SetsPaneObject = Roblox.SetsPane('http://www.roblox.com/', 1);
            
                var options = { Paging_PageNumbers_AreLinks: false };
                Roblox.OwnedSetsJSDataPager = new DataPager(5, 9, 'SetsItemContainer', 'SetsPagerContainer',
                    Roblox.SetsPaneObject.getSetsPaged, Roblox.SetsPaneObject.ownedItemFormatter, Roblox.SetsPaneObject.getSetAssetImageThumbnail, options
                );
                Roblox.SubscribedSetsJSDataPager = new DataPager(0, 9, 'SubscribedSetsItemContainer', 'SubscribedSetsPagerContainer',
                    Roblox.SetsPaneObject.getSubscribedSetsPaged, Roblox.SetsPaneObject.subscribedItemFormatter, Roblox.SetsPaneObject.getSetAssetImageThumbnail, options
                );
            });
          </script>
          <div id="UserGroupsPane" style="clear: both;">
            <h2 class="title">
              <span>Groups</span>
            </h2>
            <div style="clear:both; padding-bottom: 20px; padding-left: 30px">
              <div id="ctl00_cphRoblox_rbxUserGroupsPane_ctl00">
                <div id="ctl00_cphRoblox_rbxUserGroupsPane_GroupListView_ctrl0_GroupTemplateItem" style="float: left">
                  <div class="groupEmblemThumbnail" style="width:70px; overflow:hidden;margin:15px">
                    <div class="groupEmblemImage notranslate" style="width: 70px; height:72px; margin: 0px 0px 0px 0px; padding-top: 0px; background-repeat:no-repeat; background-image:none ">
                      <a id="ctl00_cphRoblox_rbxUserGroupsPane_GroupListView_ctrl0_AssetImage1" title="DarkAge Ninjas" href="/Groups/group.aspx?gid=382779" style="display:inline-block;height:62px;width:60px;cursor:pointer;"><img src="http://t5.rbxcdn.com/e41ddc838a23c3005401981598a9c603" height="62" width="60" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="DarkAge Ninjas" /></a>
                    </div>
                  </div>
                </div>
                <div id="ctl00_cphRoblox_rbxUserGroupsPane_GroupListView_ctrl1_GroupTemplateItem" style="float: left">
                  <div class="groupEmblemThumbnail" style="width:70px; overflow:hidden;margin:15px">
                    <div class="groupEmblemImage notranslate" style="width: 70px; height:72px; margin: 0px 0px 0px 0px; padding-top: 0px; background-repeat:no-repeat; background-image:none ">
                      <a id="ctl00_cphRoblox_rbxUserGroupsPane_GroupListView_ctrl1_AssetImage1" title="Emerald Knights of the Seventh Sanctum" href="/Groups/group.aspx?gid=377291" style="display:inline-block;height:62px;width:60px;cursor:pointer;"><img src="http://t3.rbxcdn.com/e3994ff51f914f5adb954d0248b237f4" height="62" width="60" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="Emerald Knights of the Seventh Sanctum" /></a>
                    </div>
                  </div>
                </div>
                <div id="ctl00_cphRoblox_rbxUserGroupsPane_GroupListView_ctrl2_GroupTemplateItem" style="float: left">
                  <div class="groupEmblemThumbnail" style="width:70px; overflow:hidden;margin:15px">
                    <div class="groupEmblemImage notranslate" style="width: 70px; height:72px; margin: 0px 0px 0px 0px; padding-top: 0px; background-repeat:no-repeat; background-image:none ">
                      <a id="ctl00_cphRoblox_rbxUserGroupsPane_GroupListView_ctrl2_AssetImage1" title="Knights of RedCliff" href="/Groups/group.aspx?gid=271454" style="display:inline-block;height:62px;width:60px;cursor:pointer;"><img src="http://t0.rbxcdn.com/16f5fbd0bcb27e77c6368c7113d3e7b8" height="62" width="60" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="Knights of RedCliff" /></a>
                    </div>
                  </div>
                </div>
                <div id="ctl00_cphRoblox_rbxUserGroupsPane_GroupListView_ctrl3_GroupTemplateItem" style="float: left">
                  <div class="groupEmblemThumbnail" style="width:70px; overflow:hidden;margin:15px">
                    <div class="groupEmblemImage notranslate" style="width: 70px; height:72px; margin: 0px 0px 0px 0px; padding-top: 0px; background-repeat:no-repeat; background-image:none ">
                      <a id="ctl00_cphRoblox_rbxUserGroupsPane_GroupListView_ctrl3_AssetImage1" title="Knights of the Splintered Skies " href="/Groups/group.aspx?gid=288278" style="display:inline-block;height:62px;width:60px;cursor:pointer;"><img src="http://t0.rbxcdn.com/f4b5d910cb0b87a5c6b760e33edff8d8" height="62" width="60" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="Knights of the Splintered Skies " /></a>
                    </div>
                  </div>
                </div>
                <div id="ctl00_cphRoblox_rbxUserGroupsPane_GroupListView_ctrl4_GroupTemplateItem" style="float: left">
                  <div class="groupEmblemThumbnail" style="width:70px; overflow:hidden;margin:15px">
                    <div class="groupEmblemImage notranslate" style="width: 70px; height:72px; margin: 0px 0px 0px 0px; padding-top: 0px; background-repeat:no-repeat; background-image:none ">
                      <a id="ctl00_cphRoblox_rbxUserGroupsPane_GroupListView_ctrl4_AssetImage1" title="Korblox&#39;s Empire" href="/Groups/group.aspx?gid=375307" style="display:inline-block;height:62px;width:60px;cursor:pointer;"><img src="http://t7.rbxcdn.com/ff7ac4769e8013b1c112ccb84ac1e3dc" height="62" width="60" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="Korblox&#39;s Empire" /></a>
                    </div>
                  </div>
                </div>
                <div id="ctl00_cphRoblox_rbxUserGroupsPane_GroupListView_ctrl5_GroupTemplateItem" style="float: left">
                  <div class="groupEmblemThumbnail" style="width:70px; overflow:hidden;margin:15px">
                    <div class="groupEmblemImage notranslate" style="width: 70px; height:72px; margin: 0px 0px 0px 0px; padding-top: 0px; background-repeat:no-repeat; background-image:none ">
                      <a id="ctl00_cphRoblox_rbxUserGroupsPane_GroupListView_ctrl5_AssetImage1" title="Ne&#39;Kotikoz" href="/Groups/group.aspx?gid=387867" style="display:inline-block;height:62px;width:60px;cursor:pointer;"><img src="http://t0.rbxcdn.com/49cd483a1cd288b3c528b435fffcd46a" height="62" width="60" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="Ne&#39;Kotikoz" /></a>
                    </div>
                  </div>
                </div>
                <div id="ctl00_cphRoblox_rbxUserGroupsPane_GroupListView_ctrl6_GroupTemplateItem" style="float: left">
                  <div class="groupEmblemThumbnail" style="width:70px; overflow:hidden;margin:15px">
                    <div class="groupEmblemImage notranslate" style="width: 70px; height:72px; margin: 0px 0px 0px 0px; padding-top: 0px; background-repeat:no-repeat; background-image:none ">
                      <a id="ctl00_cphRoblox_rbxUserGroupsPane_GroupListView_ctrl6_AssetImage1" title="Orinthians" href="/Groups/group.aspx?gid=696519" style="display:inline-block;height:62px;width:60px;cursor:pointer;"><img src="http://t7.rbxcdn.com/17f223c83f61188d78f2ecdc8f018367" height="62" width="60" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="Orinthians" /></a>
                    </div>
                  </div>
                </div>
                <div id="ctl00_cphRoblox_rbxUserGroupsPane_GroupListView_ctrl7_GroupTemplateItem" style="float: left">
                  <div class="groupEmblemThumbnail" style="width:70px; overflow:hidden;margin:15px">
                    <div class="groupEmblemImage notranslate" style="width: 70px; height:72px; margin: 0px 0px 0px 0px; padding-top: 0px; background-repeat:no-repeat; background-image:none ">
                      <a id="ctl00_cphRoblox_rbxUserGroupsPane_GroupListView_ctrl7_AssetImage1" title="Retexture Artists Official Channel" href="/Groups/group.aspx?gid=27770" style="display:inline-block;height:62px;width:60px;cursor:pointer;"><img src="http://t3.rbxcdn.com/ffda80a7ce792187fa365f559625add3" height="62" width="60" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="Retexture Artists Official Channel" /></a>
                    </div>
                  </div>
                </div>
                <div id="ctl00_cphRoblox_rbxUserGroupsPane_GroupListView_ctrl8_GroupTemplateItem" style="float: left">
                  <div class="groupEmblemThumbnail" style="width:70px; overflow:hidden;margin:15px">
                    <div class="groupEmblemImage notranslate" style="width: 70px; height:72px; margin: 0px 0px 0px 0px; padding-top: 0px; background-repeat:no-repeat; background-image:none ">
                      <a id="ctl00_cphRoblox_rbxUserGroupsPane_GroupListView_ctrl8_AssetImage1" title="Retexturing Apprentices " href="/Groups/group.aspx?gid=585932" style="display:inline-block;height:62px;width:60px;cursor:pointer;"><img src="http://t6.rbxcdn.com/7009bc514f86ddccbda01b0cfedd97d8" height="62" width="60" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="Retexturing Apprentices " /></a>
                    </div>
                  </div>
                </div>
                <div id="ctl00_cphRoblox_rbxUserGroupsPane_GroupListView_ctrl9_GroupTemplateItem" style="float: left">
                  <div class="groupEmblemThumbnail" style="width:70px; overflow:hidden;margin:15px">
                    <div class="groupEmblemImage notranslate" style="width: 70px; height:72px; margin: 0px 0px 0px 0px; padding-top: 0px; background-repeat:no-repeat; background-image:none ">
                      <a id="ctl00_cphRoblox_rbxUserGroupsPane_GroupListView_ctrl9_AssetImage1" title="Roblox" href="/Groups/group.aspx?gid=7" style="display:inline-block;height:62px;width:60px;cursor:pointer;"><img src="http://t5.rbxcdn.com/438ad6126f307065f5831002cb21b4cf" height="62" width="60" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="Roblox" /></a>
                    </div>
                  </div>
                </div>
                <div id="ctl00_cphRoblox_rbxUserGroupsPane_GroupListView_ctrl10_GroupTemplateItem" style="float: left">
                  <div class="groupEmblemThumbnail" style="width:70px; overflow:hidden;margin:15px">
                    <div class="groupEmblemImage notranslate" style="width: 70px; height:72px; margin: 0px 0px 0px 0px; padding-top: 0px; background-repeat:no-repeat; background-image:none ">
                      <a id="ctl00_cphRoblox_rbxUserGroupsPane_GroupListView_ctrl10_AssetImage1" title="ROBLOX Community Staff and Forum Users" href="/Groups/group.aspx?gid=679727" style="display:inline-block;height:62px;width:60px;cursor:pointer;"><img src="http://t3.rbxcdn.com/e16f62988e3ff9a3aacd41d193b77b3f" height="62" width="60" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="ROBLOX Community Staff and Forum Users" /></a>
                    </div>
                  </div>
                </div>
                <div id="ctl00_cphRoblox_rbxUserGroupsPane_GroupListView_ctrl11_GroupTemplateItem" style="float: left">
                  <div class="groupEmblemThumbnail" style="width:70px; overflow:hidden;margin:15px">
                    <div class="groupEmblemImage notranslate" style="width: 70px; height:72px; margin: 0px 0px 0px 0px; padding-top: 0px; background-repeat:no-repeat; background-image:none ">
                      <a id="ctl00_cphRoblox_rbxUserGroupsPane_GroupListView_ctrl11_AssetImage1" title="Roblox Wiki" href="/Groups/group.aspx?gid=127081" style="display:inline-block;height:62px;width:60px;cursor:pointer;"><img src="http://t6.rbxcdn.com/aeda735ed3a379dacc632a1277b5b7da" height="62" width="60" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="Roblox Wiki" /></a>
                    </div>
                  </div>
                </div>
                <span id="ctl00_cphRoblox_rbxUserGroupsPane_GroupDataPagerFooter" style="margin-left: 125px; display: inline-block"><a disabled="disabled" class="pager previous"></a>&nbsp;
                <span style="display: inline-block; padding: 5px; vertical-align: top">
                Page
                <span id="ctl00_cphRoblox_rbxUserGroupsPane_GroupDataPagerFooter_ctl01_CurrentPageLabel">1</span>
                of
                <span id="ctl00_cphRoblox_rbxUserGroupsPane_GroupDataPagerFooter_ctl01_TotalPagesLabel">2</span>
                </span>
                <a class="pager next" href="javascript:__doPostBack(&#39;ctl00$cphRoblox$rbxUserGroupsPane$GroupDataPagerFooter$ctl02$ctl00&#39;,&#39;&#39;)"></a>&nbsp;</span>
              </div>
            </div>
          </div>
        </div>
        <!--[if IE 6]>
      </td>
      <td width="450px" valign="top">
        <![endif]-->
        <div class="divider-left" style="width: 484px; float: left; position: relative; left: -1px">
          <div class="divider-bottom" style="padding-bottom: 20px; padding-left: 20px">
            <h2 class="title" style="float: left">
              <span>Active Places</span>
            </h2>
            <div id="UserPlacesPane">
              <div id="ctl00_cphRoblox_rbxUserPlacesPane_pnlUserPlaces">
                <?php if(!$gamesQuery->rowCount()){ echo $userPronoun." not have any ROBLONIUM places."; } ?>
                <div id="UserPlaces" style="overflow: hidden">
                  <div id="accordion" class="accordion">
                    <?php while($row = $gamesQuery->fetch(PDO::FETCH_OBJ)){ ?>
                    <div>
                      <h3 class="notranslate" style="display: block; font-size: 15px; font-weight: bold; color: #363636; float: left; overflow:hidden; height: 22px;">
                        <?=$row->Name?>
                      </h3>
                    </div>
                    <div class="notranslate" style="margin:0px; padding-left: 20px; padding-right: 20px; padding-top: 0px">
                      <div class="Place">
                        <div class="PlayStatus">
                          <span class="PlaceAccessIndicator">
                          <span id="ctl00_cphRoblox_rbxUserPlacesPane_ShowcasePlaces_ctl00_rbxPlatform_rbxPlaceAccessIndicator_FriendsOnlyLocked" style="display: none">
                          <a class="iLocked tooltip" title="Friends Only"></a><span class="invisible">&nbsp;Friends-only</span>
                          </span>
                          <span id="ctl00_cphRoblox_rbxUserPlacesPane_ShowcasePlaces_ctl00_rbxPlatform_rbxPlaceAccessIndicator_FriendsOnlyUnlocked" style="display: none">
                          <a class="iUnlocked tooltip" title="Friends Only - You are friends"></a><span class="invisible">&nbsp;Friends-only: You are friends</span>
                          </span>
                          <span id="ctl00_cphRoblox_rbxUserPlacesPane_ShowcasePlaces_ctl00_rbxPlatform_rbxPlaceAccessIndicator_ExpiredSelf" style="display: none">
                          <a class="iLocked tooltip" title="Locked"></a>
                          <span class="invisible">&nbsp;Your Outrageous Builders Club, Turbo Builders Club, or Builders Club membership has expired, so you can
                          only have one open place. Your places will not be deleted, and you can <a id="ctl00_cphRoblox_rbxUserPlacesPane_ShowcasePlaces_ctl00_rbxPlatform_rbxPlaceAccessIndicator_RBXLDownloadLink">download the RBXL here.</a> To unlock all of your places,
                          please <a href="/upgrades/BuildersClubMemberships.aspx">re-order Outrageous Builders Club, Turbo Builders Club, or Builders
                          Club </a>.<br /></span>
                          </span>
                          <span id="ctl00_cphRoblox_rbxUserPlacesPane_ShowcasePlaces_ctl00_rbxPlatform_rbxPlaceAccessIndicator_ExpiredOther" style="display: none">
                          <a class="iLocked tooltip" title="Locked"></a>
                          <span class="invisible">This place is locked because the creator's <a href="/upgrades/BuildersClubMemberships.aspx">Builders
                          Club / Turbo Builders Club / Outrageous Builders Club </a>has expired.
                          </span>
                          </span> 
                          </span>
                        </div>
                        <br>
                        <div class="Statistics" style="color: #999; font-size: 14px; letter-spacing: normal">
                          <span id="ctl00_cphRoblox_rbxUserPlacesPane_ShowcasePlaces_ctl00_rbxPlatform_lStatistics">Visited 0 times (0 last week)</span>
                        </div>
                        <div class="Thumbnail" style="width:414px;overflow:hidden;position: relative;">
                          <a id="ctl00_cphRoblox_rbxUserPlacesPane_ShowcasePlaces_ctl00_rbxPlatform_rbxPlaceThumbnail" title="<?=$row->Name?>" href="/PlaceItem.aspx?ID=<?=$row->AssetId?>" style="display:inline-block;height:230px;width:420px;cursor:pointer;"><img src="/Game/Tools/ThumbnailAsset.ashx?aid=<?=$row->AssetId?>&fmt=png&wd=420&ht=420" height="230" width="420" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="<?=$row->Name?>" /></a>
                        </div>
                        <div id="ctl00_cphRoblox_rbxUserPlacesPane_ShowcasePlaces_ctl00_rbxPlatform_pDescription">
                          <div class="Description" style="font-family: arial; color: #666; font-size: 12px;line-height: inherit; border: none">
                            <span id="ctl00_cphRoblox_rbxUserPlacesPane_ShowcasePlaces_ctl00_rbxPlatform_lDescription"><?=$row->Description?></span>
                          </div>
                        </div>
                        <div class="PlayOptions" style="display:block" >
                          <div class="VisitButtonContainer"  data-item-id="<?=$row->AssetId?>">
                            <div class="VisitButtonsLeft Centered">
                              <div id="ctl00_cphRoblox_rbxUserPlacesPane_ShowcasePlaces_ctl00_rbxPlatform_rbxVisitButtons_MultiplayerVisitButton" class="VisitButton VisitButtonPlay" placeid="<?=$row->AssetId?>">
                                <a  class="btn-medium btn-primary">Play</a>
                              </div>
                              <?php if($selfProfile) { ?>
                              <div id="ctl00_cphRoblox_rbxUserPlacesPane_ShowcasePlaces_ctl01_rbxPlatform_rbxVisitButtons_EditButton" class="VisitButton VisitButtonEdit" placeid="16184658">
                                <a  title="Open in Studio Mode" class="btn-medium btn-primary tooltip">Edit</a>
                              </div>
                              <?php } ?>
                            </div>
                            <script type="text/javascript">
                              var play_placeId = <?=$row->AssetId?>;
                              function redirectPlaceLauncherToLogin() {
                                  location.href = "/login/default.aspx?ReturnUrl=" + encodeURIComponent("/User.aspx?ID=1");
                              }
                              function redirectPlaceLauncherToRegister() {
                                  location.href = "/login/NewAge.aspx?ReturnUrl=" + encodeURIComponent("/User.aspx?ID=1");
                              }
                              function fireEventAction(action) {
                                  RobloxEventManager.triggerEvent('rbx_evt_popup_action', { action: action });
                              }
                            </script>
                            <div id="BCOnlyModal" class="modalPopup unifiedModal smallModal" style="display:none;">
                              <div style="margin:4px 0px;">
                                <span>Builders Club Only</span>
                              </div>
                              <div class="simplemodal-close">
                                <a class="ImageButton closeBtnCircle_20h" style="margin-left:400px;"></a>
                              </div>
                              <div class="unifiedModalContent" style="padding-top:5px; margin-bottom: 3px; margin-left: 3px; margin-right: 3px">
                                <div class="ImageContainer" >
                                  <img class="GenericModalImage BCModalImage" alt="Builder's Club" src="http://images.rbxcdn.com/ae345c0d59b00329758518edc104d573.png" />
                                  <div id="BCMessageDiv" class="BCMessage Message">
                                    Builders Club membership is required to play in this place.
                                  </div>
                                </div>
                                <div style="clear:both;"></div>
                                <div style="clear:both;"></div>
                                <div class="GenericModalButtonContainer" style="padding-bottom: 13px">
                                  <div style="text-align:center">
                                    <a id="BClink" href="/Upgrades/BuildersClubMemberships.aspx" class="btn-primary btn-large">Upgrade Now</a>
                                  </div>
                                  <div style="clear:both;"></div>
                                </div>
                                <div style="clear:both;"></div>
                              </div>
                            </div>
                            <script type="text/javascript">
                              function showBCOnlyModal(modalId) {
                                  var modalProperties = { overlayClose: true, escClose: true, opacity: 80, overlayCss: { backgroundColor: "#000" } };
                                  if (typeof modalId === "undefined")
                                      $("#BCOnlyModal").modal(modalProperties);
                                  else
                                      $("#" + modalId).modal(modalProperties);
                              }
                              $(document).ready(function () {
                                  $('#VOID').click(function () {
                                      showBCOnlyModal("BCOnlyModal");
                                      return false;
                                  });
                              });
                            </script>
                            <div class="GenericModal modalPopup unifiedModal smallModal" style="display:none;">
                              <div class="Title"></div>
                              <div class="GenericModalBody">
                                <div>
                                  <div class="ImageContainer roblox-item-image"  data-image-size="small" data-no-overlays data-no-click>
                                    <img class="GenericModalImage" alt="generic image" />
                                  </div>
                                  <div class="Message"></div>
                                  <div style="clear:both"></div>
                                </div>
                                <div class="GenericModalButtonContainer">
                                  <a class="ImageButton btn-neutral btn-large roblox-ok" >OK<span class="btn-text">OK</span></a> 
                                </div>
                              </div>
                            </div>
                            <script type="text/javascript">
                              $(function () {
                                  Roblox.Client.Resources = {
                                      //<sl:translate>
                                      here: "here",
                                      youNeedTheLatest: "You need Our Plugin for this.  Get the latest version from ",
                                      plugInInstallationFailed: "Plugin installation failed!",
                                      errorUpdating: "Error updating: "
                                      //</sl:translate>
                                  };
                              });
                            </script>
                          </div>
                        </div>
                      </div>
                    </div>
                    <?php } ?>
                  </div>
                  <div id="ctl00_cphRoblox_rbxUserPlacesPane_ShowcaseFooter" class="PanelFooter" style="margin-top:5px;margin-left:20px;padding:3px;display:none;">
                    <div id="ctl00_cphRoblox_rbxUserPlacesPane_ShowcasePager_PanelPages" style="text-align:center;">
                      <a id="ctl00_cphRoblox_rbxUserPlacesPane_ShowcasePager_LinkButtonFirst" class="pager previous disabled"></a>
                      <span class="PageNumbers" style="vertical-align: top; display: inline-block; padding: 5px; padding-top: 6px">Page 1 of 2</span>
                      <a id="ctl00_cphRoblox_rbxUserPlacesPane_ShowcasePager_LinkButtonNext" class="pager next" href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$cphRoblox$rbxUserPlacesPane$ShowcasePager$LinkButtonNext&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, true))"></a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="ItemPurchaseAjaxContainer">
                <div id="ItemPurchaseAjaxData"
                  data-authenticateduser-isnull="True"
                  data-user-balance-robux="0"
                  data-user-balance-tickets="0"
                  data-user-bc="0"
                  data-continueshopping-url=""
                  data-imageurl="" 
                  data-alerturl="http://images.rbxcdn.com/cbb24e0c0f1fb97381a065bd1e056fcb.png"
                  data-builderscluburl="http://images.rbxcdn.com/ae345c0d59b00329758518edc104d573.png"></div>
                <div id="ProcessingView" style="display:none">
                  <div class="ProcessingModalBody">
                    <p style="margin:0px"><img src='http://images.rbxcdn.com/ec4e85b0c4396cf753a06fade0a8d8af.gif' alt="Processing..." /></p>
                    <p style="margin:7px 0px">Processing Transaction</p>
                  </div>
                </div>
                <script type="text/javascript">
                  //<sl:translate>
                  Roblox.ItemPurchase.strings = {
                      insufficientFundsTitle : "Insufficient Funds",
                      insufficientFundsText : "You need {0} more to purchase this item.",
                      cancelText : "Cancel",
                      okText : "OK",
                      buyText : "Buy",
                      buyTextLower : "buy",
                      tradeCurrencyText : "Trade Currency",
                      priceChangeTitle : "Item Price Has Changed",
                      priceChangeText : "While you were shopping, the price of this item changed from {0} to {1}.",
                      buyNowText : "Buy Now",
                      buyAccessText: "Buy Access",
                      buildersClubOnlyTitle : "{0} Only",
                      buildersClubOnlyText : "You need {0} to buy this item!",
                      buyItemTitle : "Buy Item",
                      buyItemText : "Would you like to {0} {5}the {1} {2} from {3} for {4}?",
                      balanceText : "Your balance after this transaction will be {0}",
                      freeText : "Free",
                      purchaseCompleteTitle : "Purchase Complete!",
                      purchaseCompleteText : "You have successfully {0} {5}the {1} {2} from {3} for {4}.",
                      continueShoppingText : "Return to Profile",
                      customizeCharacterText : "Customize Character",
                      orText : "or",
                      rentText : "rent",
                      accessText: "access to "
                  }
                  //</sl:translate>
                </script>
              </div>
              <script type="text/javascript">
                Roblox.require('Widgets.DropdownMenu', function (dropdown) {
                    dropdown.InitializeDropdown();
                });
              </script>
            </div>
          </div>
          <div style="padding-left: 20px" class="divider-bottom">
            <div style="margin: 12px 0 20px; overflow:visible">
              <h2 style="float: left"><?=$addressUserAs?> Friends</h2>
              <a data-js-my-button style="float: right" href="Friends.aspx?UserID=<?=$profileInfo->Id?>" class="btn-small btn-neutral" id="HeaderButton">See All <?=$friendCount?><span class="btn-text">See All <?=$friendCount?></span></a>
            </div>
            <div style="padding-top: 50px">
              <?php if(!$friendCount) { ?>
              <div id="ctl00_cphRoblox_rbxFriendsPane_pNoResults">
                <p><span id="ctl00_cphRoblox_rbxFriendsPane_lNoResults"><?=$userPronoun?> not have any ROBLONIUM friends.</span></p>
              </div>
              <?php } else { ?>
              <table id="ctl00_cphRoblox_rbxFriendsPane_dlFriends" cellspacing="0" align="Center" border="0" style="border-collapse:collapse;">
                <tbody>
                  <tr>
                    <?php
                    $friendNumber = 0; //this display doesnt use the grid system, it uses table so there's some extra trickery involved
                    while ($row = $friends->fetch(PDO::FETCH_OBJ))
                    { 
                      $friend = getUserInfoFromUid($row->requesterId == $profileInfo->Id ? $row->receiverId : $row->requesterId); 
                      $friendNumber++;
                    ?>
                    <td>
                      <div class="Friend notranslate">
                        <div class="Avatar">
                          <a id="ctl00_cphRoblox_rbxFriendsPane_dlFriends_ctl00_hlAvatar" class=" notranslate" title="DracoSwordMaster" href="/User.aspx?ID=<?=$friend->Id?>" style="display:inline-block;height:100px;width:100px;cursor:pointer;"><img src="/Game/Tools/Avatar.ashx?userId=<?=$friend->Id?>" height="100" width="100" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="DracoSwordMaster" class=" notranslate"></a></div>
                        <div class="Summary">
                          <span class="OnlineStatus"><img id="ctl00_cphRoblox_rbxFriendsPane_dlFriends_ctl00_iOnlineStatus" src="/images/offline.png" alt="DracoSwordMaster is offline (last seen at 5/29/2013 6:52:34 AM." style="border-width:0px;"></span>
                          <span class="Name"><a id="ctl00_cphRoblox_rbxFriendsPane_dlFriends_ctl00_hlFriend" href="/User.aspx?ID=<?=$friend->Id?>"><?=$friend->Name?></a></span>
                        </div>
                      </div>
                    </td>
                    <?php 
                    if($friendNumber==3){ echo "</tr><tr>"; $friendNumber = 0; }
                    } 
                    ?>
                  </tr>
                </tbody>
              </table>
              <?php } ?>
            </div>
          </div>
          <div class="divider-bottom" style="padding-left: 20px; padding-bottom: 20px">
            <div id="ctl00_cphRoblox_rbxFavoritesPane_FavoritesPane">
              <div  style="overflow: auto">
                <h2 class="title" style="float: left">Favorites</h2>
                <div class="PanelFooter" style="float: right;">
                  Category:&nbsp;
                  <select name="ctl00$cphRoblox$rbxFavoritesPane$AssetCategoryDropDownList" id="ctl00_cphRoblox_rbxFavoritesPane_AssetCategoryDropDownList">
                    <option value="17">Heads</option>
                    <option value="18">Faces</option>
                    <option value="19">Gear</option>
                    <option value="8">Hats</option>
                    <option value="2">T-Shirts</option>
                    <option value="11">Shirts</option>
                    <option value="12">Pants</option>
                    <option value="13">Decals</option>
                    <option value="10">Models</option>
                    <option selected="selected" value="9">Places</option>
                  </select>
                </div>
              </div>
              <div>
                <div id="FavoritesContent">
                  <table id="ctl00_cphRoblox_rbxFavoritesPane_FavoritesDataList" cellspacing="0" border="0" style="border-collapse:collapse;">
                    <tr>
                      <td class="Asset" valign="top">
                        <div style="padding:5px; margin-right: 30px; margin-left: 10px">
                          <div class="AssetThumbnail notranslate" >
                            <a id="ctl00_cphRoblox_rbxFavoritesPane_FavoritesDataList_ctl00_AssetThumbnailHyperLink" class=" notranslate" title=" Apocalypse Rising" class=" notranslate" href="/Apocalypse-Rising-place?id=1600503" style="display:inline-block;height:110px;width:110px;cursor:pointer;"><img src="http://t6.rbxcdn.com/f1e0b6e61e96cc3462b2257c5dc5f493" height="110" width="110" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt=" Apocalypse Rising" class=" notranslate" /></a>
                          </div>
                          <div class="AssetDetails notranslate" style="clear:both;">
                            <div class="AssetName"><a id="ctl00_cphRoblox_rbxFavoritesPane_FavoritesDataList_ctl00_AssetNameHyperLink" href="/Apocalypse-Rising-place?id=1600503"> Apocalypse Rising</a></div>
                            <div class="AssetCreator"><span class="Label">Creator:</span> <span class="Detail"><a id="ctl00_cphRoblox_rbxFavoritesPane_FavoritesDataList_ctl00_AssetCreatorHyperLink" href="User.aspx?ID=281519">Gusmanak</a></span></div>
                          </div>
                        </div>
                      </td>
                      <td class="Asset" valign="top">
                        <div style="padding:5px; margin-right: 30px; margin-left: 10px">
                          <div class="AssetThumbnail notranslate" >
                            <a id="ctl00_cphRoblox_rbxFavoritesPane_FavoritesDataList_ctl01_AssetThumbnailHyperLink" class=" notranslate" title="ROBLOX Base Wars FPS" class=" notranslate" href="/ROBLOX-Base-Wars-FPS-place?id=50430" style="display:inline-block;height:110px;width:110px;cursor:pointer;"><img src="http://t3.rbxcdn.com/a691650afb6a0b03282a78ff32ddc171" height="110" width="110" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="ROBLOX Base Wars FPS" class=" notranslate" /></a>
                          </div>
                          <div class="AssetDetails notranslate" style="clear:both;">
                            <div class="AssetName"><a id="ctl00_cphRoblox_rbxFavoritesPane_FavoritesDataList_ctl01_AssetNameHyperLink" href="/ROBLOX-Base-Wars-FPS-place?id=50430">ROBLOX Base Wars FPS</a></div>
                            <div class="AssetCreator"><span class="Label">Creator:</span> <span class="Detail"><a id="ctl00_cphRoblox_rbxFavoritesPane_FavoritesDataList_ctl01_AssetCreatorHyperLink" href="User.aspx?ID=21557">Games</a></span></div>
                          </div>
                        </div>
                      </td>
                      <td class="Asset" valign="top">
                        <div style="padding:5px; margin-right: 30px; margin-left: 10px">
                          <div class="AssetThumbnail notranslate" >
                            <a id="ctl00_cphRoblox_rbxFavoritesPane_FavoritesDataList_ctl02_AssetThumbnailHyperLink" class=" notranslate" title="Sword Fights on the Heights IV" class=" notranslate" href="/Sword-Fights-on-the-Heights-IV-place?id=47324" style="display:inline-block;height:110px;width:110px;cursor:pointer;"><img src="http://t2.rbxcdn.com/3bd970dbac9bb656418a39d4313a5c7a" height="110" width="110" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="Sword Fights on the Heights IV" class=" notranslate" /></a>
                          </div>
                          <div class="AssetDetails notranslate" style="clear:both;">
                            <div class="AssetName"><a id="ctl00_cphRoblox_rbxFavoritesPane_FavoritesDataList_ctl02_AssetNameHyperLink" href="/Sword-Fights-on-the-Heights-IV-place?id=47324">Sword Fights on the Heights IV</a></div>
                            <div class="AssetCreator"><span class="Label">Creator:</span> <span class="Detail"><a id="ctl00_cphRoblox_rbxFavoritesPane_FavoritesDataList_ctl02_AssetCreatorHyperLink" href="User.aspx?ID=261">Shedletsky</a></span></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <!--div style="clear: both; margin: 20px;width:300px;">
            <div style="width: 300px">
              <span id='3135333634363637' class="GPTAd rectangle" data-js-adtype="gptAd">
                <script type="text/javascript">
                  googletag.cmd.push(function () {
                      googletag.display("3135333634363637");
                  });
                </script>
              </span>
              <div class="ad-annotations " style="width: 300px">
                <span class="ad-identification">Advertisement
                <span> - </span>
                <a href="" class="UpsellAdButton" title="Click to learn how to remove ads!">Why am I seeing ads?</a>
                </span>
                <a class="BadAdButton" href="/Ads/ReportAd.aspx" title="click to report an offensive ad">Report</a>
              </div>
            </div>
          </div-->
        </div>
        <!--[if IE 6]>
      </td>
    </tr>
  </table>
  <![endif]-->
  <br clear="all" />
</div>
<div id="UserContainer">
  <div id="UserAssetsPane" style="border-top: 1px solid #ccc;">
    <div id="ctl00_cphRoblox_rbxUserAssetsPane_upUserAssetsPane">
      <h2 class="title" display="block" style="width:970px">
        <span>
        Inventory
        </span>
      </h2>
      <div id="UserAssets">
        <div id="AssetsMenu"  class="divider-right">
          <div id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl00_AssetCategorySelectorPanel" class="verticaltab">
            <a id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl00_AssetCategorySelector" href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$cphRoblox$rbxUserAssetsPane$AssetCategoryRepeater$ctl00$AssetCategorySelector&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, true))">Heads</a>
          </div>
          <div id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl01_AssetCategorySelectorPanel" class="verticaltab">
            <a id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl01_AssetCategorySelector" href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$cphRoblox$rbxUserAssetsPane$AssetCategoryRepeater$ctl01$AssetCategorySelector&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, true))">Faces</a>
          </div>
          <div id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl02_AssetCategorySelectorPanel" class="verticaltab">
            <a id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl02_AssetCategorySelector" href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$cphRoblox$rbxUserAssetsPane$AssetCategoryRepeater$ctl02$AssetCategorySelector&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, true))">Gear</a>
          </div>
          <div id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl03_AssetCategorySelectorPanel" class="verticaltab selected">
            <a id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl03_AssetCategorySelector" href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$cphRoblox$rbxUserAssetsPane$AssetCategoryRepeater$ctl03$AssetCategorySelector&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, true))">Hats</a>
          </div>
          <div id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl04_AssetCategorySelectorPanel" class="verticaltab">
            <a id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl04_AssetCategorySelector" href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$cphRoblox$rbxUserAssetsPane$AssetCategoryRepeater$ctl04$AssetCategorySelector&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, true))">T-Shirts</a>
          </div>
          <div id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl05_AssetCategorySelectorPanel" class="verticaltab">
            <a id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl05_AssetCategorySelector" href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$cphRoblox$rbxUserAssetsPane$AssetCategoryRepeater$ctl05$AssetCategorySelector&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, true))">Shirts</a>
          </div>
          <div id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl06_AssetCategorySelectorPanel" class="verticaltab">
            <a id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl06_AssetCategorySelector" href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$cphRoblox$rbxUserAssetsPane$AssetCategoryRepeater$ctl06$AssetCategorySelector&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, true))">Pants</a>
          </div>
          <div id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl07_AssetCategorySelectorPanel" class="verticaltab">
            <a id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl07_AssetCategorySelector" href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$cphRoblox$rbxUserAssetsPane$AssetCategoryRepeater$ctl07$AssetCategorySelector&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, true))">Decals</a>
          </div>
          <div id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl08_AssetCategorySelectorPanel" class="verticaltab">
            <a id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl08_AssetCategorySelector" href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$cphRoblox$rbxUserAssetsPane$AssetCategoryRepeater$ctl08$AssetCategorySelector&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, true))">Models</a>
          </div>
          <div id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl09_AssetCategorySelectorPanel" class="verticaltab">
            <a id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl09_AssetCategorySelector" href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$cphRoblox$rbxUserAssetsPane$AssetCategoryRepeater$ctl09$AssetCategorySelector&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, true))">Plugins</a>
          </div>
          <div id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl10_AssetCategorySelectorPanel" class="verticaltab">
            <a id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl10_AssetCategorySelector" href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$cphRoblox$rbxUserAssetsPane$AssetCategoryRepeater$ctl10$AssetCategorySelector&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, true))">Places</a>
          </div>
          <div id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl11_AssetCategorySelectorPanel" class="verticaltab">
            <a id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl11_AssetCategorySelector" href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$cphRoblox$rbxUserAssetsPane$AssetCategoryRepeater$ctl11$AssetCategorySelector&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, true))">Game Passes</a>
          </div>
          <div id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl12_AssetCategorySelectorPanel" class="verticaltab">
            <a id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl12_AssetCategorySelector" href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$cphRoblox$rbxUserAssetsPane$AssetCategoryRepeater$ctl12$AssetCategorySelector&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, true))">Audio</a>
          </div>
          <div id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl13_AssetCategorySelectorPanel" class="verticaltab">
            <a id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl13_AssetCategorySelector" href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$cphRoblox$rbxUserAssetsPane$AssetCategoryRepeater$ctl13$AssetCategorySelector&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, true))">Badges</a>
          </div>
          <div id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl14_AssetCategorySelectorPanel" class="verticaltab">
            <a id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl14_AssetCategorySelector" href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$cphRoblox$rbxUserAssetsPane$AssetCategoryRepeater$ctl14$AssetCategorySelector&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, true))">Left Arms</a>
          </div>
          <div id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl15_AssetCategorySelectorPanel" class="verticaltab">
            <a id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl15_AssetCategorySelector" href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$cphRoblox$rbxUserAssetsPane$AssetCategoryRepeater$ctl15$AssetCategorySelector&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, true))">Right Arms</a>
          </div>
          <div id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl16_AssetCategorySelectorPanel" class="verticaltab">
            <a id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl16_AssetCategorySelector" href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$cphRoblox$rbxUserAssetsPane$AssetCategoryRepeater$ctl16$AssetCategorySelector&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, true))">Left Legs</a>
          </div>
          <div id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl17_AssetCategorySelectorPanel" class="verticaltab">
            <a id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl17_AssetCategorySelector" href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$cphRoblox$rbxUserAssetsPane$AssetCategoryRepeater$ctl17$AssetCategorySelector&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, true))">Right Legs</a>
          </div>
          <div id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl18_AssetCategorySelectorPanel" class="verticaltab">
            <a id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl18_AssetCategorySelector" href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$cphRoblox$rbxUserAssetsPane$AssetCategoryRepeater$ctl18$AssetCategorySelector&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, true))">Torsos</a>
          </div>
          <div id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl19_AssetCategorySelectorPanel" class="verticaltab">
            <a id="ctl00_cphRoblox_rbxUserAssetsPane_AssetCategoryRepeater_ctl19_AssetCategorySelector" href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$cphRoblox$rbxUserAssetsPane$AssetCategoryRepeater$ctl19$AssetCategorySelector&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, true))">Packages</a>
          </div>
        </div>
        <div id="AssetsContent">
          <table id="ctl00_cphRoblox_rbxUserAssetsPane_UserAssetsDataList" cellspacing="0" border="0" style="border-collapse:collapse;">
            <tr>
              <td class="Asset" valign="top">
                <div style="padding: 5px">
                  <div class="AssetThumbnail">
                    <a id="ctl00_cphRoblox_rbxUserAssetsPane_UserAssetsDataList_ctl00_AssetThumbnailHyperLink" class=" notranslate" title="Red Plaid Golf Cap" class=" notranslate" href="/Red-Plaid-Golf-Cap-item?id=125861531" style="display:inline-block;height:110px;width:110px;cursor:pointer;"><img src="http://t2.rbxcdn.com/e8ed1c7cb1846126666183997dbd69d1" height="110" width="110" border="0" onerror="return Roblox.Controls.Image.OnError(this)" alt="Red Plaid Golf Cap" class=" notranslate" /></a>
                  </div>
                  <div class="AssetDetails">
                    <div class="AssetName">
                      <a id="ctl00_cphRoblox_rbxUserAssetsPane_UserAssetsDataList_ctl00_AssetNameHyperLink" class="noranslate" href="/Red-Plaid-Golf-Cap-item?id=125861531">Red Plaid Golf Cap</a>
                    </div>
                    <div class="AssetCreator">
                      <span class="Label">Creator: </span><span class="Detail notranslate">
                      <a id="ctl00_cphRoblox_rbxUserAssetsPane_UserAssetsDataList_ctl00_AssetCreatorHyperLink" href="User.aspx?ID=1">ROBLOX</a></span>
                    </div>
                    <div id="ctl00_cphRoblox_rbxUserAssetsPane_UserAssetsDataList_ctl00_Div1" class="AssetPrice">
                      <span class="PriceInRobux notranslate">
                      R$: 15</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </table>
          <div id="ctl00_cphRoblox_rbxUserAssetsPane_FooterPagerPanel" class="FooterPager" style="width: 780px">
            <span class="pager previous disabled"></span>
            <span id="ctl00_cphRoblox_rbxUserAssetsPane_FooterPagerLabel" style="vertical-align: top; display: inline-block; padding: 5px; padding-top: 6px">Page 1 of 252</span>
            <a id="ctl00_cphRoblox_rbxUserAssetsPane_FooterPageSelector_Next" href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$cphRoblox$rbxUserAssetsPane$FooterPageSelector_Next&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, true))"><span class="pager next"></span></a>
          </div>
        </div>
        <div style="clear: both;"></div>
        <div id="ctl00_cphRoblox_rbxUserAssetsPane_CreateSetPanelDiv" class="createSetPanelPopup" style="width: 400px; height: 100%; padding: 0px; float: left; display: none">         </div>
        <div style="clear:both"></div>
      </div>
    </div>
  </div>
</div>

<?php include $_SERVER["DOCUMENT_ROOT"] . "/puzzle/Bottom.php";?>