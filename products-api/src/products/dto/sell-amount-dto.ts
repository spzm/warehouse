import {Type} from "class-transformer";
import {Min} from "class-validator";

export class SellAmountDto {
  @Type(() => Number)
  @Min(1, { always: true })
  amount: number;
}
