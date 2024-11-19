import {
    GradientOne,
    GradientTwo, Icon, Large, Long, Medium, Nav,
    Outline,
    Primary,
    Circle,
    Rounded, Small,
    Submit,
    SubmitThree,
    SubmitTwo,
    Wrapper
} from "./button.element";
import {Link} from "react-router-dom";

function Button({
                    to,
                    href,
                    submit = false,
                    primary = false,
                    gradientOne = false,
                    gradientTwo = false,
                    submitTwo = false,
                    submitThree = false,
                    circle=false,
                    outline = false,
                    nav = false,
                    text = false,
                    rounded = false,
                    disabled = false,
                    small = false,
                    large = false,
                    medium = false,
                    long = false,
                    children,
                    leftIcon,
                    rightIcon,
                    onClick,
                    ...passProps
                }) {
    let Comp = Wrapper;

    // Assign specific component based on the props
    if (gradientOne) Comp = GradientOne;
    else if (gradientTwo) Comp = GradientTwo;
    else if (submit) Comp = Submit;
    else if (submitTwo) Comp = SubmitTwo;
    else if (submitThree) Comp = SubmitThree;
    else if (rounded) Comp = Rounded;
    else if (primary) Comp = Primary;
    else if (outline) Comp = Outline;
    else if (text) Comp = Text;
    else if (nav) Comp = Nav;
    else if (small) Comp = Small;
    else if (medium) Comp = Medium;
    else if (large) Comp = Large;
    else if (long) Comp = Long;
    else if (circle) Comp = Circle;

    const props = { onClick, disabled, ...passProps };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    return (
        <Comp {...props}>
            {leftIcon && <Icon>{leftIcon}</Icon>}
            <span>{children}</span>
            {rightIcon && <Icon>{rightIcon}</Icon>}
        </Comp>
    );
}

export default Button;
