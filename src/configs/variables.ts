import dotenv from "dotenv";
dotenv.config();

export class ENV {
  public static readonly PORT: string = process.env.PORT || "4000";
  public static readonly NODE_ENV: string = process.env.NODE_ENV || "development";
  public static readonly DB_URL: string = process.env.DB_URL || "";

  static get isDev(): boolean {
    return ["dev", "development"].includes(this.NODE_ENV);
  }
}
