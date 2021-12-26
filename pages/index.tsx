import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import * as fs from "fs";
import path from "path";

type Props = {
  sketches: string[];
};
const Home: NextPage<Props> = ({ sketches }) => {
  return (
    <div>
      <ul>
        {sketches.map((sketch) => (
          <li key={sketch} style={{ lineHeight: "1.5rem" }}>
            <Link href={`/sketches/${sketch}`} passHref>
              <a style={{ textDecoration: "underline" }}>{sketch}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = () => {
  const sketchesDirectory = path.join(process.cwd(), "pages/sketches");
  const filenames = fs.readdirSync(sketchesDirectory);

  return {
    props: {
      sketches: filenames.map((filename) =>
        filename.split(".").slice(0, -1).join(".")
      ),
    },
  };
};

export default Home;
