
export default function Title({children ,className}) {

    return (

        <h1 className={`text-3xl font-bold mb-5 bg-gradient-to-bl via-primary from-tertiary to-secondary text-transparent bg-clip-text ${ className }`}>{children}</h1>
    );

}
