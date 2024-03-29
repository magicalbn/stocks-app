import React from "react";

const Input = (props) => {
    let inputElement = null;

    let classname = ["data-input"];

    if (!props.config.valid && props.config.isTouched) {
        classname.push("invalid");
    }

    switch (props.config.elementType) {
        case "input":
            inputElement = (
                <input
                    className={classname.join(" ")}
                    value={props.config.value}
                    onChange={props.changed}
                    {...props.config.elementConfig}
                />
            );
            break;
        case "textarea":
            inputElement = (
                <textarea
                    className={classname.join(" ")}
                    value={props.config.value}
                    onChange={props.changed}
                    {...props.config.elementConfig}
                />
            );
            break;
        case "select":
            inputElement = (
                <select
                    className={classname.join(" ")}
                    value={props.config.value}
                    onChange={props.changed}
                >
                    {props.config.elementConfig.options.map((each) => {
                        return (
                            <option key={each.value} value={each.value}>
                                {each.displayValue}
                            </option>
                        );
                    })}
                </select>
            );
            break;
        default:
            inputElement = (
                <input
                    className={classname.join(" ")}
                    value={props.config.value}
                    onChange={props.changed}
                    {...props.config.elementConfig}
                />
            );
            break;
    }

    return <>{inputElement}</>;
};

export default Input;
