
type TimerActions =
{ type: 'set_work_time', payload: number | number[] } |
{ type: 'set_break_time', payload: number | number[] } |
{ type: 'set_initial_time', payload: number | number[] }

export interface TimerState {
    workTime: number | number[];
    breakTime: number | number[];
    initialTime: number | number[];
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
        case 'set_initial_time':
            return {
                ...state,
                initialTime: action.payload,
            };
        default:
        return state;
    }
};
