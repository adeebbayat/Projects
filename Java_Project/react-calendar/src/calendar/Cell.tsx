import clsx from 'clsx';

interface Props extends React.PropsWithChildren {
    isActive?: boolean;
    className?: string;
    onClick?: () => void;
}

const Cell: React.FC<Props> = ({isActive = false,className, onClick,children}) => {

    return(
        <div onClick={isActive ? undefined : onClick} className = {clsx(
            "select-none h-12 flex items-center justify-center border-b border-r",
            {"bg-gray-400": isActive},
            {"cursor-pointer hover:bg-gray-100 active:bg-gray-200": !isActive && onClick},
            className)}>
            {children}
        </div>
    )
}

export default Cell;