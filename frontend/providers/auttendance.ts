export interface Attendance {
  user_id: string;
  month: number;
  year: number;
  streak: number; // exclude saturday, and count days
  attendance: boolean[];
}
// /users/attendance?month=0 // 0=jan
