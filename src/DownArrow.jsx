const DownArrow = ({className, fill}) => (
    <svg
        className={`${className}`}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        width="256"
        height="256"
        viewBox="0 0 256 256"
        xmlSpace="preserve"
    >
        <defs></defs>
        <g
            style={{
                stroke: "none",
                strokeWidth: 0,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeMiterlimit: 10,
                fill: "none",
                fillRule: "nonzero",
                opacity: 1,
            }}
            transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
        >
            <path
                d="M 46.969 89.104 c -1.041 1.194 -2.897 1.194 -3.937 0 L 13.299 54.989 c -0.932 -1.072 -0.171 -2.743 1.25 -2.743 h 14.249 V 1.91 c 0 -1.055 0.855 -1.91 1.91 -1.91 h 28.584 c 1.055 0 1.91 0.855 1.91 1.91 v 50.336 h 14.249 c 1.421 0 2.182 1.671 1.25 2.743 L 46.969 89.104 z"
                style={{
                    stroke: "none",
                    strokeWidth: 1,
                    strokeDasharray: "none",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 10,
                    fill,
                    fillRule: "nonzero",
                    opacity: 1,
                }}
                transform="matrix(1 0 0 1 0 0)"
                strokeLinecap="round"
            />
        </g>
    </svg>
);

export default DownArrow;
