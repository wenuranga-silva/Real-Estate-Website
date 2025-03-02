import Navigation from "@/Components/Navigation";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";


export default function Frontend({ children ,className = null }) {

    const { props } = usePage();
    const [flashSuccess, setFlashSuccess] = useState("");
    const [flashError, setFlashError] = useState("");

    // Update flash messages when props change
    useEffect(() => {

        if (props.flash.success) {

            setFlashSuccess(props.flash.success);
        }
        if (props.flash.error) {

            setFlashError(props.flash.error);
        }

    }, [props.flash]);

    // Show toast notifications
    useEffect(() => {
        if (flashSuccess) {

            toast.success((t) => (

                <span className="flex">
                    {flashSuccess}
                    <button
                        className="text-orange-600 pl-3"
                        onClick={() => {
                            toast.dismiss(t.id);
                            setFlashError(""); // Reset flash message
                        }}
                    >
                        Close
                    </button>
                </span>
            ), {
                duration: 3000,
                style: {
                    padding: "10px",
                    color: "#000",
                },
                iconTheme: {
                    primary: "#00A36C",
                    secondary: "#FFFAEE",
                },
            });

            setFlashSuccess(""); // Reset flash message
        }

        if (flashError) {

            toast.error((t) => (

                <span className="flex">
                    {flashError}
                    <button
                        className="text-orange-600 pl-3"
                        onClick={() => {
                            toast.dismiss(t.id);
                            setFlashError(""); // Reset flash message
                        }}
                    >
                        Close
                    </button>
                </span>
            ), {
                duration: 3000,
            });

            setFlashError("");
        }

    }, [flashSuccess, flashError]);

    return (


        <div className={`flex flex-col ${className}`}>

            <Navigation />

            {children}

            <Toaster />
        </div>
    );

}

