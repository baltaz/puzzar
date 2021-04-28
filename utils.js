export const getBlockColor = id=> {
    let color = ""
    switch (id) {
        case 0: color = ""; break;
        case 1: color = "#FFF"; break;
        case 2: color = "#63D2B4"; break;
        case 3: color = "#CB6699"; break;
        case 4: color = "#68788E"; break;
        case 5: color = "#61DAFB"; break;
        case 6: color = "#FF7262"; break;
        case 7: color = "#F6AC57"; break;
        case 8: color = "#8F80BA"; break;
        case 9: color = "#BB937D"; break;
        default: break;
    }
    return color;
}