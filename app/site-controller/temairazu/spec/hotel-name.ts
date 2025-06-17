import type { tags } from "typia";

/**
 * 施設名
 */
export type HotelName = string & tags.MaxLength<255>;
