export interface TimeTableModel {
  getTimetableStatus: 'none' | 'pending' | 'success' | 'failure';
  timetable: [
    string[],
    string[],
    string[],
    string[],
    string[],
    string[],
    string[],
  ];
}
