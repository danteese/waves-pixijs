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
                    <Sprite width={1025} height={574} image="water.jpeg" scale={1.12}/>
                </Filters>
            )}
        </Container>
    )
}

const wrapped = () => {
    return (
        <Stage width={1025} height={574}>
            <StageNoSSR/>
        </Stage>
    )
};

export default wrapped