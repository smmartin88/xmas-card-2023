import Row from "./row";

export default function Wordle() {
    return (
        <div className='flex flex-col items-center'>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-700 md:text-5xl lg:text-6xl">Wordle</h1>
            <Row/>
            <Row/>
            <Row/>
            <Row/>
            <Row/>
            <Row/>
        </div>
    );
}