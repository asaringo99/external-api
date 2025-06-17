import type { tags } from "typia";

/**
 * 手間いらずホテルコード
 */
export type UserId = string & tags.MaxLength<255>;
