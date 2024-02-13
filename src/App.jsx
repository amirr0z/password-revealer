import { useState } from "react";
import Input from "./components/Input";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="min-h-screen min-w-full flex flex-wrap justify-center items-center">
            <Input />
        </div>
    );
}

export default App;
