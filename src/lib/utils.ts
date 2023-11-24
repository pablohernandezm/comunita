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
    const dSeconds = Math.abs(((new Date).getTime()-(date.getTime()))/1000);

    const years = Math.abs((new Date()).getFullYear()-date.getFullYear())
    const months= Math.abs((((new Date()).getMonth())+1)-(date.getMonth()+1))

    const seconds= dSeconds;
    const minutes = Math.ceil(dSeconds/60)
    const hours=Math.ceil(minutes/60)
    const days = Math.ceil(hours/24)
    const weeks=Math.ceil(days/7)


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