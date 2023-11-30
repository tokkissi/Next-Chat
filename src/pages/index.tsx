import { Inter } from "next/font/google";
import SocketChat from "./components/SocketChat";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`${inter.className}`}>
      <SocketChat />
    </main>
  );
}
