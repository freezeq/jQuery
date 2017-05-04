/*!
 * jQuery EncircleText
 * https://blog.freezeq.com/
 *
 * Copyright 2017 by freezeQ
 * Date: 2017-05-01T02:24:58.181Z
 */

(function ($) {
    $.fn.encircleText = function (c) {
        var char, isCtrlKey, isShiftKey;

        function addChar(e, c) {
            var event = e,
                input = e.target;

            if (!validate()) return;

            // Begin adding char
            var value = $(input).val(),
                pos = $(input).prop('selectionStart'),
                char = c || "",
                startChar = value.substring(0, char.length),
                endChar = value.substr(value.length - char.length, char.length),
                newValue = value,
                newPos = pos;

            // Add newChar if not start with it
            if (startChar != char) {
                newValue = char + newValue;
                newPos += char.length;
            }
            // Add newChar if not end with it
            if (endChar != char) {
                newValue = newValue + char;
            }

            // Finalize
            $(input).val(newValue)
              .prop({ selectionStart: newPos, selectionEnd: newPos });
            
            function validate() {
                var notValid = (($(input).val() === '')        // Skip if empty
                              || (!checkValidKey(e))               // Validate the key
                              || (window.getSelection().toString() != '')); // Select text

                return !notValid;
            }
        }

        function checkValidKey(e) {
            var keyCode = e.keyCode == 0 ? e.which : e.keyCode,
                nonPrintableKeys = [13, 35, 36, 37, 38, 39, 40]; // Tab, Enter, End, Home, LEFT, UP, RIGHT, DOWN


            var notValid = ((isCtrlKey) // CTRL
                          || (isShiftKey && nonPrintableKeys.indexOf(e.keyCode) != -1)  // SHIFT + non printable
                          || (keyCode >= 112 && keyCode <= 127)                         // (Fkey)
                          || (nonPrintableKeys.indexOf(e.keyCode) != -1));              // Special keys

            return !notValid;
        }

        return this.each(function () {
            if (!$(this).is('input, textarea')) throw new Error("Expected element is input text or textarea.");

            $(this).keyup(function (e) {
                addChar(e, c);
            });
            $(this).keydown(function (e) {
                isCtrlKey = e.ctrlKey;
                isShiftKey = e.shiftKey;
            });
        });
    }
}(jQuery));
