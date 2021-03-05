export declare namespace Pages {
    function GetPageCursorByKey(Key: String): String;
    function GetCursorLimitByKey(Key: String): Number;
    function SetPageByKey(Key: String, Cursor: String, Limit?: Number, OverwriteCursor?: Boolean): String;
}
