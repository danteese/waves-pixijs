import dynamic from "next/dynamic";

const MyStageNoSSR = dynamic(() => import('../components/stage'), {
    ssr: false,
    loading: () => <p>Cargando</p>
});

function SafeHydrate({ children }) {
    return (
        <div suppressHydrationWarning>
            {typeof window === 'undefined' ? null : children}
        </div>
    )
}

export default function Home() {
    return (
        <div>
            <MyStageNoSSR/>
        </div>
    )
}
