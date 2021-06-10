import {Container, Sprite, Stage, useApp, withFilters, withPixiApp} from "@inlet/react-pixi";
import {useEffect, useRef, useState} from "react";
import {utils, filters} from "pixi.js";
import * as PIXI from "pixi.js"

const Filters = withFilters(Container, {
    displacement: filters.DisplacementFilter,
})

function StageNoSSR() {

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const displacementSpriteRef = useRef()
    const [renderFilter, setRenderFilter] = useState(false);
    const {height, width} = useWindowDimensions();
    const app = useApp();

    useEffect(() => {
        if (process.browser) {
            let type = "WebGL";
            if (!utils.isWebGLSupported()) {
                type = "canvas";
            }
            utils.sayHello(type);
            displacementSpriteRef.current.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
            setRenderFilter(true);
            app.resizeTo = window;
            animate();
        }
    }, [])

    function animate() {
        setX((x) => x + 4);
        setY((y) => y + 2);
        requestAnimationFrame(animate);
    }

    return (
        <Container>
            <Sprite x={x} y={y} image="smoke.png" ref={displacementSpriteRef}/>
            {renderFilter && (
                <Filters displacement={{
                    construct: [displacementSpriteRef.current],
                }}>
                    <Sprite width={width} height={height} image="water.jpeg" scale={1.12}/>
                </Filters>
            )}
        </Container>
    )
}

function getWindowDimensions() {
    const {innerWidth: width, innerHeight: height} = window;
    return {
        width,
        height
    };
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

const wrapped = () => {
    return (
        <div className="container-fluid overflow-hidden">
            <div style={{position: "relative", overflow: "hidden", overflowX: "hidden"}}>
                <Stage>
                    <StageNoSSR/>
                </Stage>
            </div>
        </div>
    )
};

export default wrapped