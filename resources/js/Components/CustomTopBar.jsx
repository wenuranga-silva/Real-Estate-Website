import LinkDefault from "./LinkDefault";

export default function CustomTopBar({title ,_url =null ,children ,...props}) {

    return (

        <>
            <h2 className="mx-auto text-secondary text-lg font-_Lato">{title}</h2>

            <div className="flex w-min xsm:w-fit">
                <LinkDefault {...props} href={_url} className="mr-4 md:mr-10 flex bg-slate-200">

                    {children}
                </LinkDefault>
            </div>
        </>
    );

}
