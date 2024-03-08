export type TTimeRecord = {
    id: string,
    startTime: Date
    durationMinutes: number
}

export type TProject = {
    id: string,
    FreelancerId: string
    CustomerId: string,
    tartTime: Date,
    deadline: Date,
    TimeRegistrations: TTimeRecord[],
    isActive: boolean,
    name: string,
}

export type TCreateTimeRecordRequest = {
    projectId: string,
    startTime: Date
    durationMinutes: number
}

type TGetListProjectOverviewResponse = {
    data: TProject[];
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: Record<string, any>;
    request?: any;
}