import dynamic from "next/dynamic";

export const Sketch = dynamic(() => import("./Sketch"), { ssr: false });
