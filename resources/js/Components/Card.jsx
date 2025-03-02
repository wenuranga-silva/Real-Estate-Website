

export default function Card({className='' ,children}) {

    return (

        <div className={`my-9 mx-6 p-3 bg-slate-50 shadow-md rounded-md ${className}`}>

            {children}
        </div>

    );

}

