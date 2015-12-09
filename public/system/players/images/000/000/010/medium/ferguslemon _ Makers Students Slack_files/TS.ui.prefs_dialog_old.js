(function(){"use strict";TS.registerModule("ui.prefs_dialog",{showing:false,onStart:function(){TS.prefs.sidebar_theme_changed_sig.add(_updateThemeControls);TS.prefs.dtop_notif_changed_sig.add(_updateNotificationControls);TS.prefs.read_changed_sig.add(_updateReadControls);TS.prefs.display_real_names_override_changed_sig.add(_updateRealNameControls);TS.prefs.team_display_real_names_changed_sig.add(_updateRealNameControls);TS.prefs.mac_speak_changed_sig.add(_updateMacSpeakControls)},switchToDebuggingPrefs:function(){_cancel();setTimeout(TS.ui.debug_prefs_dialog.start,500)},onGrowlsPermissionLinkClick:function(){TS.info("button clicked");$("#growls_permission_div").addClass("hidden");$("#growls_instructions_div").removeClass("hidden");TS.ui.growls.promptForPermission(function(allowed,permission_level){TS.info("callback called allowed:"+allowed+" permission_level:"+permission_level);$("#growls_instructions_div").addClass("hidden");if(permission_level=="granted"&&allowed){$("#growls_allowed_div").removeClass("hidden").find(".desktop_notifications_title").addClass("kelly_green").text("Desktop Notifications enabled!");if(!TS.model.prefs.growls_enabled){TS.prefs.setPrefByAPI({name:"growls_enabled",value:true});TS.model.prefs.growls_enabled=true}_updateNotificationControls()}else if(permission_level=="default"){$("#growls_permission_div").removeClass("hidden")}else if(permission_level=="denied"){$("#growls_disallowed_div").removeClass("hidden")}else{alert("huh allowed:"+allowed+" permission_level:"+permission_level)}})},start:function(tab,highlight_selector){tab=tab||_last_tab;if(!TS.model.ms_logged_in_once||!TS.model.prefs||$("body").hasClass("loading")||TS.ui.prefs_dialog.showing){return}if(!_div)_build();var input_val=TS.model.prefs.highlight_words||"";input_val=input_val.replace(/\,/g,", ").replace(/\ \ /g," ");var active_channels=[];var archived_channels=[];var search_channel_exclusion;var channels=TS.channels.getChannelsForUser();channels.sort(function compare(a,b){var a_srt=a._name_lc;var b_srt=b._name_lc;if(a_srt<b_srt)return-1;if(a_srt>b_srt)return 1;return 0});for(var i in channels){var c=channels[i];search_channel_exclusion=false;if($.inArray(c.id,TS.model.search_exclude_channels)!=-1)search_channel_exclusion=true;if(c.is_archived){archived_channels.push({search_channel_exclusion:search_channel_exclusion,channel:c})}else{active_channels.push({search_channel_exclusion:search_channel_exclusion,channel:c})}}var show_mac_ssb_prefs=TS.model.mac_ssb_version&&TS.model.mac_ssb_version>=.32;var show_win_ssb_prefs=TS.model.win_ssb_version&&!TS.model.is_lin;var show_lin_ssb_prefs=TS.model.lin_ssb_version;var template_args={member:TS.model.user,highlight_words:input_val,presence_str:TS.view.getUserPresenceStr(),prefs:TS.model.prefs,team_prefs:TS.model.team.prefs,active_channels:active_channels,archived_channels:archived_channels,inline_img_byte_limit:TS.model.inline_img_byte_limit,notification_sounds:TS.boot_data.notification_sounds,show_mac_ssb_prefs:show_mac_ssb_prefs,show_win_ssb_prefs:show_win_ssb_prefs,show_lin_ssb_prefs:show_lin_ssb_prefs,feature_chat_sounds:TS.boot_data.feature_chat_sounds,team_name:TS.model.team.name};if(TS.ui.growls.canSpeak()){template_args.speak_voices=TS.ui.growls.getVoices();template_args.speak_speeds=[50,100,150,200,250,300,350,400];template_args.show_voices=true}if(TS.model.prefs.sidebar_theme_custom_values&&TS.model.prefs.sidebar_theme_custom_values!="undefined"){template_args.theme=JSON.parse(TS.model.prefs.sidebar_theme_custom_values);if(TS.model.prefs.sidebar_theme&&(TS.model.prefs.sidebar_theme=="cotton_theme"||TS.model.prefs.sidebar_theme=="eco_theme")){template_args.show_customization_ui=true}else{template_args.show_customization_ui=_show_customization_ui}}var html=TS.templates.prefs_dialog(template_args);_div.empty();_div.html(html);var $read_tips=_div.find("#read_tips");$read_tips.html(TS.emoji.replace($read_tips.html()));_div.find(".modal-nav a").bind("click",function(){_openTab($(this).data("which"))});_openTab(tab);$("#all_channels_loud_p").addClass("hidden");$(".growls_stuff").addClass("hidden");if(TS.ui.growls.shouldShowPermissionButton()){$("#growls_permission_div").removeClass("hidden")}else{if(TS.ui.growls.checkPermission()){$("#growls_allowed_div").removeClass("hidden")}else{if(TS.ui.growls.no_notifications){$("#growls_impossible_div").removeClass("hidden")}else if(TS.ui.growls.getPermissionLevel()=="denied"){$("#growls_disallowed_div").removeClass("hidden")}}}if(show_mac_ssb_prefs){$("#mac_ssb_bounce_cb").prop("checked",!!TS.model.prefs.mac_ssb_bounce);$("#mac_ssb_bounce_short_cb").prop("checked",TS.model.prefs.mac_ssb_bounce!="long");var updateBounceShortCB=function(){if(!!TS.model.prefs.mac_ssb_bounce){$("#mac_ssb_bounce_short_cb").prop("disabled",false)}else{$("#mac_ssb_bounce_short_cb").prop("disabled",true)}};updateBounceShortCB();$("#mac_ssb_bounce_cb").bind("change",function(){var val=!!$(this).prop("checked");var short_val=!!$("#mac_ssb_bounce_short_cb").prop("checked");TS.model.prefs.mac_ssb_bounce=val?short_val?"short":"long":"";TS.prefs.setPrefByAPI({name:"mac_ssb_bounce",value:TS.model.prefs.mac_ssb_bounce});updateBounceShortCB()});$("#mac_ssb_bounce_short_cb").bind("change",function(){var val=!!$(this).prop("checked");TS.prefs.setPrefByAPI({name:"mac_ssb_bounce",value:val?"short":"long"})});$("#mac_ssb_bullet_cb").prop("checked",TS.model.prefs.mac_ssb_bullet===true);$("#mac_ssb_bullet_cb").bind("change",function(){var val=!!$(this).prop("checked");TS.prefs.setPrefByAPI({name:"mac_ssb_bullet",value:val})})}if(show_win_ssb_prefs||show_lin_ssb_prefs){$("#winssb_launch_on_start_cb").prop("checked",_getElectronSsbPref("launchOnStartup"));$("#winssb_launch_on_start_cb").bind("change",function(){var val=!!$(this).prop("checked");_setElectronSsbPref("launchOnStartup",val)});$("#winssb_run_from_tray_cb").prop("checked",_getElectronSsbPref("runFromTray"));$("#winssb_run_from_tray_cb").bind("change",function(){var val=!!$(this).prop("checked");_setElectronSsbPref("runFromTray",val)});if(_hasElectronSsbPref("windowFlashBehavior")){$('input:radio[name="winssb_flash_window_rd"]').filter('[value="'+_getElectronSsbPref("windowFlashBehavior")+'"]').prop("checked",true);$('input:radio[name="winssb_flash_window_rd"]').bind("change",function(){var val=$(this).val();_setElectronSsbPref("windowFlashBehavior",val);$('input:radio[name="winssb_flash_window_rd"]').filter('[value="'+val+'"]').prop("checked",true)})}else{$("#winssb_flash_window_heading").addClass("hidden");$("#winssb_flash_window_choices").addClass("hidden")}if(_hasElectronSsbPref("useHwAcceleration")){$("#winssb_disable_hw_acceleration_cb").prop("checked",!_getElectronSsbPref("useHwAcceleration"));$("#winssb_disable_hw_acceleration_cb").bind("change",function(){var val=!$(this).prop("checked");_setElectronSsbPref("useHwAcceleration",val)})}else{$("#winssb_disable_hw_acceleration_pref").addClass("hidden");$("#winssb_disable_hw_acceleration_note").addClass("hidden")}if(_hasElectronSsbPref("notifyPosition")){var pos=_getElectronSsbPref("notifyPosition");$("#winssb_notify_corner").val(pos.corner);$("#winssb_notify_corner").bind("change",function(){var corner=$(this).val();var display=$("#winssb_notify_display").val();_setElectronSsbPref("notifyPosition",{corner:corner,display:display})});$("#winssb_notify_display").val(pos.display);$("#winssb_notify_display").bind("change",function(){var corner=$("#winssb_notify_corner").val();var display=$(this).val();_setElectronSsbPref("notifyPosition",{corner:corner,display:display})})}else{$("#winssb_notify_prefs_heading").addClass("hidden");$("#winssb_notify_position").addClass("hidden")}var highlight_words_placeholder=$("#highlight_words_input").attr("placeholder");var has_placeholder=true;$("#highlight_words_input").bind("textchange",function(){if($(this).val()&&has_placeholder){$(this).attr("placeholder","");has_placeholder=false}else if(!$(this).val()&&!has_placeholder){$(this).attr("placeholder",highlight_words_placeholder);has_placeholder=true}})}_updateReadControls();$('input:radio[name="read_rd"]').bind("change",function(){var val=$(this).val();TS.prefs.setReadStateTrackingPref(val);_updateReadControls()});_updateThemeControls();_div.find('input:radio[name="sidebar_theme_rd"]').bind("change",function(){var name=$(this).val();var custom_values=TS.sidebar_themes.default_themes[name];_updateThemePrefsOptimistically(name,custom_values)});_div.find("input.color_hex").bind("textchange",function(){var hex=$.trim($(this).val());if(!hex.match(TS.prefs.hex_regex)){clearTimeout(_theme_throttle_tim);return}if(hex.indexOf("#")!==0){hex="#"+hex}$(this).prev(".color_swatch").css("background-color",hex).data("hex",hex);clearTimeout(_theme_throttle_tim);_theme_throttle_tim=setTimeout(function(){var name="custom_theme";var custom_values={column_bg:_div.find('input[name="color_column_bg_hex"]').val(),menu_bg:_div.find('input[name="color_menu_bg_hex"]').val(),active_item:_div.find('input[name="color_active_item_hex"]').val(),active_item_text:_div.find('input[name="color_active_item_text_hex"]').val(),hover_item:_div.find('input[name="color_hover_item_hex"]').val(),text_color:_div.find('input[name="color_text_color_hex"]').val(),active_presence:_div.find('input[name="color_active_presence_hex"]').val(),badge:_div.find('input[name="color_badge_hex"]').val()};$.each(custom_values,function(index,hex){if(hex[0]!=="#"){custom_values[index]="#"+hex}});_updateThemePrefsOptimistically(name,custom_values)},250)});_div.find("#sidebar_theme_custom").bind("textchange",function(e){var $custom_input=$(this);setTimeout(function(){var custom_input=$.trim($custom_input.val());var custom_arr=custom_input.replace(/ /g,"").split(",");var valid_values=true;$.each(custom_arr,function(index,hex){if(!hex.match(TS.prefs.hex_regex)){valid_values=false}if(!valid_values)return});if(!valid_values){clearTimeout(_theme_throttle_tim);return}var custom_values={column_bg:custom_arr[0],menu_bg:custom_arr[1],active_item:custom_arr[2],active_item_text:custom_arr[3],hover_item:custom_arr[4],text_color:custom_arr[5],active_presence:custom_arr[6],badge:custom_arr[7]};$.each(custom_values,function(index,hex){if(hex[0]!=="#"){custom_values[index]="#"+hex}});clearTimeout(_theme_throttle_tim);_theme_throttle_tim=setTimeout(function(){_updateThemePrefsOptimistically("custom_theme",custom_values)},250)},0)});_div.find(".color_swatch").bind("click.show_picker",function(e){e.stopPropagation();var $swatch=$(this);var $hex_input=$swatch.next("input");_div.find(".color_swatch.selected").removeClass("selected").find(".colpick").addClass("hidden");var init_color=$swatch.data("hex").replace("#","");$swatch.colpick({flat:true,layout:"hex",color:init_color,submit:0,onChange:function(hsb,hex,rgb,el,bySetColor){$swatch.css("background-color","#"+hex).data("hex","#"+hex);$hex_input.val("#"+hex);clearTimeout(_theme_throttle_tim);_theme_throttle_tim=setTimeout(function(){var name="custom_theme";var custom_values={column_bg:_div.find('input[name="color_column_bg_hex"]').val(),menu_bg:_div.find('input[name="color_menu_bg_hex"]').val(),active_item:_div.find('input[name="color_active_item_hex"]').val(),active_item_text:_div.find('input[name="color_active_item_text_hex"]').val(),hover_item:_div.find('input[name="color_hover_item_hex"]').val(),text_color:_div.find('input[name="color_text_color_hex"]').val(),active_presence:_div.find('input[name="color_active_presence_hex"]').val(),badge:_div.find('input[name="color_badge_hex"]').val()};_updateThemePrefsOptimistically(name,custom_values)},500)}}).colpickSetColor(init_color);$("html").bind("click.hide_colpick",function(){_div.find(".color_swatch.selected").removeClass("selected").find(".colpick").addClass("hidden")});$swatch.addClass("selected").find(".colpick").removeClass("hidden")});$("#customize_theme_toggle").bind("click",function(){$("#customize_theme_info").addClass("hidden");$("#prefs_themes_customize").removeClass("hidden");_show_customization_ui=true});_updateNotificationControls();$('input:radio[name="notifications_rd"]').bind("change",function(){var val=$(this).val();if(val=="all"||val=="mentions"){if(val=="all"){TS.prefs.setPrefByAPI({name:"all_channels_loud",value:true});TS.model.prefs.all_channels_loud=true}else{TS.prefs.setPrefByAPI({name:"all_channels_loud",value:false});TS.model.prefs.all_channels_loud=false}if(!TS.model.prefs.growls_enabled){TS.prefs.setPrefByAPI({name:"growls_enabled",value:true});TS.model.prefs.growls_enabled=true}}else{TS.prefs.setPrefByAPI({name:"growls_enabled",value:false});TS.model.prefs.growls_enabled=false}_updateNotificationControls()});$("#no_text_in_notifications_cb").bind("change",function(){var val=!$(this).prop("checked");TS.prefs.setPrefByAPI({name:"no_text_in_notifications",value:val})});$("#arrow_history_cb").prop("checked",TS.model.prefs.arrow_history===true);$("#arrow_history_cb").bind("change",function(){var val=!!$(this).prop("checked");TS.prefs.setPrefByAPI({name:"arrow_history",value:val})});$("#convert_emoticons_cb").prop("checked",TS.model.prefs.convert_emoticons===true);$("#convert_emoticons_cb").bind("change",function(){var val=!!$(this).prop("checked");TS.prefs.setPrefByAPI({name:"convert_emoticons",value:val})});$("#autoplay_chat_sounds_cb").prop("checked",TS.model.prefs.autoplay_chat_sounds===true);$("#autoplay_chat_sounds_cb").bind("change",function(){var val=!!$(this).prop("checked");TS.prefs.setPrefByAPI({name:"autoplay_chat_sounds",value:val})});$("#tab_ui_return_selects_cb").prop("checked",TS.model.prefs.tab_ui_return_selects===true);$("#tab_ui_return_selects_cb").bind("change",function(){var val=!!$(this).prop("checked");TS.prefs.setPrefByAPI({name:"tab_ui_return_selects",value:val})});$("#comma_key_prefs_cb").prop("checked",TS.model.prefs.comma_key_prefs===true);$("#comma_key_prefs_cb").bind("change",function(){var val=!!$(this).prop("checked");TS.prefs.setPrefByAPI({name:"comma_key_prefs",value:val})});$("#collapsible_cb").prop("checked",TS.model.prefs.collapsible===true);$("#collapsible_cb").bind("change",function(){var val=!!$(this).prop("checked");TS.prefs.setPrefByAPI({name:"collapsible",value:val});$("#collapsible_by_click_cb").prop("disabled",!val)});$("#collapsible_by_click_cb").prop("checked",TS.model.prefs.collapsible_by_click===true);$("#collapsible_by_click_cb").prop("disabled",!TS.model.prefs.collapsible);$("#collapsible_by_click_cb").bind("change",function(){var val=!!$(this).prop("checked");TS.prefs.setPrefByAPI({name:"collapsible_by_click",value:val})});$("#start_scroll_at_oldest_cb").prop("checked",TS.model.prefs.start_scroll_at_oldest===true);$("#start_scroll_at_oldest_cb").bind("change",function(){TS.prefs.setPrefByAPI({name:"start_scroll_at_oldest",value:!!$(this).prop("checked")})});$("#show_presence_cb").prop("checked",TS.model.prefs.show_member_presence===true);$("#show_presence_cb").bind("change",function(){TS.prefs.setPrefByAPI({name:"show_member_presence",value:!!$(this).prop("checked")})});$("#expand_inline_imgs_cb").prop("checked",TS.model.prefs.expand_inline_imgs===true);$("#expand_inline_imgs_cb").bind("change",function(){var val=!!$(this).prop("checked");TS.prefs.setPrefByAPI({name:"expand_inline_imgs",value:val});TS.model.prefs.expand_inline_imgs=val;$("#dont_obey_inline_img_limit_cb").prop("disabled",!TS.model.prefs.expand_inline_imgs)});$("#dont_obey_inline_img_limit_cb").prop("checked",TS.model.prefs.obey_inline_img_limit===false);$("#dont_obey_inline_img_limit_cb").bind("change",function(){_div.find("#dont_obey_inline_img_limit_p").css("background-color","");var val=!!$(this).prop("checked");TS.model.prefs.obey_inline_img_limit=!val;TS.prefs.setPrefByAPI({name:"obey_inline_img_limit",value:!val})});$("#dont_obey_inline_img_limit_cb").prop("disabled",!TS.model.prefs.expand_inline_imgs);$("#expand_internal_inline_imgs_cb").prop("checked",TS.model.prefs.expand_internal_inline_imgs===true);$("#expand_internal_inline_imgs_cb").bind("change",function(){TS.prefs.setPrefByAPI({name:"expand_internal_inline_imgs",value:!!$(this).prop("checked")})});$("#webapp_spellcheck_cb").prop("checked",TS.model.prefs.webapp_spellcheck===true).removeClass("hidden");$("#webapp_spellcheck_cb").bind("change",function(){TS.prefs.setPrefByAPI({name:"webapp_spellcheck",value:!!$(this).prop("checked")})});$("#require_at_cb").prop("checked",TS.model.prefs.require_at===true).removeClass("hidden");$("#require_at_cb").bind("change",function(){TS.prefs.setPrefByAPI({name:"require_at",value:!!$(this).prop("checked")})});$("#mute_sounds_cb").prop("checked",TS.model.prefs.mute_sounds===true);$("#mute_sounds_cb").bind("change",function(){var val=!!$(this).prop("checked");TS.model.prefs.mute_sounds=val;TS.prefs.setPrefByAPI({name:"mute_sounds",value:val});$("#soundpreview").addClass("hidden");if(TS.model.prefs.mute_sounds){$("#new_msg_snd_select").val("none")}else{$("#new_msg_snd_select").val(TS.model.prefs.new_msg_snd);if(TS.model.prefs.new_msg_snd!="none")$("#soundpreview").removeClass("hidden")}});$("#show_typing_cb").prop("checked",TS.model.prefs.show_typing===true).removeClass("hidden");$("#show_typing_cb").bind("change",function(){TS.prefs.setPrefByAPI({name:"show_typing",value:!!$(this).prop("checked")})});$("#pagekeys_handled_cb").prop("checked",TS.model.prefs.pagekeys_handled===true).removeClass("hidden");$("#pagekeys_handled_cb").bind("change",function(){TS.prefs.setPrefByAPI({name:"pagekeys_handled",value:!!$(this).prop("checked")})});$("#f_key_search_cb").prop("checked",TS.model.prefs.f_key_search===true).removeClass("hidden");$("#f_key_search_cb").bind("change",function(){TS.prefs.setPrefByAPI({name:"f_key_search",value:!!$(this).prop("checked")})});$("#k_key_omnibox_cb").prop("checked",TS.model.prefs.k_key_omnibox===true).removeClass("hidden");$("#k_key_omnibox_cb").bind("change",function(){TS.prefs.setPrefByAPI({name:"k_key_omnibox",value:!!$(this).prop("checked")})});$("#no_omnibox_in_channels_cb").prop("checked",TS.model.prefs.no_omnibox_in_channels===true).removeClass("hidden");$("#no_omnibox_in_channels_cb").bind("change",function(){TS.prefs.setPrefByAPI({name:"no_omnibox_in_channels",value:!!$(this).prop("checked")})});_updateMacSpeakControls();$("#speak_growls_cb").bind("change",function(){var val=!!$(this).prop("checked");TS.prefs.setPrefByAPI({name:"speak_growls",value:val})});$("#mac_speak_voice_select").bind("change",function(){var val=$(this).val();TS.model.prefs.mac_speak_voice=val;TS.prefs.setPrefByAPI({name:"mac_speak_voice",value:val});$("#mac_speak_test").trigger("click")});$("#mac_speak_speed_select").bind("change",function(){var val=parseInt($(this).val());TS.model.prefs.mac_speak_speed=val;TS.prefs.setPrefByAPI({name:"mac_speak_speed",value:val});$("#mac_speak_test").trigger("click")});$("#mac_speak_test").bind("click",function(){if(!TS.ui.growls.speakQ.length){TS.ui.growls.speak("Time flies like an arrow, fruit flies like a banana.",true,TS.model.prefs.mac_speak_voice,TS.model.prefs.mac_speak_speed)}});_updateRealNameControls();$("#display_real_names_override_cb").bind("change",function(){var checked=!!$(this).prop("checked");var val;if(TS.model.team.prefs.display_real_names){val=checked?0:-1}else{val=checked?1:0}TS.prefs.setPrefByAPI({name:"display_real_names_override",value:val})});$("#time24_cb").prop("checked",TS.model.prefs.time24===true);$("#time24_cb").bind("change",function(){TS.prefs.setPrefByAPI({name:"time24",value:!!$(this).prop("checked")})});$("#enter_is_special_in_tbt_tip").tooltip();$("#enter_is_special_in_tbt_cb").prop("checked",TS.model.prefs.enter_is_special_in_tbt===true);$("#enter_is_special_in_tbt_cb").bind("change",function(){TS.prefs.setPrefByAPI({name:"enter_is_special_in_tbt",value:!!$(this).prop("checked")})});$("#expand_non_media_attachments_cb").prop("checked",TS.model.prefs.expand_non_media_attachments===true);$("#expand_non_media_attachments_cb").bind("change",function(){TS.prefs.setPrefByAPI({name:"expand_non_media_attachments",value:!!$(this).prop("checked")})});$('input:radio[name="emoji_mode_select"]').filter('[value="'+TS.model.prefs.emoji_mode+'"]').prop("checked",true);$('input:radio[name="emoji_mode_select"]').bind("change",function(){TS.prefs.setPrefByAPI({name:"emoji_mode",value:$(this).val()})});$('input:radio[name="messages_theme_select"]').filter('[value="'+TS.model.prefs.messages_theme+'"]').prop("checked",true);$('input:radio[name="messages_theme_select"]').bind("change",function(){TS.prefs.setPrefByAPI({name:"messages_theme",value:$(this).val()})});$("#ls_disabled_cb").prop("checked",TS.model.prefs.ls_disabled===true);$("#ls_disabled_cb").bind("change",function(){var val=!!$(this).prop("checked");TS.model.prefs.ls_disabled=val;TS.prefs.setPrefByAPI({name:"ls_disabled",value:val});TS.storage.setDisabled(TS.model.prefs.ls_disabled)});$("#ss_emojis_cb").prop("checked",TS.model.prefs.ss_emojis!==true);$("#ss_emojis_cb").bind("change",function(){var val=!$(this).prop("checked");TS.model.prefs.ss_emojis=val;TS.prefs.setPrefByAPI({name:"ss_emojis",value:val})});$("#full_text_extracts_cb").prop("checked",TS.model.prefs.full_text_extracts===true);$("#full_text_extracts_cb").bind("change",function(){var val=!!$(this).prop("checked");TS.model.prefs.full_text_extracts=val;TS.prefs.setPrefByAPI({name:"full_text_extracts",value:val})});$("#fuzzy_matching_cb").prop("checked",TS.model.prefs.fuzzy_matching===true);$("#fuzzy_matching_cb").bind("change",function(){var val=!!$(this).prop("checked");TS.model.prefs.fuzzy_matching=val;TS.prefs.setPrefByAPI({name:"fuzzy_matching",value:val})});$("#load_lato_2_cb").prop("checked",TS.model.prefs.load_lato_2===true);$("#load_lato_2_cb").bind("change",function(){var val=!!$(this).prop("checked");TS.model.prefs.load_lato_2=val;TS.prefs.setPrefByAPI({name:"load_lato_2",value:val},function(){TS.reload()})});$("#flex_resize_window_cb").prop("checked",TS.model.prefs.flex_resize_window===true);$("#flex_resize_window_cb").bind("change",function(){var val=!!$(this).prop("checked");TS.model.prefs.flex_resize_window=val;TS.prefs.setPrefByAPI({name:"flex_resize_window",value:val})});$("#screenhero_cb").prop("checked",TS.model.prefs.screenhero_enabled===true);$("#screenhero_cb").bind("change",function(){var val=!!$(this).prop("checked");TS.model.prefs.screenhero_enabled=val;TS.prefs.setPrefByAPI({name:"screenhero_enabled",value:val})});$("#ask_after_away_cb").prop("checked",TS.model.prefs.confirm_user_marked_away===true);$("#ask_after_away_cb").bind("change",function(){var val=!!$(this).prop("checked");TS.model.prefs.confirm_user_marked_away=val;TS.prefs.setPrefByAPI({name:"confirm_user_marked_away",value:val})});var surprise_suffix=Math.random();$("#emo_bear").attr("src","/img/emo_bear.gif?"+surprise_suffix);$("#surprise_me").on("change",function(){$("#surprise").fadeIn(150,function(){setTimeout(function(){$("#surprise").fadeOut(500,function(){surprise_suffix=Math.random();$("#emo_bear").attr("src","/img/emo_bear.gif?"+surprise_suffix);$("#surprise_me").prop("checked",false)})},2400)})});if(TS.boot_data.feature_filter_select_component){$("#search_channel_exclusion").filterSelect({placeholder_text:"Pick channels to exclude..."}).hide();$("#search_channel_exclusion").filterSelect("getInstance").$list_container.css("max-height","180px")}else{$("#search_channel_exclusion").chosen({placeholder_text_multiple:"Click here to pick channels to exclude...",optional_prefix:"#"})}$("#search_channel_exclusion_chzn").find(".chzn-results").css("max-height","200px");$("#search_channel_exclusion_holder").css("min-height",235);$(".modal-body").css("overflow-y","visible");$("#search_channel_exclusion_chzn").css("width","100%");$("#search_channel_exclusion_chzn").find(".default").css("width","100%");$("#search_channel_exclusion").bind("change",function(){var channels=$(this).val();TS.prefs.setPrefByAPI({name:"search_exclude_channels",value:channels?channels.join(","):""})});$("#soundpreview").bind("click",function(){var val=$("#new_msg_snd_select").val();TS.sounds.play(val)});if(TS.model.prefs.new_msg_snd=="none"||TS.model.prefs.mute_sounds){$("#soundpreview").addClass("hidden")}else{$("#soundpreview").removeClass("hidden")}$("#new_msg_snd_select").val(TS.model.prefs.mute_sounds?"none":TS.model.prefs.new_msg_snd);$("#new_msg_snd_select").change(function(){var val=$("#new_msg_snd_select").val();if(val!="none"&&TS.model.prefs.mute_sounds){TS.model.prefs.mute_sounds=false;TS.prefs.setPrefByAPI({name:"mute_sounds",value:false});$("#mute_sounds_cb").prop("checked",false)}if(val!="none"){$("#soundpreview").removeClass("hidden");TS.sounds.play(val)}else{$("#soundpreview").addClass("hidden")}TS.prefs.setPrefByAPI({name:"new_msg_snd",value:val})});$("#sidebar_behavior_select").val(TS.model.prefs.sidebar_behavior);$("#sidebar_behavior_select").change(function(){var val=$("#sidebar_behavior_select").val();TS.prefs.setPrefByAPI({name:"sidebar_behavior",value:val});TS.prefs.onPrefChanged({name:"sidebar_behavior",value:val})});$("#msg_preview_cb").prop("checked",TS.model.prefs.msg_preview===true);$("#msg_preview_cb").bind("change",function(){var val=!!$(this).prop("checked");TS.prefs.setPrefByAPI({name:"msg_preview",value:val});$("#msg_preview_displaces_cb").prop("disabled",!val);$("#msg_preview_persistent_cb").prop("disabled",!val);TS.prefs.onPrefChanged({name:"msg_preview",value:val})});$("#msg_preview_displaces_cb").prop("checked",TS.model.prefs.msg_preview_displaces===true);$("#msg_preview_displaces_cb").prop("disabled",!TS.model.prefs.msg_preview);$("#msg_preview_displaces_cb").bind("change",function(){var val=!!$(this).prop("checked");TS.prefs.setPrefByAPI({name:"msg_preview_displaces",value:val});TS.prefs.onPrefChanged({name:"msg_preview_displaces",value:val});if(!val){TS.prefs.setPrefByAPI({name:"msg_preview_persistent",value:val});$("#msg_preview_persistent_cb").prop("checked",val);TS.prefs.onPrefChanged({name:"msg_preview_persistent",value:val})}});$("#msg_preview_persistent_cb").prop("checked",TS.model.prefs.msg_preview_persistent===true);$("#msg_preview_persistent_cb").prop("disabled",!TS.model.prefs.msg_preview);$("#msg_preview_persistent_cb").bind("change",function(){var val=!!$(this).prop("checked");TS.prefs.setPrefByAPI({name:"msg_preview_persistent",value:val});TS.prefs.onPrefChanged({name:"msg_preview_persistent",value:val});if(val){TS.prefs.setPrefByAPI({name:"msg_preview_displaces",value:val});$("#msg_preview_displaces_cb").prop("checked",val);TS.prefs.onPrefChanged({name:"msg_preview_displaces",value:val})}});if(TS.boot_data.feature_separate_private_channels){$("#separate_private_channels_cb").prop("checked",TS.model.prefs.separate_private_channels===true);$("#separate_private_channels_cb").bind("change",function(){var val=!!$(this).prop("checked");TS.prefs.setPrefByAPI({name:"separate_private_channels",value:val})})}_div.modal("show");if(TS.boot_data.app!="mobile"&&TS.qs_args["new_scroll"]!="0"){var debug=TS.qs_args["debug_scroll"]=="1";_div.find(".dialog_tab_pane_scroller").monkeyScroll({debug:debug})}_div.find(".dialog_cancel").click(_cancel);_div.find(".dialog_go").click(_go);if(highlight_selector){_div.find(highlight_selector).css("background-color","#FFF3B8")}_initSidebarUnDimming();if(tab=="themes"){_unDimSidebar()}}});var _div=null;var _last_tab="notifications";var _theme_throttle_tim=0;var _show_customization_ui=false;var _initSidebarUnDimming=function(){var width=$("#col_channels_bg").width();var $sidebar_overlay=$('<div id="sidebar_overlay"></div>').css({position:"absolute",top:"0",bottom:"0",left:"-"+width+"px",width:width+"px"});$(".modal-backdrop").append($sidebar_overlay)};var _unDimSidebar=function(){var sidebar_width=$("#col_channels_bg").width();$(".modal-backdrop").css("left",sidebar_width+"px")};var _reDimSidebar=function(){$(".modal-backdrop").css("left","0")};var _updateThemeControls=function(remove_last_theme_selected){remove_last_theme_selected=remove_last_theme_selected!==false;if(TS.prefs.last_theme_selected_in_UI&&TS.model.prefs.sidebar_theme!==TS.prefs.last_theme_selected_in_UI){return}else if(TS.prefs.last_theme_selected_in_UI&&remove_last_theme_selected){TS.prefs.last_theme_selected_in_UI=null}if(TS.model.prefs.sidebar_theme=="default"){TS.model.prefs.sidebar_theme="default_theme"}var val=TS.model.prefs.sidebar_theme;$('input:radio[name="sidebar_theme_rd"]').filter('[value="'+val+'"]').prop("checked",true);if(TS.model.prefs.sidebar_theme_custom_values&&TS.model.prefs.sidebar_theme_custom_values!="undefined"){var theme_values_ob=JSON.parse(TS.model.prefs.sidebar_theme_custom_values);var theme_values_arr=$.map(theme_values_ob,function(val){return val});if(_div){_div.find('input[name="color_column_bg_hex"]').val(theme_values_ob.column_bg);_div.find('input[name="color_menu_bg_hex"]').val(theme_values_ob.menu_bg);_div.find('input[name="color_active_item_hex"]').val(theme_values_ob.active_item);_div.find('input[name="color_active_item_text_hex"]').val(theme_values_ob.active_item_text);_div.find('input[name="color_hover_item_hex"]').val(theme_values_ob.hover_item);_div.find('input[name="color_text_color_hex"]').val(theme_values_ob.text_color);_div.find('input[name="color_active_presence_hex"]').val(theme_values_ob.active_presence);_div.find('input[name="color_badge_hex"]').val(theme_values_ob.badge);_div.find('.color_swatch[data-theme-element="column_bg"]').css("background-color",theme_values_ob.column_bg).data("hex",theme_values_ob.column_bg);_div.find('.color_swatch[data-theme-element="menu_bg"]').css("background-color",theme_values_ob.menu_bg).data("hex",theme_values_ob.menu_bg);_div.find('.color_swatch[data-theme-element="active_item"]').css("background-color",theme_values_ob.active_item).data("hex",theme_values_ob.active_item);_div.find('.color_swatch[data-theme-element="active_item_text"]').css("background-color",theme_values_ob.active_item_text).data("hex",theme_values_ob.active_item_text);_div.find('.color_swatch[data-theme-element="hover_item"]').css("background-color",theme_values_ob.hover_item).data("hex",theme_values_ob.hover_item);_div.find('.color_swatch[data-theme-element="text_color"]').css("background-color",theme_values_ob.text_color).data("hex",theme_values_ob.text_color);_div.find('.color_swatch[data-theme-element="active_presence"]').css("background-color",theme_values_ob.active_presence).data("hex",theme_values_ob.active_presence);_div.find('.color_swatch[data-theme-element="badge"]').css("background-color",theme_values_ob.badge).data("hex",theme_values_ob.badge);$("#sidebar_theme_custom").val(theme_values_arr.join(","))}}};var _hasElectronSsbPref=function(name){if(window.winssb.app.hasPreference){return window.winssb.app.hasPreference(name)}switch(name){case"launchOnStartup":case"runFromTray":return true;case"windowFlashBehavior":return window.winssb.app.windowFlashBehavior;case"useHwAcceleration":return window.winssb.app.useHwAcceleration;case"notifyPosition":return window.winssb.app.canSetNotificationPosition?window.winssb.app.canSetNotificationPosition():window.winssb.notice.getPosition&&window.winssb.notice.setPosition;default:return false}};var _getElectronSsbPref=function(name){if(window.winssb.app.getPreference){return window.winssb.app.getPreference(name)}switch(name){case"launchOnStartup":return!!window.winssb.app.willLaunchOnStartup;case"runFromTray":return!!TS.model.prefs.winssb_run_from_tray;case"windowFlashBehavior":return TS.model.prefs.winssb_window_flash_behavior;case"useHwAcceleration":return window.winssb.app.willUseHwAcceleration;case"notifyPosition":return window.winssb.notice.getPosition()}};var _setElectronSsbPref=function(name,val){if(window.winssb.app.setPreference){window.winssb.app.setPreference({name:name,value:val});return}switch(name){case"launchOnStartup":window.winssb.app.launchOnStartup(val);break;case"runFromTray":TS.prefs.setPrefByAPI({name:"winssb_run_from_tray",value:val});break;case"windowFlashBehavior":TS.prefs.setPrefByAPI({name:"winssb_window_flash_behavior",value:val});break;case"useHwAcceleration":window.winssb.app.useHwAcceleration(val);break;case"notifyPosition":
window.winssb.notice.setPosition(val);break}};var _updateNotificationControls=function(){var val="all";if(!TS.model.prefs.growls_enabled){val="never"}else if(!TS.model.prefs.all_channels_loud){val="mentions"}$("#growls_test").css("visibility","");$('input:radio[name="notifications_rd"]').filter('[value="'+val+'"]').prop("checked",true);var non_default_html=TS.templates.builders.buildNonDefaultNotificationBlock("margin-left");if(non_default_html){$(".non_default").removeClass("hidden");$("#non_default_html").html(non_default_html);$("#no_non_default").addClass("hidden")}else{$(".non_default").addClass("hidden");$("#no_non_default").removeClass("hidden")}$("#non_default_tip_link").tooltip("destroy").attr("title",TS.templates.builders.buildNonDefaultNotificationBlock("align_left")).tooltip({html:true});if(val=="never"){$("#no_text_in_notifications_cb").prop("disabled",true).prop("checked",false)}else{$("#no_text_in_notifications_cb").prop("disabled",false).prop("checked",TS.model.prefs.no_text_in_notifications!==true)}};var _updateReadControls=function(){var val=TS.prefs.getReadStateTrackingPref();$('input:radio[name="read_rd"]').filter('[value="'+val+'"]').prop("checked",true)};var _updateRealNameControls=function(){var $display_real_names_override_cb=$("#display_real_names_override_cb");var override=TS.model.prefs.display_real_names_override;$display_real_names_override_cb.prop("checked",TS.model.team.prefs.display_real_names&&override!=-1||override==1);if(TS.model.team.prefs.display_real_names){$("#display_real_names_default").removeClass("hidden");$("#display_usernames_default").addClass("hidden")}else{$("#display_real_names_default").addClass("hidden");$("#display_usernames_default").removeClass("hidden")}};var _updateMacSpeakControls=function(){$("#speak_growls_cb").prop("checked",TS.model.prefs.speak_growls===true);$("#mac_speak_voice_select").val(TS.model.prefs.mac_speak_voice);$("#mac_speak_speed_select").val(TS.model.prefs.mac_speak_speed)};var _onKeydown=function(e){if(!TS.ui.prefs_dialog.showing)return;if(e.which==TS.utility.keymap.enter){if(TS.utility.getActiveElementProp("NODENAME")=="BODY"){_go();e.preventDefault()}}else if(e.which==TS.utility.keymap.esc){_cancel()}};var _updateThemePrefsOptimistically=function(name,custom_values){var remove_last_theme_selected=false;TS.prefs.last_theme_selected_in_UI=name;TS.prefs.setPrefByAPI({name:"sidebar_theme",value:name});TS.prefs.setPrefByAPI({name:"sidebar_theme_custom_values",value:JSON.stringify(custom_values)});TS.model.prefs.sidebar_theme=name;TS.prefs.setSidebarThemeCustomValues(custom_values);_updateThemeControls(remove_last_theme_selected);TS.view.sidebarThemePrefChanged(remove_last_theme_selected)};var _openTab=function(tab){var $tab=_div.find('.modal-nav a[data-which="'+tab+'"]');_div.find(".modal-nav a").removeClass("active");_div.find(".dialog_tab_pane").removeClass("active");$tab.addClass("active");$("#"+$tab.data("pane-id")).addClass("active");_last_tab=tab;if(tab=="themes"){_unDimSidebar()}else{_reDimSidebar()}TS.client.ui.updateClosestMonkeyScroller(_div.find(".dialog_tab_pane.active .dialog_tab_pane_scroller"));_div.find(".dialog_tab_pane").scrollTop(0)};var _build=function(){$("body").append('<div id="new_prefs_dialog" class="modal hide fade"></div>');_div=$("#new_prefs_dialog");_div.on("hide",function(e){if(e.target!=this)return;_end()});_div.on("show",function(e){if(e.target!=this)return;TS.ui.prefs_dialog.showing=TS.model.dialog_is_showing=true});_div.on("shown",function(e){if(e.target!=this)return;$(window.document).bind("keydown",_onKeydown);TS.client.ui.updateClosestMonkeyScroller(_div.find(".dialog_tab_pane.active .dialog_tab_pane_scroller"));_div.find(".modal-body").scrollTop(0)})};var _end=function(){$("html").unbind("click.hide_colpick");TS.ui.prefs_dialog.showing=TS.model.dialog_is_showing=false;$(window.document).unbind("keydown",_onKeydown)};var _go=function(){if(!TS.ui.prefs_dialog.showing){TS.error("not showing?");return}TS.prefs.saveHighlightWords(_div.find("#highlight_words_input").val());_div.modal("hide")};var _cancel=function(){_div.modal("hide")}})();