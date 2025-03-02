import { Link } from '@inertiajs/react';
import logo from '../../assets/images/logo_transparent.png';

export default function ApplicationLogo(props) {
    return (

        <Link href={route('home')}>
            <img src={logo} alt="logo" {...props} />
        </Link>
    );
}
