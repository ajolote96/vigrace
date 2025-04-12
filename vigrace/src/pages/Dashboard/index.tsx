import NavBar from "../../components/NavBar";

export default function Dashboard(){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
            <NavBar />
            <main className="flex flex-col items-center justify-center w-full h-full flex-1">

            </main>
        </div>
    )
}