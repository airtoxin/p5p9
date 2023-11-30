import { useEffect, useRef, VoidFunctionComponent } from "react";
import P5 from "p5";
import { P5Utils } from "../../utils";

export type Props = {
  setup: (p5: P5, utils: P5Utils) => void;
  draw: (p5: P5, utils: P5Utils) => void;
  webgl?: true;
  size?: [number, number];
};
const Sketch: VoidFunctionComponent<Props> = ({ setup, draw, webgl, size }) => {
  const utilRef = useRef<P5Utils | null>(null);
  const canvasParentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const sketch = new P5((p: P5) => {
      utilRef.current = new P5Utils(p);
      p.setup = () => {
        if (canvasParentRef.current != null) {
          p.createCanvas(
            size != null ? size[0] : 800 * Math.sqrt(2),
            size != null ? size[1] : 800,
            webgl ? p.WEBGL : undefined
          ).parent(canvasParentRef.current);
          if (utilRef.current) setup(p, utilRef.current);
        }
      };
      p.draw = () => {
        if (utilRef.current) draw(p, utilRef.current);
      };
    });
    return () => sketch.remove();
  }, [draw, setup]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      ref={canvasParentRef}
    />
  );
};

export default Sketch;
