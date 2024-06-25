/******************************************************************************/
//MSX Editor Plugin v0.0.10
//(c) 2024 Benjamin Zachey
/******************************************************************************/
var MSXEditorPlugin = new function() {
    var STATE_INIT = 0;
    var STATE_SETUP = 1;
    var STATE_SETUP_RECEIVER = 2;
    var STATE_SETUP_SENDER = 3;
    var STATE_RECEIVER_READY = 4;
    var STATE_SENDER_READY = 5;

    var NAME = "MSX Editor Plugin";
    var VERSION = "0.0.10";
    var FLAG = "msx_editor";
    var INTERACTION_URL = "https://msx.benzac.de/interaction/editor.html";
    var MSX_URL = "https://msx.benzac.de?init=1&secure=1&zoom=auto&scale=default&t={TIMESTAMP}&start=menu:request:interaction:init@" + INTERACTION_URL;
    var MSX_EXPORT_URL = "https://msx.benzac.de?secure=1&icon={ICON}&alias={ALIAS}&start={START}";
    //Note: Use HTTP instead of HTTPS for TV URLs to support older TV devices
    var M3U_ACTION = "user:http://msx.benzac.de/services/m3u.php?type={TYPE}&mode=extended&url={URL}";
    var M3U_FAVORITES_ACTION = "user:http://msx.benzac.de/services/m3u.php?type={TYPE}&context=favorites";
    var MRSS_ACTION = "request:interaction:{URL}|{BANNER}|{BACKGROUND}|{PLUGIN}|{DICTIONARY}@http://msx.benzac.de/interaction/mrss.html";

    var INFO_MENU = {
        name: NAME,
        version: VERSION,
        headline: NAME,
        menu: [{
                icon: "info",
                label: "Info",
                focus: true,
                execute: true,
                data: {
                    pages: [{
                            items: [{
                                    type: "default",
                                    layout: "0,0,12,6",
                                    color: "msx-glass",
                                    headline: "Welcome to the " + NAME,
                                    text: [
                                        "This plugin can be used with any online web code editing tool (e.g. {txt:msx-white:CodePen}, {txt:msx-white:JSFiddle}, {txt:msx-white:PlayCode}, etc.). ",
                                        "You just have to setup the {txt:msx-white:HTML} template inside the tool and use the following {txt:msx-white:JS} functions to show menus, contents, or panels or to execute actions. ",
                                        "Additionally, there is an option to export the data as base64-encoded JSON and to open it in an external window.{br}{br}",
                                        "{ico:msx-white:play-arrow} {txt:msx-white:showMenu(data);}{br}",
                                        "{ico:msx-white:play-arrow} {txt:msx-white:showContent(data);}{br}",
                                        "{ico:msx-white:play-arrow} {txt:msx-white:showPanel(data);}{br}",
                                        "{ico:msx-white:play-arrow} {txt:msx-white:exexuteAction(action, data);}{br}",
                                        "{ico:msx-white:play-arrow} {txt:msx-white:exportData(icon, alias);}{br}{br}",
                                        "{ico:msx-blue:info} The {txt:msx-white:HTML} template can be found here: {txt:msx-white:https://msx.benzac.de/info/xp/editor.html}.{br}",
                                        "{ico:msx-blue:info} Please note that custom {txt:msx-white:CSS} is not required, because the MSX app is loaded in a fullscreen iframe.{br}",
                                        "{ico:msx-blue:info} Please disable the autorun feature or set it to at least 1 second to avoid server overload.{br}",
                                        "{ico:msx-blue:info} Please note that only menus and contents (of a moderate size) can be exported.{br}",
                                        "{ico:msx-blue:info} Press {txt:msx-white:OK} to load the initial menu, content, or panel.{br}"
                                    ],
                                    action: "interaction:load:" + INTERACTION_URL,
                                    data: {
                                        init: true
                                    }
                                }]
                        }]
                }
            }, {
                icon: "help",
                label: "Credits",
                data: {
                    pages: [{
                            items: [{
                                    type: "default",
                                    layout: "0,0,12,6",
                                    color: "msx-glass",
                                    headline: NAME + " " + VERSION,
                                    text: [
                                        "by Benjamin Zachey{br}{br}",
                                        "Contact: {txt:msx-white:admin@benzac.de}{br}",
                                        "Web: {txt:msx-white:https://msx.benzac.de/info/}{br}"
                                    ],
                                    image: TVXTools.getPrefixUrl("msx.benzac.de/info/img/bmc_qr.png"),
                                    imageFiller: "height-right",
                                    imageOverlay: 0,
                                    imagePreload: true,
                                    action: "panel:" + TVXTools.getPrefixUrl("msx.benzac.de/services/support.php?context=editor&platform={PLATFORM}")
                                }]
                        }]
                }
            }]
    };

    var state = STATE_INIT;
    var messageFrame = null;
    var messagePlugin = null;
    var initMessage = null;
    var initDelay = new TVXDelay(1000);
    var exportMessage = null;
    var ready = false;

    var objToBase64 = function(obj) {
        return TVXTools.base64EncodeUrl(TVXTools.serialize(obj));
    };
    var encodeUrlParam = function(url) {
        return TVXTools.isFullStr(url) ? TVXTools.strToUrlStr(url) : null;
    };
    var encodeUrlId = function(url) {
        return TVXTools.isFullStr(url) ? "id:" + TVXTools.base64EncodeId(url) : null;
    };
    var protectUrl = function(url, code) {
        return TVXTools.isFullStr(url) && TVXTools.isFullStr(code) ? "code:" + TVXInteractionPlugin.transformUrl(TVXTools.createHash(code) + ":" + url) : url;
    };
    var validateFlag = function(type, data, callback) {
        if (data != null && typeof data == "object") {
            data.flag = FLAG;
            TVXInteractionPlugin.requestData("info:content", function(contentData) {
                if (contentData.info != null && contentData.info.content != null && contentData.info.content.state != null) {
                    callback((type == "menu" && contentData.info.content.state.menuFlag === FLAG) ||
                            (type == "content" && contentData.info.content.state.contentFlag === FLAG) ||
                            (type == "panel" && contentData.info.content.state.panelFlag === FLAG));
                } else {
                    callback(false);
                }
            });
        } else {
            callback(false);
        }
    };
    var showOrReplace = function(type, data) {
        if (TVXTools.isFullStr(type) && data != null) {
            validateFlag(type, data, function(validated) {
                if (validated) {
                    TVXInteractionPlugin.executeAction("replace:" + type + ":" + FLAG + ":json:" + objToBase64(data));
                } else if (TVXTools.isFullStr(data)) {
                    TVXInteractionPlugin.executeAction(type + ":" + data);
                } else {
                    TVXInteractionPlugin.executeAction(type + ":data", data);
                }
            });
        }
    };
    var onReady = function(data) {
        ready = true;
        if (initMessage == null && data != null) {
            initMessage = data;
        }
        TVXInteractionPlugin.executeAction("busy:stop:loading");
    };
    var handleData = function(data) {
        if (data != null) {
            if (data.message === "ready") {
                onReady(null);
            } else if (data.data != null) {
                if (data.data.menu != null) {
                    showOrReplace("menu", data.data.menu);
                    onReady(data);
                } else if (data.data.content != null) {
                    showOrReplace("content", data.data.content);
                    onReady(data);
                } else if (data.data.panel != null) {
                    showOrReplace("panel", data.data.panel);
                    onReady(data);
                } else if (data.data.init === true) {
                    if (initMessage != null) {
                        handleData(initMessage);
                    } else {
                        TVXInteractionPlugin.info("No initial menu, content, or panel available. Please re-run the code to load it.");
                    }
                }
            }
        }
    };
    var handleRequest = function(dataId, data, callback) {
        if (!ready) {
            TVXInteractionPlugin.executeAction("[busy:start:loading|delay:loading:1:interaction:commit:message:ready]");
        }
        callback(INFO_MENU);
    };
    var postMessage = function(data, exportable) {
        if (data != null) {
            if (state == STATE_SENDER_READY && messagePlugin != null) {
                messagePlugin.postMessage({
                    type: "interactionPlugin",
                    action: TVXTools.strFullCheck(data.action, "interaction:load:" + INTERACTION_URL),
                    data: TVXTools.isFullStr(data.action) ? data.data : data
                }, "*");
            } else {
                initMessage = data;
            }
            if (exportable === true) {
                exportMessage = data;
            }
        }
    };
    var onMessageReceiverReady = function() {
        state = STATE_RECEIVER_READY;
    };
    var setupMessageReceiver = function() {
        if (state == STATE_SETUP) {
            state = STATE_SETUP_RECEIVER;
            TVXInteractionPlugin.setupHandler({
                ready: onMessageReceiverReady,
                handleData: handleData,
                handleRequest: handleRequest
            });
            TVXInteractionPlugin.init();
        }
    };
    var onMessageSenderReady = function() {
        state = STATE_SENDER_READY;
        messagePlugin = messageFrame != null ? messageFrame.contentWindow : null;
        if (initMessage != null) {
            initDelay.start(function() {
                postMessage(initMessage);
                initMessage = null;
            });
        }
    };
    var setupMessageSender = function(frame) {
        if (state == STATE_SETUP && frame != null) {
            state = STATE_SETUP_SENDER;
            messageFrame = frame;
            messageFrame.src = TVXTools.strReplaceMap(MSX_URL, {
                "{TIMESTAMP}": "" + TVXDateTools.getTimestamp()
            });
            messageFrame.addEventListener("load", onMessageSenderReady);
        }
    };
    var showMenu = function(data) {
        if (data != null) {
            postMessage({
                menu: data
            }, true);
        }
    };
    var showContent = function(data) {
        if (data != null) {
            postMessage({
                content: data
            }, true);
        }
    };
    var showPanel = function(data) {
        if (data != null) {
            postMessage({
                panel: data
            });
        }
    };
    var executeAction = function(action, data) {
        if (TVXTools.isFullStr(action)) {
            postMessage({
                action: action,
                data: data != null ? data : null
            });
        }
    };
    var createM3uAction = function(url, type, code) {
        if (url === "favorites") {
            return TVXTools.strReplaceMap(M3U_FAVORITES_ACTION, {
                "{TYPE}": TVXTools.strToUrlStr(TVXTools.strFullCheck(type, "video"))
            });
        }
        return TVXTools.isHttpUrl(url) ? TVXTools.strReplaceMap(M3U_ACTION, {
            "{URL}": encodeUrlParam(protectUrl(url, code)),
            "{TYPE}": TVXTools.strToUrlStr(TVXTools.strFullCheck(type, "video"))
        }) : null;
    };
    var createMrssAction = function(url, banner, background, plugin, dictionary) {
        return TVXTools.isHttpUrl(url) ? TVXTools.strReplaceMap(MRSS_ACTION, {
            "{URL}": encodeUrlId(url),
            "{BANNER}": encodeUrlId(banner),
            "{BACKGROUND}": encodeUrlId(background),
            "{PLUGIN}": encodeUrlId(plugin),
            "{DICTIONARY}": encodeUrlId(dictionary)
        }) : null;
    };
    var createExportUrl = function(icon, alias) {
        if (exportMessage != null) {
            if (exportMessage.menu != null) {
                return TVXTools.strReplaceMap(MSX_EXPORT_URL, {
                    "{ICON}": TVXTools.strToUrlStr(TVXTools.strFullCheck(icon, exportMessage.menu.icon)),
                    "{ALIAS}": TVXTools.strToUrlStr(TVXTools.strFullCheck(alias, exportMessage.menu.headline)),
                    "{START}": TVXTools.strToUrlStr("menu:json:" + objToBase64(exportMessage.menu))
                });
            } else if (exportMessage.content != null) {
                return TVXTools.strReplaceMap(MSX_EXPORT_URL, {
                    "{ICON}": TVXTools.strToUrlStr(TVXTools.strFullCheck(icon, exportMessage.content.icon)),
                    "{ALIAS}": TVXTools.strToUrlStr(TVXTools.strFullCheck(alias, exportMessage.content.headline)),
                    "{START}": TVXTools.strToUrlStr("content:json:" + objToBase64(exportMessage.content))
                });
            }
        }
        return null;
    };
    var exportData = function(icon, alias) {
        var url = createExportUrl(icon, alias);
        if (url != null) {
            window.open(url, "msx", "width=1280,height=720,scrollbars=no,menubar=no,status=no,titlebar=no,toolbar=no");
        }
    };
    var registerMainFunctions = function(obj) {
        obj.showMenu = showMenu;
        obj.showContent = showContent;
        obj.showPanel = showPanel;
        obj.executeAction = executeAction;
        obj.exportData = exportData;
    };
    var registerExtendedFunctions = function(obj) {
        obj.createM3uAction = createM3uAction;
        obj.createMrssAction = createMrssAction;
        obj.createExportUrl = createExportUrl;
    };
    var setup = function() {
        if (state == STATE_SETUP) {
            var frames = document.getElementsByTagName("iframe");
            if (frames != null && frames.length > 0) {
                setupMessageSender(frames[0]);
            } else {
                setupMessageReceiver();
            }
        }
    };
    var init = function() {
        if (state == STATE_INIT) {
            state = STATE_SETUP;
            TVXPluginTools.onReady(setup);
        }
    };
    registerMainFunctions(window);
    registerExtendedFunctions(this);
    init();
};
/******************************************************************************/
