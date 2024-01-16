import React from "react";

import Spinner from "../Spinner";

const Dropdown = (props) => {
    const { list, length, loading } = props;

    let count = 0;
    let content = list.map((each) => {
        if (++count > 3) return;

        return (
            <div
                key={each.symbol}
                onClick={() => props.setHandler(each.symbol)}
            >
                <p className="symbol">{each.symbol}</p>
                <p className="name">{each.shortname}</p>
            </div>
        );
    });

    return (
        <div className="dropdown">
            {!loading ? (
                list.length ? (
                    content
                ) : !length ? null : (
                    <div>
                        {" "}
                        <p>{"Did not find any matches"}</p>
                    </div>
                )
            ) : (
                <div className="dropdown-spinner">
                    <Spinner />
                </div>
            )}
        </div>
    );
};

export default Dropdown;
