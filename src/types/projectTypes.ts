export type TTimeRecord = {
  id: string;
  startTime: Date;
  durationMinutes: number;
};

export type TProject = {
  id: string;
  freelancerId: string;
  customerId: string;
  startTime: Date;
  deadline: Date;
  timeRegistrations: TTimeRecord[];
  isActive: boolean;
  name: string;
};

export type TCreateTimeRecordRequest = {
  projectId: string;
  startTime: Date;
  durationMinutes: number;
};
