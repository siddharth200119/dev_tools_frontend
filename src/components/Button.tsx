type ButtonStyles = {
    size: "sm" | "base" | "xs" | "lg" | "xl" | "2xl";
    rounded: "sm" | "md" | "lg" | "xl" | "2xl";
    spacing: string,
    hover?: boolean;
    theme: "normal" | "inverted";
}

type ButtonProps = {
    text: string;
    styles: ButtonStyles;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

function applyClasses(styles: ButtonStyles): string{
    let classes = "transition-all ";

    if(styles.theme === "inverted"){
        classes += "bg-gray-100 text-gray-700 ";       
    }else if(styles.theme === "normal"){
        classes += "bg-gray-700 text-gray-100 ";
    }

    if(styles.size === "xs"){
        classes += "text-xs px-2 py-1 ";
    }else if(styles.size === "sm"){
        classes += "text-sm px-3 py-1.5 ";
    }else if(styles.size === "base"){
        classes += "text-base px-4 py-2 "
    }else if(styles.size === "lg"){
        classes += "text-lg px-6 py-3 "
    }else if(styles.size === "xl") {
        classes += "text-xl px-7 py-3.5 "
    }else if(styles.size === "2xl") {
        classes += "text-2xl px-8 py-4 "
    }

    if(styles.spacing != undefined){
        classes += `${styles.spacing} `
    }

    if(styles.hover){
        classes += "hover:scale-110 ";
    }

    if(styles.rounded === "sm"){
        classes += "rounded-sm "
    }else if(styles.rounded === "md"){
        classes += "rounded-md "
    }else if(styles.rounded === "lg"){
        classes += "rounded-lg "
    }else if(styles.rounded === "xl"){
        classes += "rounded-xl "
    }else if(styles.rounded === "2xl"){
        classes += "rounded-2xl "
    }

    return classes;
}

const Button: React.FC<ButtonProps> = ({ text, styles, onClick }) => {

    const btnClasses = applyClasses(styles)

    return (
        <button onClick={onClick} className={btnClasses}>
            {text}
        </button>
    );
};

export default Button;
