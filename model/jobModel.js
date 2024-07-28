import { v4 as uuidv4 } from 'uuid';


export default class JobModel {
    constructor() {
        this.id = uuidv4();
        this.status = 'pending';
        this.result = null
    }
}
// basic class for job