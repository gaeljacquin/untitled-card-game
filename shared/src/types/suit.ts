import { suits } from "../constants/card";

export type Suit = (typeof suits)[keyof typeof suits];
