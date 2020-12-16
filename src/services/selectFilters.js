import { filters } from "../constants/filters";

export const getSelectFilters = (optionNumber) => {

    let status, period, relative;

    switch (optionNumber) {
        case 0:
        case 1:
        case 6:
        case 7:
            status = filters.status.confirmed;
            break;
        case 2:
        case 3:
        case 8:
        case 9:
            status = filters.status.deaths;
            break;
        case 4:
        case 5:
        case 10:
        case 11:
            status = filters.status.recovered;
            break;
        default:
            break;
    }

    if (optionNumber > 5) relative = filters.relative.to100men;
    else relative = filters.relative.absolute;

    if (optionNumber % 2 === 0) period = filters.period.all;
    else period = filters.period.lastDay;

    return {status, period, relative};
}
