import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";

export default function ModalDialog({ dialogSize = 'md' ,title = null ,isOpen ,onOpenChange ,children }) {

    // const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const { onClose } = useDisclosure();
    const [size, setSize] = React.useState(dialogSize);
    const [scrollBehavior, setScrollBehavior] = React.useState("outside");

    //const sizes = ["xs", "sm", "md", "lg", "xl", "full"];

    return (
        <>

            <Modal
                isOpen={isOpen}
                scrollBehavior={scrollBehavior}
                onOpenChange={onOpenChange} size={size}
                onClose={onClose}
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: "easeOut",
                            },
                        },
                        exit: {
                            y: -20,
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: "easeIn",
                            },
                        },
                    },
                }}
            >

                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                            <ModalBody>

                                { children }

                            </ModalBody>
                            <ModalFooter>

                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

