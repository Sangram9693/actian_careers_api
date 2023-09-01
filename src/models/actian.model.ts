interface Job {
    position: string;
    location: string;
    jobLink: string;
}

interface DepartmentJob {
    department: string;
    openings: Job[];
}

type DepartmentJobUndefined = DepartmentJob | undefined;

interface ActianServiceResp {
    message: string;
    data: DepartmentJobUndefined; 
}

export {
    ActianServiceResp,
    DepartmentJob,
    Job,
    DepartmentJobUndefined
}