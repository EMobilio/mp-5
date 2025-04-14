import ShortenerForm from "@/components/ShortenerForm";

export default function Home() {
  return (
    <main className={"flex absolute top-0 w-screen h-screen flex-col items-center justify-center bg-[linear-gradient(to_top,#79BEEE,#DCABDF)]"}>
        <div className={"flex flex-col items-center w-full"}>
            <ShortenerForm />
        </div>
    </main>
  );
}
