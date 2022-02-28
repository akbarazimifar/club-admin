
export const handleNull = (value) => {
    if (!value || value === "null") {
        return "-"
    }
    return value
}

export const handleNumber = (value) => {
    if (+value === 0) {
        return 0
    }
    if (!value || value === "null") {
        return "-"
    }
    else if (typeof value !== "number") {
        return value
    }
    return parseFloat(value.toFixed(2)).toLocaleString();
}

export const handleStatus = (value) => {
    switch (value) {
        case "SUBMITTED":
            return "در انتظار"
        case "REJECTED":
            return "لغو شده"
        case "FINALIZED":
            return "نهایی شده"
        default:
            return "نامشخص"
    }
}

export const handleIsActive = (value) => {
    switch (value) {
        case "TRUE":
            return "فعال"
        case "FALSE":
            return "غیر فعال"
        default:
            return "نامشخص"
    }
}