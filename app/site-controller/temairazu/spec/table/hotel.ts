import typia from "typia";
import type { UserId } from "../user-id";
import type { HotelName } from "../hotel-name";
import type { CatchCopy } from "../catch-copy";

/**
 * 宿泊施設情報
 */
export interface Hotel {
    /**
     * 手間いらずホテルコード
     */
    userId: UserId;
    /**
     * 施設名
     */
    hotelName: HotelName;
    /**
     * キャッチコピー
     */
    catchCopy: CatchCopy;
}

export const assertHotel = typia.createAssert<Hotel>();
export const isHotel = typia.createIs<Hotel>();
export const validateHotel = typia.createValidate<Hotel>();
