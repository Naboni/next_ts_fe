import { AppProps } from "next/app";

interface IProps {
  width: string | undefined;
  height: string | undefined;
  bg: string | undefined;
}

export default function CenterLoading({ width, height, bg }: IProps) {
  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bg,
      }}
    >
      Loading...................................
    </div>
  );
}
