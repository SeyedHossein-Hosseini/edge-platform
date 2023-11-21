export interface PersonnelDataInterface {
  avatarURL: string;
  name: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  position: string;
  organization: string;
  profileID: string;
  isOnline: boolean;
  confidence?: number;
  counter?: number;
  timestamp?: string;
}
