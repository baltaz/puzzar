export const getBlockColor = id=> {
    let color = ""
    switch (id) {
        case 0: color = ""; break;
        case 1: color = "black"; break;
        case 2: color = "SpringGreen"; break;
        case 3: color = "Red"; break;
        case 4: color = "YellowGreen"; break;
        case 5: color = "Teal"; break;
        case 6: color = "Tomato"; break;
        case 7: color = "Coral"; break;
        case 8: color = "DarkTurquoise"; break;
        case 9: color = "SkyBlue"; break;
        default: break;
    }
    return color;
}