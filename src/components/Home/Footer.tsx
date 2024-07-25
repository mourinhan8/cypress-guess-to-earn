import { CopyRightIcon } from "../../assets/icons";

export function Footer() {
  return (
    <footer className="flex justify-center flex-col gap-3 p-5 items-center bg-zinc-800">
      <a
        href="https://www.cypress.work/"
        target="_blank"
        className="flex items-center text-zinc-400 duration-150 ease-linear hover:text-zinc-300"
      >
        <span className="pr-1">
          <CopyRightIcon />
        </span>
        Created by CYPRESS team
      </a>
      {/* <a
        href="https://github.com/mirayatech/BTC-Predictor"
        target="_blank"
        className="flex items-center text-zinc-400 duration-150 ease-linear hover:text-zinc-300"
      >
        <span className="pr-1">
          <CodeIcon />
        </span>
        Source code on GitHub
      </a> */}
    </footer>
  );
}
