import { SqlCompareOptions } from '../SqlTypes/SqlCompareOptions';

export class SqlCollation {
	private static FirstSupportedCollationVersion(lcid: number) {
		if (lcid <= 1157) {
			if (lcid <= 1093) {
				if (lcid <= 1047) {
					if (lcid == 1044) {
						return 2;
					}
					if (lcid == 1047) {
						return 2;
					}
				} else {
					if (lcid == 1056) {
						return 2;
					}
					switch (lcid) {
						case 1065:
							return 2;
						case 1066:
						case 1067:
						case 1069:
							break;
						case 1068:
							return 2;
						case 1070:
							return 2;
						case 1071:
							return 1;
						default:
							switch (lcid) {
								case 1081:
									return 1;
								case 1082:
									return 2;
								case 1083:
									return 2;
								case 1087:
									return 1;
								case 1090:
									return 2;
								case 1091:
									return 1;
								case 1092:
									return 1;
								case 1093:
									return 2;
							}
							break;
					}
				}
			} else if (lcid <= 1114) {
				switch (lcid) {
					case 1101:
						return 2;
					case 1102:
					case 1103:
					case 1104:
						break;
					case 1105:
						return 2;
					case 1106:
						return 2;
					case 1107:
						return 2;
					case 1108:
						return 2;
					default:
						if (lcid == 1114) {
							return 1;
						}
						break;
				}
			} else {
				switch (lcid) {
					case 1121:
						return 2;
					case 1122:
						return 2;
					case 1123:
						return 2;
					case 1124:
						break;
					case 1125:
						return 1;
					default:
						if (lcid == 1133) {
							return 2;
						}
						switch (lcid) {
							case 1146:
								return 2;
							case 1148:
								return 2;
							case 1150:
								return 2;
							case 1152:
								return 2;
							case 1153:
								return 2;
							case 1155:
								return 2;
							case 1157:
								return 2;
						}
						break;
				}
			}
		} else if (lcid <= 2143) {
			if (lcid <= 2074) {
				if (lcid == 1164) {
					return 2;
				}
				if (lcid == 2074) {
					return 2;
				}
			} else {
				if (lcid == 2092) {
					return 2;
				}
				if (lcid == 2107) {
					return 2;
				}
				if (lcid == 2143) {
					return 2;
				}
			}
		} else if (lcid <= 3098) {
			if (lcid == 3076) {
				return 1;
			}
			if (lcid == 3098) {
				return 2;
			}
		} else {
			if (lcid == 5124) {
				return 2;
			}
			if (lcid == 5146) {
				return 2;
			}
			if (lcid == 8218) {
				return 2;
			}
		}
		return 0;
	}

	public get LCID() {
		return <number>(this.info & 1048575);
	}
	public set LCID(value: number) {
		const num = value & 1048575;
		const num2 = SqlCollation.FirstSupportedCollationVersion(num) << 28;
		this.info = (this.info & 32505856) | num | num2;
	}

	public get SqlCompareOptions() {
		let sqlCompareOptions = SqlCompareOptions.None;
		if ((this.info & 1048576) != 0) {
			sqlCompareOptions |= SqlCompareOptions.IgnoreCase;
		}
		if ((this.info & 2097152) != 0) {
			sqlCompareOptions |= SqlCompareOptions.IgnoreNonSpace;
		}
		if ((this.info & 4194304) != 0) {
			sqlCompareOptions |= SqlCompareOptions.IgnoreWidth;
		}
		if ((this.info & 8388608) != 0) {
			sqlCompareOptions |= SqlCompareOptions.IgnoreKanaType;
		}
		if ((this.info & 16777216) != 0) {
			sqlCompareOptions |= SqlCompareOptions.BinarySort;
		}
		return sqlCompareOptions;
	}

	public set SqlCompareOptions(value: SqlCompareOptions) {
		let num = 0;
		if ((value & SqlCompareOptions.IgnoreCase) != SqlCompareOptions.None) {
			num |= 1048576;
		}
		if ((value & SqlCompareOptions.IgnoreNonSpace) != SqlCompareOptions.None) {
			num |= 2097152;
		}
		if ((value & SqlCompareOptions.IgnoreWidth) != SqlCompareOptions.None) {
			num |= 4194304;
		}
		if ((value & SqlCompareOptions.IgnoreKanaType) != SqlCompareOptions.None) {
			num |= 8388608;
		}
		if ((value & SqlCompareOptions.BinarySort) != SqlCompareOptions.None) {
			num |= 16777216;
		}
		this.info = (this.info & 1048575) | num;
	}

	public TraceString(): string {
		return `(LCID=${this.LCID}, Opts=${this.SqlCompareOptions})`;
	}

	public static AreSame(a: SqlCollation, b: SqlCollation): boolean {
		if (a == null || b == null) {
			return a == b;
		}
		return a.info == b.info && a.sortId == b.sortId;
	}

	public readonly MaskLcid = 1048575;

	public info: number;

	public sortId: number;
}
