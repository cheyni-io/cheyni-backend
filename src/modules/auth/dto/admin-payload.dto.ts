import { ProfileEnum } from 'src/components/enum/profile.enum';

export class AdminPayloadDTO {
  id: string;
  name: string;
  email: string;
  profile: ProfileEnum;
}
