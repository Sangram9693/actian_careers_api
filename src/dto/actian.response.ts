import { DepartmentJobUndefined } from '../models/actian.model';

class ActianResponse {
    status: number = 0;
    message?: string = '';
    data?: DepartmentJobUndefined = undefined;

    setStatus(status: number): void {
        this.status = status;
    }

    setMessage(message: string): void {
        this.message = message;
    }

    setData(data: DepartmentJobUndefined): void {
        this.data = data;
    }
}

export default ActianResponse;