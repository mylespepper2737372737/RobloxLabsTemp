declare namespace System {
	type Int64 = number;
	type Int32 = number;
	type String = string;
	type Boolean = boolean;
	type DateTime = Date;
}
type Int64 = System.Int64;
type Int32 = System.Int32;

declare namespace System.Threading {
	type Task = Promise;
}
