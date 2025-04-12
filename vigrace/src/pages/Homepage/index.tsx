import { Input, Card, CardBody, CardHeader, Button, Form, addToast} from "@heroui/react";
import { useState, type FormEvent} from "react";
import { FaUser as User, FaLock as Lock } from "react-icons/fa6";
import { IoLogInOutline as Login } from "react-icons/io5";
import { useNavigate } from "react-router";
import logo from "/logo.png"; 

export default function Homepage() {
    const [isLoading, setIsLoading] = useState<boolean>(false); 
    const navigate = useNavigate();

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        setIsLoading(true);
        const data = Object.fromEntries(new FormData(event.currentTarget));
        setTimeout(() => {
            if (data.user === "admin" && data.password === "admin") {
                navigate("/dashboard");
            } else {
                addToast({
                    title: "Valores incorrectos", 
                    description: "El usuario o la contraseña son incorrectos", 
                    color: "danger"
                })
            }
            setIsLoading(false);
        }, 2000);
    }

    return (
        <main className="w-full  font-inter dark flex flex-col items-center justify-center h-screen text-foreground bg-background">
            <Card className="min-w-[380px] w-1/4 shadow-2xl">
                <CardHeader className="font-extrabold text-3xl flex flex-col items-center justify-center gap-2">
                    <img alt="Logo de la universidad de guadalajara" src={logo} width={150} />
                    <h2>VIGRACE</h2>
                </CardHeader>
                <CardBody>
                    <Form validationBehavior="native" onSubmit={handleSubmit}>
                        <Input
                            label="Usuario"
                            startContent={<User aria-hidden />}
                            placeholder="Ingresa el usuario"
                            isRequired
                            variant="bordered"
                            name="user"
                        />
                        <Input
                            label="Contraseña"
                            startContent={<Lock aria-hidden />}
                            placeholder="Ingresa la contraseña"
                            isRequired
                            variant="bordered"
                            name="password"
                            type="password"
                        />
                        <div className="flex items-center justify-end w-full">
                            <Button variant="flat" color="primary" className="w-full" startContent={<Login aria-hidden />} isLoading={isLoading} type="submit">
                                Ingresar
                            </Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </main>
    );
}
