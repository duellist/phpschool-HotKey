(function($) {
    var storage = chrome.storage.sync;
    var keyLink = [];
    storage.get('settings', function(res) {
        keyLink = res.settings;
    });

    chrome.storage.onChanged.addListener(function(changes, namespace) {
        keyLink = changes.settings.newValue;
    });

    $(function() {
        $(document).on('keydown', function(e) {
            if (e.ctrlKey === true) {
                switch (e.keyCode) {
                    case 48: // Ctrl + 0
                    case 49: // Ctrl + 1
                    case 50: // Ctrl + 2
                    case 51: // Ctrl + 3
                    case 52: // Ctrl + 4
                    case 53: // Ctrl + 5
                    case 54: // Ctrl + 6
                    case 55: // Ctrl + 7
                    case 56: // Ctrl + 8
                    case 57: // Ctrl + 9
                        $.each(keyLink, function(k, v) {
                            if (v.key == e.keyCode && v.link.length > 0) {
                                location.href = v.link;
                                return false;
                            }
                        });
                        return false;
                        break;
                }
            }
        });
    });
})(jQuery);