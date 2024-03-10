export type TTimeRecord = {
  id: string;
  startTime: string;
  durationMinutes: number;
};

export type TProject = {
  id: string;
  freelancerId: string;
  customerId: string;
  startTime: string;
  deadline: string;
  timeRegistrations: TTimeRecord[];
  isActive: boolean;
  name: string;
};

export type TCreateTimeRecordRequest = {
  projectId: string;
  startTime: Date;
  durationMinutes: number;
};
