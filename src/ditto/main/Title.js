import React from 'react'

const Title = ({text, bold, italic, mainTag, position, className, colorText}) => {

    let finalTitle = text;
    let finalClassName;
    let colorTxt = colorText || "rgba(0, 0, 0, 0.85)";

    switch (position) {
        case "center":
            finalClassName = "center-title-style";
            break;
        case "left":
            finalClassName = "left-title-style";
            break;
        case "right":
            finalClassName = "right-title-style";
            break;
        default:
            finalClassName = "default-title-style";
    }

    if (className) {
        finalClassName += " " + className;
    }
    if (bold) {
        finalTitle = (<b>{finalTitle}</b>)
    }
    if (italic) {
        finalTitle = (<i>{finalTitle}</i>)
    }
    switch (mainTag) {
        case "h1":
            finalTitle = (<h1 className={finalClassName} style={{color: colorTxt}}>{finalTitle}</h1>);
            break;
        case "h2":
            finalTitle = (<h2 className={finalClassName} style={{color: colorTxt}}>{finalTitle}</h2>);
            break;
        case "h3":
            finalTitle = (<h3 className={finalClassName} style={{color: colorTxt}}>{finalTitle}</h3>);
            break;
        case "h4":
            finalTitle = (<h4 className={finalClassName} style={{color: colorTxt}}>{finalTitle}</h4>);
            break;
        default:
            finalTitle = (<div className={finalClassName} style={{color: colorTxt}}>{finalTitle}</div>);
    }
    return finalTitle;
};

export default Title
