export interface SuperVisorProps {
  avatar: string;
  name: string;
}

export interface BranchProps {
  id: number;
  branchName: string;
  tel: string;
  isIconShowing: boolean;
  fax: string;
  address: string;
  cameraNo: number;
  serviceNo: number;
  coordinates: [number, number];
  superVisors: SuperVisorProps[];
  services: ('FD' | 'FB' | 'PC')[];
}
