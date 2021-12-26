import { useEffect, useRef, VoidFunctionComponent } from "react";
import P5 from "p5";

export type Props = {
  setup: (p5: P5, parent: HTMLDivElement) => void;
  draw: (p5: P5) => void;
};
const Sketch: VoidFunctionComponent<Props> = ({setup, draw}) => {
  const canvasParentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const sketch = new P5((p: P5) => {
      p.setup = () => {
        if (canvasParentRef.current != null) {
          setup(p, canvasParentRef.current);
        }
      };
      p.draw = () => draw(p);
    });
    return () => sketch.remove();
  }, [draw, setup]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex", justifyContent: "center", alignItems: "center" }}
      ref={canvasParentRef}
    />
  );
}

export default Sketch;
