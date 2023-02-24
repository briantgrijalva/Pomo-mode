
type TimerActions =
{ type: 'set_work_time', payload: number | number[] } |
{ type: 'set_break_time', payload: number | number[] } |
{ type: 'set_initial_break_time', payload: number | number[] } |
{ type: 'set_initial_work_time', payload: number | number[] } |
{ type: 'add_work_session', payload: number }

export interface TimerState {
    workTime: number | number[];
    breakTime: number | number[];
    initialWorkTime: number | number[];
    initialBreakTime: number | number[];
    workSessions: number;
}

export const timerReducer = (state: TimerState, action: TimerActions): TimerState => {

    switch (action.type) {
        case 'set_work_time':
            return {
                ...state,
                workTime: action.payload,
            };
        case 'set_break_time':
            return {
                ...state,
                breakTime: action.payload,
            };
        case 'set_initial_break_time':
            return {
                ...state,
                initialBreakTime: action.payload,
            };
        case 'set_initial_work_time':
            return {
                ...state,
                initialWorkTime: action.payload,
            };
        case 'add_work_session':
            return {
                ...state,
                workSessions: action.payload,
            };
        default:
        return state;
    }
};
