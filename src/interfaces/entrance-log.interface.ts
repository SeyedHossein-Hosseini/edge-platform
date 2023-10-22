export interface EntranceLogInterface {
  avatarURL: string;
  firstName: string;
  lastName: string;
  streamNumber: string;
  profileID: string;
  confidence: number;
  counter: number;
  timestamp: string;
  maxConfidence?: number;
}
