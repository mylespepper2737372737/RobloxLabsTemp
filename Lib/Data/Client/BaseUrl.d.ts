export declare namespace BaseURL {
    function GetBaseURL(): string;
    function GetSecureBaseURL(): string;
    function ConstructServicePath(subDomain: string, servicePath?: string, secure?: boolean): string;
}
