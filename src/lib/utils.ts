
export function nameInitials(name:string){
    const initialsArr = name.split(' ', 2);

    return initialsArr.map((n)=>n[0]).join("");
}

interface DateDifference {
    seconds: number
    minutes: number
    hours: number
    days: number
    weeks: number
    months: number
    years: number
}

export function dateDifference(date:Date):DateDifference{
    const now = new Date;

    const seconds = Math.abs(now.getSeconds()-date.getSeconds());
    const minutes = Math.abs(now.getMinutes()-date.getMinutes());
    const hours = Math.abs(now.getHours()-date.getHours());
    const days = Math.abs(now.getDay()-date.getDay());
    const weeks = Math.ceil(days/7);

    const months = Math.abs(now.getMonth()-date.getMonth());
    const years = Math.abs(now.getFullYear()-date.getFullYear());


    return {
        seconds:seconds,
        minutes:minutes,
        hours:hours,
        days:days,
        weeks:weeks,
        months:months,
        years:years
    };
}

export function getFilesText(fileTextDefault:string, files:FileList|null){
    let fileText:string=fileTextDefault;

    if (files && files?.length>0){
        fileText="";

        for (let i=0; i<files?.length; i++) {
            if(i>0){
                fileText+=', ';
            }
            const file = files.item(i);
            fileText+=file?.name;
        }
    }

    return fileText;
}

export function check(node:HTMLInputElement){
    node.onkeydown=(e:KeyboardEvent)=>{
        if (e.key ==='Enter') {
            node.checked = !node.checked;
        }
    }
}