import type { NextPage } from "next";
import { Sketch } from "../components/Sketch";
import P5 from "p5";

const Home: NextPage = () => {
  let x = 50;
  const y = 50;

  const setup = (p5: P5) => {
    p5.background(255, 255, 255);
  };

  const draw = (p5: P5) => {
    p5.background(255, 255, 255);
    p5.ellipse(x, y, 70, 70);
    x++;
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default Home;
