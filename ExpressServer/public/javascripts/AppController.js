


function progerssLogin(isSuccess) {
    return { type: 'loginOn', data: { success: isSuccess } };
}

function getEventAction(ev, component) {
    if (ev.target.dataset.action == 'submit') {
        var loginName = "";
        var password = "";
        return progerssLogin(true);
    }
}


export function AppController(dispatch) {
    return function (ev, component) {
        dispatch(getEventAction(ev, component));
    };
}