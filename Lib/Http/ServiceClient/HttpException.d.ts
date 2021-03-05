export declare namespace ServiceClientExceptions {
    class HttpException {
        private Url;
        private Status;
        private MachineId;
        private ErrorCode;
        private Message;
        constructor(Url: String, Message?: string, StatusCode?: number, MachineId?: string, ErrorCode?: string);
        fetch(): String;
    }
}
