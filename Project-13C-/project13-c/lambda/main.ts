import addLolly from './addLollymark';
 
import getLolly from './getLollymark';
 


import Lolly from './Lolly';

type AppSyncEvent = {
    info: {
        fieldName: string
    },
    arguments: {
       
        lollys: Lolly
    }
}

exports.handler = async (event: AppSyncEvent) => {
    switch (event.info.fieldName) {

        case "addLolly":
            return await addLolly(event.arguments.lollys);
        case "getLolly":
            return await getLolly();
        default:
            return null;
    }
}