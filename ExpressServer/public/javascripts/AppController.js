function getEventType(ev,component){
    if(ev.target.dataset.action =='submit'){
        
    }
}

export function AppController(dispatch) {
    return function (ev,component) {
        var type = getEventType(ev,component);
        switch (type) {
            default:
                dispatch({});
        }
    };
}