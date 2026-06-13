(function(){
    var script = {
 "start": "this.init(); this.syncPlaylists([this.ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_807BAF04_8E22_670D_41B7_872D69E5EABA].forEach(function(component) { component.set('visible', false); }) }",
 "overflow": "visible",
 "children": [
  "this.MainViewer",
  "this.Container_807F782A_8E23_A905_41DE_623121285A09",
  "this.Container_82CEEC30_9220_D3AB_41D9_A91DB817BCCC",
  "this.ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472",
  "this.Container_8A3F064F_9747_905B_41D4_9169FB3EB41E",
  "this.Image_E75D7FB5_F538_3297_41CA_C93BFF557E4D"
 ],
 "height": "100%",
 "id": "rootPlayer",
 "paddingLeft": 0,
 "mobileMipmappingEnabled": false,
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "class": "Player",
 "width": "100%",
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "minHeight": 20,
 "propagateClick": false,
 "buttonToggleFullscreen": "this.IconButton_807BAF04_8E22_670D_41B7_872D69E5EABA",
 "scripts": {
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "registerKey": function(key, value){  window[key] = value; },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "existsKey": function(key){  return key in window; },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "unregisterKey": function(key){  delete window[key]; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "getKey": function(key){  return window[key]; }
 },
 "scrollBarColor": "#000000",
 "vrPolyfillScale": 0.85,
 "verticalAlign": "top",
 "minWidth": 20,
 "definitions": [{
 "initialPosition": {
  "hfov": 100,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_B2DC4FB4_BF1D_1A60_41E0_6E3B943A0CEB_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 169.21,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_AE9BD6FA_BF3B_6BE3_41E3_0547835A27E4",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "duration": 5000,
 "class": "Photo",
 "label": "1. EXT 1 - CABA\u00d1A VT1",
 "id": "photo_7A1D2634_714C_3CEE_41D0_EA423895C904",
 "thumbnailUrl": "media/photo_7A1D2634_714C_3CEE_41D0_EA423895C904_t.jpg",
 "width": 160,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_7A1D2634_714C_3CEE_41D0_EA423895C904.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 80
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E"
  }
 ],
 "hfov": 360,
 "id": "panorama_B1B24DE7_BF1B_79E1_41DB_E4B2DC74CBCF",
 "thumbnailUrl": "media/panorama_B1B24DE7_BF1B_79E1_41DB_E4B2DC74CBCF_t.jpg",
 "label": "8. 360 multiple",
 "class": "Panorama",
 "pitch": 0,
 "partial": false,
 "cardboardMenu": "this.Menu_AEADA6E3_BF3B_6BE1_41E3_1B980F545581",
 "hfovMax": 100,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B1B24DE7_BF1B_79E1_41DB_E4B2DC74CBCF_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B1B24DE7_BF1B_79E1_41DB_E4B2DC74CBCF_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1B24DE7_BF1B_79E1_41DB_E4B2DC74CBCF_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B1B24DE7_BF1B_79E1_41DB_E4B2DC74CBCF_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B1B24DE7_BF1B_79E1_41DB_E4B2DC74CBCF_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1B24DE7_BF1B_79E1_41DB_E4B2DC74CBCF_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B1B24DE7_BF1B_79E1_41DB_E4B2DC74CBCF_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B1B24DE7_BF1B_79E1_41DB_E4B2DC74CBCF_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1B24DE7_BF1B_79E1_41DB_E4B2DC74CBCF_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B1B24DE7_BF1B_79E1_41DB_E4B2DC74CBCF_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B1B24DE7_BF1B_79E1_41DB_E4B2DC74CBCF_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1B24DE7_BF1B_79E1_41DB_E4B2DC74CBCF_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B1B24DE7_BF1B_79E1_41DB_E4B2DC74CBCF_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B1B24DE7_BF1B_79E1_41DB_E4B2DC74CBCF_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1B24DE7_BF1B_79E1_41DB_E4B2DC74CBCF_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_B1B24DE7_BF1B_79E1_41DB_E4B2DC74CBCF_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B1B24DE7_BF1B_79E1_41DB_E4B2DC74CBCF_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B1B24DE7_BF1B_79E1_41DB_E4B2DC74CBCF_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1B24DE7_BF1B_79E1_41DB_E4B2DC74CBCF_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_AF29BADB_BF2D_1A20_41E7_2C63C31FE247"
 ]
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 29.64,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_AE8D46F4_BF3B_6BE7_41D6_E407CE24F9A2",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_B3DB421A_BF1B_6A20_41D8_32B1A90502C7_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E"
  }
 ],
 "hfov": 360,
 "id": "panorama_B2DD75AF_BF1F_2E61_41D4_09606CB18F7B",
 "thumbnailUrl": "media/panorama_B2DD75AF_BF1F_2E61_41D4_09606CB18F7B_t.jpg",
 "label": "3. 360 TERRAZA",
 "class": "Panorama",
 "pitch": 0,
 "partial": false,
 "cardboardMenu": "this.Menu_AEADA6E3_BF3B_6BE1_41E3_1B980F545581",
 "hfovMax": 100,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2DD75AF_BF1F_2E61_41D4_09606CB18F7B_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2DD75AF_BF1F_2E61_41D4_09606CB18F7B_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2DD75AF_BF1F_2E61_41D4_09606CB18F7B_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2DD75AF_BF1F_2E61_41D4_09606CB18F7B_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2DD75AF_BF1F_2E61_41D4_09606CB18F7B_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2DD75AF_BF1F_2E61_41D4_09606CB18F7B_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2DD75AF_BF1F_2E61_41D4_09606CB18F7B_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2DD75AF_BF1F_2E61_41D4_09606CB18F7B_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2DD75AF_BF1F_2E61_41D4_09606CB18F7B_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2DD75AF_BF1F_2E61_41D4_09606CB18F7B_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2DD75AF_BF1F_2E61_41D4_09606CB18F7B_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2DD75AF_BF1F_2E61_41D4_09606CB18F7B_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2DD75AF_BF1F_2E61_41D4_09606CB18F7B_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2DD75AF_BF1F_2E61_41D4_09606CB18F7B_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2DD75AF_BF1F_2E61_41D4_09606CB18F7B_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_B2DD75AF_BF1F_2E61_41D4_09606CB18F7B_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2DD75AF_BF1F_2E61_41D4_09606CB18F7B_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2DD75AF_BF1F_2E61_41D4_09606CB18F7B_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2DD75AF_BF1F_2E61_41D4_09606CB18F7B_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_B2D2A5AF_BF1F_2E61_41D8_9BC5B65EFAD8"
 ]
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_B2AC8A46_BF1D_1A23_41DE_42D572B08D6A_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -81.05,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_AD78F764_BF3B_6AE7_41CA_672027D0CEB6",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948"
  }
 ],
 "hfov": 360,
 "id": "panorama_B159BF1F_BF1B_1A20_41A6_05BC687A1EE3",
 "thumbnailUrl": "media/panorama_B159BF1F_BF1B_1A20_41A6_05BC687A1EE3_t.jpg",
 "label": "7. 360 HAB 03",
 "class": "Panorama",
 "pitch": 0,
 "partial": false,
 "cardboardMenu": "this.Menu_AEADA6E3_BF3B_6BE1_41E3_1B980F545581",
 "hfovMax": 100,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B159BF1F_BF1B_1A20_41A6_05BC687A1EE3_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B159BF1F_BF1B_1A20_41A6_05BC687A1EE3_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B159BF1F_BF1B_1A20_41A6_05BC687A1EE3_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B159BF1F_BF1B_1A20_41A6_05BC687A1EE3_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B159BF1F_BF1B_1A20_41A6_05BC687A1EE3_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B159BF1F_BF1B_1A20_41A6_05BC687A1EE3_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B159BF1F_BF1B_1A20_41A6_05BC687A1EE3_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B159BF1F_BF1B_1A20_41A6_05BC687A1EE3_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B159BF1F_BF1B_1A20_41A6_05BC687A1EE3_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B159BF1F_BF1B_1A20_41A6_05BC687A1EE3_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B159BF1F_BF1B_1A20_41A6_05BC687A1EE3_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B159BF1F_BF1B_1A20_41A6_05BC687A1EE3_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B159BF1F_BF1B_1A20_41A6_05BC687A1EE3_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B159BF1F_BF1B_1A20_41A6_05BC687A1EE3_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B159BF1F_BF1B_1A20_41A6_05BC687A1EE3_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_B159BF1F_BF1B_1A20_41A6_05BC687A1EE3_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B159BF1F_BF1B_1A20_41A6_05BC687A1EE3_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B159BF1F_BF1B_1A20_41A6_05BC687A1EE3_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B159BF1F_BF1B_1A20_41A6_05BC687A1EE3_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_AFAA3102_BF2E_E623_41E0_9034C6D58ECD"
 ]
},
{
 "duration": 5000,
 "class": "Photo",
 "label": "4. INT 1 - CABA\u00d1A VT1",
 "id": "photo_AE184A6F_A536_5D07_41E2_B206782F0C19",
 "thumbnailUrl": "media/photo_AE184A6F_A536_5D07_41E2_B206782F0C19_t.jpg",
 "width": 4000,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_AE184A6F_A536_5D07_41E2_B206782F0C19.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 2200
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 26.55,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_AEE986FF_BF3B_6BE1_419A_8C1AF3AC80C0",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E"
  }
 ],
 "hfov": 360,
 "id": "panorama_B2E10F33_BF15_7A61_41D7_86FC7C77FB3F",
 "thumbnailUrl": "media/panorama_B2E10F33_BF15_7A61_41D7_86FC7C77FB3F_t.jpg",
 "label": "1. 360 ACCESO",
 "class": "Panorama",
 "pitch": 0,
 "partial": false,
 "cardboardMenu": "this.Menu_AEADA6E3_BF3B_6BE1_41E3_1B980F545581",
 "hfovMax": 100,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2E10F33_BF15_7A61_41D7_86FC7C77FB3F_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2E10F33_BF15_7A61_41D7_86FC7C77FB3F_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2E10F33_BF15_7A61_41D7_86FC7C77FB3F_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2E10F33_BF15_7A61_41D7_86FC7C77FB3F_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2E10F33_BF15_7A61_41D7_86FC7C77FB3F_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2E10F33_BF15_7A61_41D7_86FC7C77FB3F_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2E10F33_BF15_7A61_41D7_86FC7C77FB3F_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2E10F33_BF15_7A61_41D7_86FC7C77FB3F_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2E10F33_BF15_7A61_41D7_86FC7C77FB3F_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2E10F33_BF15_7A61_41D7_86FC7C77FB3F_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2E10F33_BF15_7A61_41D7_86FC7C77FB3F_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2E10F33_BF15_7A61_41D7_86FC7C77FB3F_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2E10F33_BF15_7A61_41D7_86FC7C77FB3F_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2E10F33_BF15_7A61_41D7_86FC7C77FB3F_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2E10F33_BF15_7A61_41D7_86FC7C77FB3F_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_B2E10F33_BF15_7A61_41D7_86FC7C77FB3F_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2E10F33_BF15_7A61_41D7_86FC7C77FB3F_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2E10F33_BF15_7A61_41D7_86FC7C77FB3F_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2E10F33_BF15_7A61_41D7_86FC7C77FB3F_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_B2E11F34_BF15_7A67_41CA_54300BE652E1"
 ]
},
{
 "items": [
  {
   "media": "this.panorama_B2E10F33_BF15_7A61_41D7_86FC7C77FB3F",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B2E10F33_BF15_7A61_41D7_86FC7C77FB3F_camera"
  },
  {
   "media": "this.panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E_camera"
  },
  {
   "media": "this.panorama_B2DD75AF_BF1F_2E61_41D4_09606CB18F7B",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B2DD75AF_BF1F_2E61_41D4_09606CB18F7B_camera"
  },
  {
   "media": "this.panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_camera"
  },
  {
   "media": "this.panorama_B2AC8A46_BF1D_1A23_41DE_42D572B08D6A",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B2AC8A46_BF1D_1A23_41DE_42D572B08D6A_camera"
  },
  {
   "media": "this.panorama_B2DC4FB4_BF1D_1A60_41E0_6E3B943A0CEB",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B2DC4FB4_BF1D_1A60_41E0_6E3B943A0CEB_camera"
  },
  {
   "media": "this.panorama_B159BF1F_BF1B_1A20_41A6_05BC687A1EE3",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B159BF1F_BF1B_1A20_41A6_05BC687A1EE3_camera"
  },
  {
   "media": "this.panorama_B1B24DE7_BF1B_79E1_41DB_E4B2DC74CBCF",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B1B24DE7_BF1B_79E1_41DB_E4B2DC74CBCF_camera"
  },
  {
   "media": "this.panorama_B3DB421A_BF1B_6A20_41D8_32B1A90502C7",
   "camera": "this.panorama_B3DB421A_BF1B_6A20_41D8_32B1A90502C7_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "end": "this.trigger('tourEnded')"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948"
  }
 ],
 "hfov": 360,
 "id": "panorama_B2DC4FB4_BF1D_1A60_41E0_6E3B943A0CEB",
 "thumbnailUrl": "media/panorama_B2DC4FB4_BF1D_1A60_41E0_6E3B943A0CEB_t.jpg",
 "label": "6. 360 HAB 02",
 "class": "Panorama",
 "pitch": 0,
 "partial": false,
 "cardboardMenu": "this.Menu_AEADA6E3_BF3B_6BE1_41E3_1B980F545581",
 "hfovMax": 100,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2DC4FB4_BF1D_1A60_41E0_6E3B943A0CEB_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2DC4FB4_BF1D_1A60_41E0_6E3B943A0CEB_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2DC4FB4_BF1D_1A60_41E0_6E3B943A0CEB_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2DC4FB4_BF1D_1A60_41E0_6E3B943A0CEB_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2DC4FB4_BF1D_1A60_41E0_6E3B943A0CEB_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2DC4FB4_BF1D_1A60_41E0_6E3B943A0CEB_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2DC4FB4_BF1D_1A60_41E0_6E3B943A0CEB_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2DC4FB4_BF1D_1A60_41E0_6E3B943A0CEB_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2DC4FB4_BF1D_1A60_41E0_6E3B943A0CEB_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2DC4FB4_BF1D_1A60_41E0_6E3B943A0CEB_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2DC4FB4_BF1D_1A60_41E0_6E3B943A0CEB_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2DC4FB4_BF1D_1A60_41E0_6E3B943A0CEB_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2DC4FB4_BF1D_1A60_41E0_6E3B943A0CEB_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2DC4FB4_BF1D_1A60_41E0_6E3B943A0CEB_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2DC4FB4_BF1D_1A60_41E0_6E3B943A0CEB_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_B2DC4FB4_BF1D_1A60_41E0_6E3B943A0CEB_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2DC4FB4_BF1D_1A60_41E0_6E3B943A0CEB_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2DC4FB4_BF1D_1A60_41E0_6E3B943A0CEB_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2DC4FB4_BF1D_1A60_41E0_6E3B943A0CEB_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_AF600B24_BF2F_FA60_41E4_06DAA64EC70D"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948"
  }
 ],
 "hfov": 360,
 "id": "panorama_B2AC8A46_BF1D_1A23_41DE_42D572B08D6A",
 "thumbnailUrl": "media/panorama_B2AC8A46_BF1D_1A23_41DE_42D572B08D6A_t.jpg",
 "label": "5. 360 HAB PPAL",
 "class": "Panorama",
 "pitch": 0,
 "partial": false,
 "cardboardMenu": "this.Menu_AEADA6E3_BF3B_6BE1_41E3_1B980F545581",
 "hfovMax": 100,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2AC8A46_BF1D_1A23_41DE_42D572B08D6A_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2AC8A46_BF1D_1A23_41DE_42D572B08D6A_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2AC8A46_BF1D_1A23_41DE_42D572B08D6A_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2AC8A46_BF1D_1A23_41DE_42D572B08D6A_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2AC8A46_BF1D_1A23_41DE_42D572B08D6A_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2AC8A46_BF1D_1A23_41DE_42D572B08D6A_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2AC8A46_BF1D_1A23_41DE_42D572B08D6A_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2AC8A46_BF1D_1A23_41DE_42D572B08D6A_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2AC8A46_BF1D_1A23_41DE_42D572B08D6A_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2AC8A46_BF1D_1A23_41DE_42D572B08D6A_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2AC8A46_BF1D_1A23_41DE_42D572B08D6A_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2AC8A46_BF1D_1A23_41DE_42D572B08D6A_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2AC8A46_BF1D_1A23_41DE_42D572B08D6A_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2AC8A46_BF1D_1A23_41DE_42D572B08D6A_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2AC8A46_BF1D_1A23_41DE_42D572B08D6A_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_B2AC8A46_BF1D_1A23_41DE_42D572B08D6A_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2AC8A46_BF1D_1A23_41DE_42D572B08D6A_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2AC8A46_BF1D_1A23_41DE_42D572B08D6A_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2AC8A46_BF1D_1A23_41DE_42D572B08D6A_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_B2ACBA46_BF1D_1A23_41E1_C986305B9548"
 ]
},
{
 "duration": 5000,
 "class": "Photo",
 "label": "6. EXT 4 - CABA\u00d1A VT1",
 "id": "photo_AFED67EC_A532_5309_41E0_15CD3B689BE6",
 "thumbnailUrl": "media/photo_AFED67EC_A532_5309_41E0_15CD3B689BE6_t.jpg",
 "width": 8000,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_AFED67EC_A532_5309_41E0_15CD3B689BE6.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 4000
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 178.57,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_AD69675A_BF3B_6A23_41C2_51D342FBD144",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B2DC4FB4_BF1D_1A60_41E0_6E3B943A0CEB"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B3DB421A_BF1B_6A20_41D8_32B1A90502C7"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B159BF1F_BF1B_1A20_41A6_05BC687A1EE3"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B2AC8A46_BF1D_1A23_41DE_42D572B08D6A"
  }
 ],
 "hfov": 360,
 "id": "panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948",
 "thumbnailUrl": "media/panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_t.jpg",
 "label": "4. 360 PUENTE",
 "class": "Panorama",
 "pitch": 0,
 "partial": false,
 "cardboardMenu": "this.Menu_AEADA6E3_BF3B_6BE1_41E3_1B980F545581",
 "hfovMax": 100,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_B2AC678A_BF1E_EA23_41DA_E8A0B02062BD",
  "this.overlay_B2ACB78A_BF1E_EA23_41E4_5FD22EDBD718",
  "this.overlay_B2ACD78A_BF1E_EA23_41CB_C36216D62861",
  "this.overlay_B2ACF78A_BF1E_EA23_41E1_1477CBF10CC5",
  "this.overlay_B0844057_BF2D_2621_41E1_9A42A963F0F0"
 ]
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -48.15,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_AEBAF6EA_BF3B_6BE3_41C1_065386794C15",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_B159BF1F_BF1B_1A20_41A6_05BC687A1EE3_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "duration": 5000,
 "class": "Photo",
 "label": "5. INT 2 - CABA\u00d1A VT1",
 "id": "photo_AF3726A9_A536_550B_41D6_3AAEFE9F4427",
 "thumbnailUrl": "media/photo_AF3726A9_A536_550B_41D6_3AAEFE9F4427_t.jpg",
 "width": 4000,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_AF3726A9_A536_550B_41D6_3AAEFE9F4427.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 2200
},
{
 "duration": 5000,
 "class": "Photo",
 "label": "7. INT 3- CABA\u00d1A VT1",
 "id": "photo_AE142674_A532_5519_4186_6BD1632B5132",
 "thumbnailUrl": "media/photo_AE142674_A532_5519_4186_6BD1632B5132_t.jpg",
 "width": 8000,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_AE142674_A532_5519_4186_6BD1632B5132.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 4000
},
{
 "items": [
  {
   "media": "this.panorama_B2E10F33_BF15_7A61_41D7_86FC7C77FB3F",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B2E10F33_BF15_7A61_41D7_86FC7C77FB3F_camera"
  },
  {
   "media": "this.panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E_camera"
  },
  {
   "media": "this.panorama_B2DD75AF_BF1F_2E61_41D4_09606CB18F7B",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B2DD75AF_BF1F_2E61_41D4_09606CB18F7B_camera"
  },
  {
   "media": "this.panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_camera"
  },
  {
   "media": "this.panorama_B2AC8A46_BF1D_1A23_41DE_42D572B08D6A",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B2AC8A46_BF1D_1A23_41DE_42D572B08D6A_camera"
  },
  {
   "media": "this.panorama_B2DC4FB4_BF1D_1A60_41E0_6E3B943A0CEB",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B2DC4FB4_BF1D_1A60_41E0_6E3B943A0CEB_camera"
  },
  {
   "media": "this.panorama_B159BF1F_BF1B_1A20_41A6_05BC687A1EE3",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B159BF1F_BF1B_1A20_41A6_05BC687A1EE3_camera"
  },
  {
   "media": "this.panorama_B1B24DE7_BF1B_79E1_41DB_E4B2DC74CBCF",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B1B24DE7_BF1B_79E1_41DB_E4B2DC74CBCF_camera"
  },
  {
   "media": "this.panorama_B3DB421A_BF1B_6A20_41D8_32B1A90502C7",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472_playlist, 8, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_B3DB421A_BF1B_6A20_41D8_32B1A90502C7_camera"
  }
 ],
 "id": "ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472_playlist",
 "class": "PlayList"
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_B1B24DE7_BF1B_79E1_41DB_E4B2DC74CBCF_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B2DD75AF_BF1F_2E61_41D4_09606CB18F7B"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B1B24DE7_BF1B_79E1_41DB_E4B2DC74CBCF"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B2E10F33_BF15_7A61_41D7_86FC7C77FB3F"
  }
 ],
 "hfov": 360,
 "id": "panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E",
 "thumbnailUrl": "media/panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E_t.jpg",
 "label": "2. 360 SALON",
 "class": "Panorama",
 "pitch": 0,
 "partial": false,
 "cardboardMenu": "this.Menu_AEADA6E3_BF3B_6BE1_41E3_1B980F545581",
 "hfovMax": 100,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_B2F209A5_BF1B_6660_41E5_A1E25212813E",
  "this.overlay_B2F239A5_BF1B_6660_4172_4529B070A996",
  "this.overlay_B00C4E31_BF15_1A61_41D2_43F6E31C3F03",
  "this.overlay_AFE23898_BF2B_662F_41E3_23EC60A2F98B"
 ]
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -34.23,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_AEF6F718_BF3B_6A2F_41B1_1A19F3D1AAB9",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "gyroscopeEnabled": true,
 "viewerArea": "this.MainViewer",
 "buttonCardboardView": "this.IconButton_FAA56A93_EB1E_792C_41B3_1467377FDD37",
 "displayPlaybackBar": true,
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_acceleration",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": false,
 "mouseControlMode": "drag_rotation"
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "fontFamily": "Arial",
 "selectedFontColor": "#FFFFFF",
 "rollOverOpacity": 0.8,
 "children": [
  {
   "label": "1. 360 ACCESO",
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "class": "MenuItem"
  },
  {
   "label": "2. 360 SALON",
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "class": "MenuItem"
  },
  {
   "label": "3. 360 TERRAZA",
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "class": "MenuItem"
  },
  {
   "label": "4. 360 PUENTE",
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "class": "MenuItem"
  },
  {
   "label": "5. 360 HAB PPAL",
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "MenuItem"
  },
  {
   "label": "6. 360 HAB 02",
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "class": "MenuItem"
  },
  {
   "label": "7. 360 HAB 03",
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "class": "MenuItem"
  },
  {
   "label": "8. 360 multiple",
   "click": "this.mainPlayList.set('selectedIndex', 7)",
   "class": "MenuItem"
  },
  {
   "label": "9. 360 PISO 3 ",
   "click": "this.mainPlayList.set('selectedIndex', 8)",
   "class": "MenuItem"
  }
 ],
 "fontColor": "#FFFFFF",
 "rollOverBackgroundColor": "#000000",
 "label": "Media",
 "id": "Menu_AEADA6E3_BF3B_6BE1_41E3_1B980F545581",
 "class": "Menu",
 "rollOverFontColor": "#FFFFFF",
 "backgroundColor": "#404040",
 "selectedBackgroundColor": "#202020",
 "opacity": 0.4
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -40.68,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_AEE7370D_BF3B_6A21_41E2_329126DC7BD2",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -50.62,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_AED3D729_BF3B_6A61_41E1_BB200A879FEE",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 0.45,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_AEB226EF_BF3B_6BE1_41E0_F913E90E18C5",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "duration": 5000,
 "class": "Photo",
 "label": "3. EXT 3 - CABA\u00d1A VT1",
 "id": "photo_7B6E1B33_714C_34EA_41CD_F7D6937C7469",
 "thumbnailUrl": "media/photo_7B6E1B33_714C_34EA_41CD_F7D6937C7469_t.jpg",
 "width": 1600,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_7B6E1B33_714C_34EA_41CD_F7D6937C7469.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 800
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948"
  }
 ],
 "hfov": 360,
 "id": "panorama_B3DB421A_BF1B_6A20_41D8_32B1A90502C7",
 "thumbnailUrl": "media/panorama_B3DB421A_BF1B_6A20_41D8_32B1A90502C7_t.jpg",
 "label": "9. 360 PISO 3 ",
 "class": "Panorama",
 "pitch": 0,
 "partial": false,
 "cardboardMenu": "this.Menu_AEADA6E3_BF3B_6BE1_41E3_1B980F545581",
 "hfovMax": 100,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B3DB421A_BF1B_6A20_41D8_32B1A90502C7_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B3DB421A_BF1B_6A20_41D8_32B1A90502C7_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B3DB421A_BF1B_6A20_41D8_32B1A90502C7_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B3DB421A_BF1B_6A20_41D8_32B1A90502C7_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B3DB421A_BF1B_6A20_41D8_32B1A90502C7_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B3DB421A_BF1B_6A20_41D8_32B1A90502C7_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B3DB421A_BF1B_6A20_41D8_32B1A90502C7_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B3DB421A_BF1B_6A20_41D8_32B1A90502C7_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B3DB421A_BF1B_6A20_41D8_32B1A90502C7_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B3DB421A_BF1B_6A20_41D8_32B1A90502C7_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B3DB421A_BF1B_6A20_41D8_32B1A90502C7_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B3DB421A_BF1B_6A20_41D8_32B1A90502C7_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B3DB421A_BF1B_6A20_41D8_32B1A90502C7_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B3DB421A_BF1B_6A20_41D8_32B1A90502C7_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B3DB421A_BF1B_6A20_41D8_32B1A90502C7_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_B3DB421A_BF1B_6A20_41D8_32B1A90502C7_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B3DB421A_BF1B_6A20_41D8_32B1A90502C7_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B3DB421A_BF1B_6A20_41D8_32B1A90502C7_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B3DB421A_BF1B_6A20_41D8_32B1A90502C7_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_AF055600_BF2D_2A20_41E0_660D97DEABB0"
 ]
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -63.5,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_AD218733_BF3B_6A61_41DC_33788292925D",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "duration": 5000,
 "class": "Photo",
 "label": "2. EXT 2 - CABA\u00d1A VT1",
 "id": "photo_7A6C466E_714D_DD7A_41CB_FFB743A9431B",
 "thumbnailUrl": "media/photo_7A6C466E_714D_DD7A_41CB_FFB743A9431B_t.jpg",
 "width": 1600,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_7A6C466E_714D_DD7A_41CB_FFB743A9431B.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 800
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_B2E10F33_BF15_7A61_41D7_86FC7C77FB3F_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 92.99,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_AD76676F_BF3B_6AE1_41C0_4BA76404642B",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_B2DD75AF_BF1F_2E61_41D4_09606CB18F7B_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -95.4,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_AD0C5749_BF3B_6A21_41DF_D106FF2CFE88",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": 27.54,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_AD3F173E_BF3B_6A63_41A6_C8700BE4B937",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -71.15,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_AD1BE74F_BF3B_6A21_41C8_2CA777FD7137",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "hfov": 100,
  "yaw": -27.45,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_AEC45723_BF3B_6A61_41DD_1FAFE224F068",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "toolTipPaddingRight": 14,
 "toolTipBorderSize": 0,
 "id": "MainViewer",
 "left": 0,
 "toolTipPaddingTop": 9,
 "paddingLeft": 0,
 "progressBorderRadius": 0,
 "class": "ViewerArea",
 "toolTipPaddingLeft": 14,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarLeft": 0,
 "width": "100%",
 "progressBackgroundColorRatios": [
  0
 ],
 "minHeight": 50,
 "toolTipBorderRadius": 1,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadHeight": 15,
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 5,
 "minWidth": 100,
 "playbackBarHeadOpacity": 1,
 "toolTipBorderColor": "#767676",
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipOpacity": 0.7,
 "toolTipFontSize": 13,
 "height": "100%",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "shadow": false,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "transitionMode": "blending",
 "toolTipPaddingBottom": 9,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipTextShadowHorizontalLength": 0,
 "toolTipTextShadowVerticalLength": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "paddingRight": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "borderSize": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 1,
 "toolTipShadowOpacity": 0,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "top": 0,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadShadow": true,
 "transitionDuration": 500,
 "toolTipBackgroundColor": "#000000",
 "paddingTop": 0,
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "progressBottom": 0,
 "toolTipFontColor": "#FFFFFF",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "paddingBottom": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "data": {
  "name": "Main Viewer"
 }
},
{
 "overflow": "visible",
 "children": [
  "this.Container_80D3CF90_8E26_E705_41E0_E47025A2C106"
 ],
 "id": "Container_807F782A_8E23_A905_41DE_623121285A09",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "class": "Container",
 "width": "22.545%",
 "borderRadius": 5,
 "right": 25,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "propagateClick": false,
 "minHeight": 50,
 "borderSize": 0,
 "verticalAlign": "middle",
 "top": "89%",
 "scrollBarColor": "#000000",
 "bottom": "3%",
 "minWidth": 265,
 "layout": "horizontal",
 "contentOpaque": false,
 "gap": 1,
 "paddingTop": 0,
 "horizontalAlign": "right",
 "scrollBarMargin": 2,
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "--Settings Button Set"
 }
},
{
 "overflow": "visible",
 "id": "Container_82CEEC30_9220_D3AB_41D9_A91DB817BCCC",
 "left": "2.14%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "class": "Container",
 "width": "21%",
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "propagateClick": false,
 "minHeight": 120,
 "borderSize": 0,
 "verticalAlign": "top",
 "top": "3.5%",
 "scrollBarColor": "#000000",
 "minWidth": 300,
 "layout": "vertical",
 "contentOpaque": false,
 "gap": 10,
 "paddingTop": 0,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "height": "25%",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "--Stickers Container"
 }
},
{
 "id": "ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472",
 "itemLabelFontStyle": "normal",
 "paddingLeft": 15,
 "itemLabelHorizontalAlign": "center",
 "scrollBarWidth": 7,
 "itemMode": "normal",
 "class": "ThumbnailList",
 "right": "2%",
 "borderRadius": 3,
 "itemOpacity": 1,
 "scrollBarVisible": "rollOver",
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "scrollBarOpacity": 1,
 "minHeight": 1,
 "selectedItemBorderRadius": 0,
 "itemLabelFontFamily": "Arial",
 "scrollBarColor": "#52B7EF",
 "backgroundColorRatios": [
  0
 ],
 "selectedItemThumbnailShadowVerticalLength": 0,
 "selectedItemThumbnailShadowBlurRadius": 10,
 "verticalAlign": "top",
 "minWidth": 1,
 "selectedItemBackgroundColorRatios": [],
 "itemBorderRadius": 0,
 "itemThumbnailOpacity": 1,
 "backgroundColor": [
  "#000000"
 ],
 "itemPaddingLeft": 3,
 "itemLabelPosition": "bottom",
 "rollOverItemLabelTextDecoration": "underline",
 "height": "82.127%",
 "itemHorizontalAlign": "center",
 "horizontalAlign": "left",
 "shadow": false,
 "itemThumbnailBorderRadius": 50,
 "itemPaddingTop": 3,
 "itemBackgroundColor": [],
 "itemPaddingRight": 3,
 "itemBackgroundColorRatios": [],
 "selectedItemLabelFontColor": "#FFFFFF",
 "selectedItemBackgroundColor": [],
 "rollOverItemLabelFontWeight": "bold",
 "backgroundOpacity": 0.25,
 "paddingRight": 15,
 "itemBackgroundOpacity": 0,
 "playList": "this.ThumbnailList_862E7BE1_9245_D8B3_41CA_4BB70D195472_playlist",
 "selectedItemLabelFontSize": 12,
 "itemLabelTextDecoration": "none",
 "borderSize": 0,
 "itemLabelFontWeight": "normal",
 "selectedItemLabelFontStyle": "italic",
 "propagateClick": false,
 "selectedItemLabelTextDecoration": "underline",
 "top": "3.5%",
 "itemThumbnailScaleMode": "fit_outside",
 "itemLabelFontSize": 12,
 "selectedItemBorderSize": 0,
 "selectedItemThumbnailShadowOpacity": 0.73,
 "itemLabelFontColor": "#FFFFFF",
 "selectedItemThumbnailShadow": true,
 "backgroundColorDirection": "vertical",
 "itemThumbnailHeight": 80,
 "scrollBarMargin": 4,
 "itemBackgroundColorDirection": "vertical",
 "paddingTop": 20,
 "layout": "vertical",
 "gap": 10,
 "rollOverItemLabelFontColor": "#FFFFFF",
 "itemLabelGap": 9,
 "paddingBottom": 20,
 "itemVerticalAlign": "middle",
 "selectedItemBackgroundOpacity": 0,
 "itemPaddingBottom": 3,
 "selectedItemLabelFontWeight": "bold",
 "itemThumbnailWidth": 80,
 "visible": false,
 "itemThumbnailShadow": false,
 "maxWidth": 150,
 "data": {
  "name": "-ThumbnailList"
 }
},
{
 "overflow": "visible",
 "children": [
  "this.Container_8BEA9761_974D_B047_41DA_8D05A7FEFD9B"
 ],
 "id": "Container_8A3F064F_9747_905B_41D4_9169FB3EB41E",
 "left": "2%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "class": "Container",
 "width": "37.394%",
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "bottom",
 "bottom": "3%",
 "minWidth": 1,
 "layout": "vertical",
 "contentOpaque": false,
 "gap": 1,
 "paddingTop": 0,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "height": 92,
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "-Discover Container"
 }
},
{
 "maxHeight": 265,
 "id": "Image_E75D7FB5_F538_3297_41CA_C93BFF557E4D",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scaleMode": "fit_inside",
 "paddingRight": 0,
 "class": "Image",
 "right": "0.6%",
 "width": "5%",
 "borderRadius": 0,
 "url": "skin/Image_E75D7FB5_F538_3297_41CA_C93BFF557E4D.png",
 "propagateClick": false,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "middle",
 "top": "0.98%",
 "minWidth": 1,
 "paddingTop": 0,
 "horizontalAlign": "center",
 "height": "5%",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "Image21736"
 },
 "maxWidth": 485
},
{
 "transparencyActive": true,
 "maxHeight": 70,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingRight": 14,
 "toolTipBorderSize": 0,
 "id": "IconButton_807BAF04_8E22_670D_41B7_872D69E5EABA",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "class": "IconButton",
 "toolTipPaddingLeft": 14,
 "toolTipPaddingTop": 9,
 "width": "17.48%",
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "toolTipShadowOpacity": 0,
 "pressedIconURL": "skin/IconButton_807BAF04_8E22_670D_41B7_872D69E5EABA_pressed.png",
 "toolTipFontStyle": "normal",
 "toolTip": "Full Screen",
 "propagateClick": false,
 "minHeight": 1,
 "borderSize": 0,
 "toolTipFontFamily": "Arial",
 "verticalAlign": "middle",
 "toolTipTextShadowOpacity": 1,
 "toolTipBorderRadius": 1,
 "toolTipShadowSpread": 0,
 "toolTipBorderColor": "#767676",
 "mode": "toggle",
 "minWidth": 1,
 "toolTipOpacity": 0.7,
 "toolTipFontSize": 13,
 "toolTipBackgroundColor": "#000000",
 "paddingTop": 0,
 "horizontalAlign": "center",
 "toolTipShadowBlurRadius": 3,
 "toolTipTextShadowColor": "#000000",
 "height": "76.75%",
 "shadow": false,
 "paddingBottom": 0,
 "toolTipFontColor": "#FFFFFF",
 "toolTipFontWeight": "normal",
 "toolTipTextShadowHorizontalLength": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 9,
 "data": {
  "name": "Icon fullscreen"
 },
 "cursor": "hand",
 "iconURL": "skin/IconButton_807BAF04_8E22_670D_41B7_872D69E5EABA.png",
 "maxWidth": 70,
 "toolTipTextShadowVerticalLength": 0
},
{
 "transparencyActive": true,
 "maxHeight": 70,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingRight": 14,
 "toolTipBorderSize": 0,
 "id": "IconButton_8105A313_8E22_BF0B_41E1_331C6035A930",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "class": "IconButton",
 "toolTipPaddingLeft": 14,
 "toolTipPaddingTop": 9,
 "width": "17.15%",
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "toolTipShadowOpacity": 0,
 "pressedIconURL": "skin/IconButton_8105A313_8E22_BF0B_41E1_331C6035A930_pressed.png",
 "toolTipFontStyle": "normal",
 "toolTip": "Audio On/Off",
 "propagateClick": false,
 "minHeight": 1,
 "borderSize": 0,
 "toolTipFontFamily": "Arial",
 "verticalAlign": "middle",
 "toolTipTextShadowOpacity": 1,
 "toolTipBorderRadius": 1,
 "toolTipShadowSpread": 0,
 "toolTipBorderColor": "#767676",
 "mode": "toggle",
 "minWidth": 1,
 "toolTipOpacity": 0.7,
 "toolTipFontSize": 13,
 "toolTipBackgroundColor": "#000000",
 "paddingTop": 0,
 "horizontalAlign": "center",
 "toolTipShadowBlurRadius": 3,
 "toolTipTextShadowColor": "#000000",
 "height": "76.75%",
 "shadow": false,
 "paddingBottom": 0,
 "toolTipFontColor": "#FFFFFF",
 "toolTipFontWeight": "normal",
 "toolTipTextShadowHorizontalLength": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 9,
 "data": {
  "name": "Icon audio"
 },
 "cursor": "hand",
 "iconURL": "skin/IconButton_8105A313_8E22_BF0B_41E1_331C6035A930.png",
 "maxWidth": 70,
 "toolTipTextShadowVerticalLength": 0
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E, this.camera_AD218733_BF3B_6A61_41DC_33788292925D); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B1B24DE7_BF1B_79E1_41DB_E4B2DC74CBCF_1_HS_0_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ]
   },
   "hfov": 10.44,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": 0,
   "yaw": -150.36
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_AF29BADB_BF2D_1A20_41E7_2C63C31FE247",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.44,
   "yaw": -150.36,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B1B24DE7_BF1B_79E1_41DB_E4B2DC74CBCF_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E, this.camera_AD69675A_BF3B_6A23_41C2_51D342FBD144); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2DD75AF_BF1F_2E61_41D4_09606CB18F7B_1_HS_0_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ]
   },
   "hfov": 10.44,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": 1.7,
   "yaw": -179.55
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_B2D2A5AF_BF1F_2E61_41D8_9BC5B65EFAD8",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.44,
   "yaw": -179.55,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2DD75AF_BF1F_2E61_41D4_09606CB18F7B_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948, this.camera_AD78F764_BF3B_6AE7_41CA_672027D0CEB6); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B159BF1F_BF1B_1A20_41A6_05BC687A1EE3_1_HS_1_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ]
   },
   "hfov": 10.43,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": 2.2,
   "yaw": 152.55
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_AFAA3102_BF2E_E623_41E0_9034C6D58ECD",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.43,
   "yaw": 152.55,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B159BF1F_BF1B_1A20_41A6_05BC687A1EE3_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E, this.camera_AD3F173E_BF3B_6A63_41A6_C8700BE4B937); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2E10F33_BF15_7A61_41D7_86FC7C77FB3F_1_HS_0_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ]
   },
   "hfov": 10.43,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": 1.77,
   "yaw": -10.79
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_B2E11F34_BF15_7A67_41CA_54300BE652E1",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.43,
   "yaw": -10.79,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.77,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2E10F33_BF15_7A61_41D7_86FC7C77FB3F_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948, this.camera_AD0C5749_BF3B_6A21_41DF_D106FF2CFE88); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2DC4FB4_BF1D_1A60_41E0_6E3B943A0CEB_1_HS_6_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ]
   },
   "hfov": 10.41,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": 4.16,
   "yaw": -153.45
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_AF600B24_BF2F_FA60_41E4_06DAA64EC70D",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.41,
   "yaw": -153.45,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 4.16,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2DC4FB4_BF1D_1A60_41E0_6E3B943A0CEB_1_HS_6_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948, this.camera_AD76676F_BF3B_6AE1_41C0_4BA76404642B); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2AC8A46_BF1D_1A23_41DE_42D572B08D6A_1_HS_0_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ]
   },
   "hfov": 10.42,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": 3.15,
   "yaw": 129.38
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_B2ACBA46_BF1D_1A23_41E1_C986305B9548",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.42,
   "yaw": 129.38,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 3.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2AC8A46_BF1D_1A23_41DE_42D572B08D6A_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_B2DC4FB4_BF1D_1A60_41E0_6E3B943A0CEB, this.camera_AEE986FF_BF3B_6BE1_419A_8C1AF3AC80C0); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_1_HS_0_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "hfov": 10.37,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": 6.66,
   "yaw": 84.6
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_B2AC678A_BF1E_EA23_41DA_E8A0B02062BD",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.37,
   "yaw": 84.6,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 6.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E, this.camera_AEE7370D_BF3B_6A21_41E2_329126DC7BD2); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_1_HS_1_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 115
     }
    ]
   },
   "hfov": 6.93,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -48.39,
   "yaw": 131.85
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_B2ACB78A_BF1E_EA23_41E4_5FD22EDBD718",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.93,
   "yaw": 131.85,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -48.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_B2AC8A46_BF1D_1A23_41DE_42D572B08D6A, this.camera_AED3D729_BF3B_6A61_41E1_BB200A879FEE); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_1_HS_2_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ]
   },
   "hfov": 10.43,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": 2.23,
   "yaw": -87.01
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_B2ACD78A_BF1E_EA23_41CB_C36216D62861",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.43,
   "yaw": -87.01,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_B159BF1F_BF1B_1A20_41A6_05BC687A1EE3, this.camera_AEC45723_BF3B_6A61_41DD_1FAFE224F068); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_1_HS_4_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ]
   },
   "hfov": 10.37,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": 6.55,
   "yaw": 98.95
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_B2ACF78A_BF1E_EA23_41E1_1477CBF10CC5",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.37,
   "yaw": 98.95,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 6.55,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_B3DB421A_BF1B_6A20_41D8_32B1A90502C7, this.camera_AEF6F718_BF3B_6A2F_41B1_1A19F3D1AAB9); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_1_HS_5_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ]
   },
   "hfov": 7.96,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": 40.3,
   "yaw": 108.85
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_B0844057_BF2D_2621_41E1_9A42A963F0F0",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.96,
   "yaw": 108.85,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 40.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948_1_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_B2DD75AF_BF1F_2E61_41D4_09606CB18F7B, this.camera_AEB226EF_BF3B_6BE1_41E0_F913E90E18C5); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E_1_HS_0_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ]
   },
   "hfov": 10.44,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": 0.56,
   "yaw": -1.43
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_B2F209A5_BF1B_6660_41E5_A1E25212813E",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.44,
   "yaw": -1.43,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_B2E10F33_BF15_7A61_41D7_86FC7C77FB3F, this.camera_AE9BD6FA_BF3B_6BE3_41E3_0547835A27E4); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E_1_HS_1_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ]
   },
   "hfov": 10.44,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": 1.35,
   "yaw": -152.46
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_B2F239A5_BF1B_6660_4172_4529B070A996",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.44,
   "yaw": -152.46,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948, this.camera_AEBAF6EA_BF3B_6BE3_41C1_065386794C15); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E_1_HS_2_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ]
   },
   "hfov": 9.93,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": 17.97,
   "yaw": 139.32
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_B00C4E31_BF15_1A61_41D2_43F6E31C3F03",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 9.93,
   "yaw": 139.32,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 17.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_B1B24DE7_BF1B_79E1_41DB_E4B2DC74CBCF, this.camera_AE8D46F4_BF3B_6BE7_41D6_E407CE24F9A2); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E_1_HS_3_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ]
   },
   "hfov": 10.44,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": 0.89,
   "yaw": 116.5
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_AFE23898_BF2B_662F_41E3_23EC60A2F98B",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.44,
   "yaw": 116.5,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.89,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B2F279A5_BF1B_6660_41D2_75F28F7AB11E_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "transparencyActive": false,
 "maxHeight": 70,
 "id": "IconButton_FAA56A93_EB1E_792C_41B3_1467377FDD37",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "class": "IconButton",
 "width": "17.15%",
 "borderRadius": 0,
 "propagateClick": false,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "middle",
 "mode": "push",
 "minWidth": 1,
 "paddingTop": 0,
 "horizontalAlign": "center",
 "height": "76.75%",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton8475"
 },
 "cursor": "hand",
 "iconURL": "skin/IconButton_FAA56A93_EB1E_792C_41B3_1467377FDD37.png",
 "maxWidth": 70
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_B2AC478A_BF1E_EA23_41E3_7B1F04DBB948, this.camera_AD1BE74F_BF3B_6A21_41C8_2CA777FD7137); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B3DB421A_BF1B_6A20_41D8_32B1A90502C7_1_HS_0_0.png",
      "width": 116,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ]
   },
   "hfov": 10.42,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -3.24,
   "yaw": 145.77
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_AF055600_BF2D_2A20_41E0_660D97DEABB0",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.42,
   "yaw": 145.77,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B3DB421A_BF1B_6A20_41D8_32B1A90502C7_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "overflow": "visible",
 "children": [
  "this.IconButton_FAA56A93_EB1E_792C_41B3_1467377FDD37",
  "this.IconButton_807BAF04_8E22_670D_41B7_872D69E5EABA",
  "this.IconButton_8105A313_8E22_BF0B_41E1_331C6035A930"
 ],
 "id": "Container_80D3CF90_8E26_E705_41E0_E47025A2C106",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "class": "Container",
 "width": "75.269%",
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "propagateClick": false,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "middle",
 "scrollBarColor": "#000000",
 "minWidth": 1,
 "layout": "horizontal",
 "contentOpaque": false,
 "scrollBarMargin": 2,
 "gap": 10,
 "paddingTop": 0,
 "horizontalAlign": "right",
 "height": "100%",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "-Hide buttons"
 }
},
{
 "overflow": "visible",
 "id": "Container_8BEA9761_974D_B047_41DA_8D05A7FEFD9B",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "class": "Container",
 "width": "100%",
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "propagateClick": false,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "middle",
 "scrollBarColor": "#000000",
 "minWidth": 1,
 "layout": "horizontal",
 "contentOpaque": false,
 "scrollBarMargin": 2,
 "gap": 10,
 "paddingTop": 0,
 "horizontalAlign": "left",
 "height": "55.435%",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "Container Content"
 }
}],
 "layout": "absolute",
 "contentOpaque": false,
 "downloadEnabled": false,
 "paddingTop": 0,
 "scrollBarMargin": 2,
 "gap": 10,
 "shadow": false,
 "paddingBottom": 0,
 "mouseWheelEnabled": true,
 "buttonToggleMute": "this.IconButton_8105A313_8E22_BF0B_41E1_331C6035A930",
 "data": {
  "name": "Player463"
 },
 "horizontalAlign": "left",
 "desktopMipmappingEnabled": false,
 "defaultVRPointer": "laser",
 "backgroundPreloadEnabled": true
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
